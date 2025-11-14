"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { MuseumObjectMetadata } from "@/interfaces/MuseumObjectMetadata";
import { Manifest } from "@iiif/presentation-3";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";
import AttractMode from "../attract-mode/attract-mode";
import IIIFViewer from "../iiif-viewer/iiif-viewer";

interface MuseumObjectScreenProps {
  annotatedImageId: string;
}

export default function MuseumObjectScreen({
  annotatedImageId,
}: MuseumObjectScreenProps) {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  const searchParams = useSearchParams();
  const kiosk = searchParams.get("kiosk");

  useEffect(() => {
    // Set kiosk mode
    setMuseumObjectState((prev) => ({
      ...prev,
      kioskMode: kiosk === "true",
      attractModeActive: kiosk === "true",
    }));

    // Fetch manifest data and store it in context
    const iiifUrl = `/manifest?id=${annotatedImageId}`;
    const objectMetadataUrl = `/metadata?id=${annotatedImageId}`;
    // NOTE: Uncomment for local dev:
    // const iiifUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}/IIIF`;
    // const objectMetadataUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}`;

    try {
      // NOTE: Uncomment for local dev:
      // const credentials = btoa(
      //   `${process.env.WP_API_UNAME}:${process.env.WP_API_PASS}`,
      // );

      const fetchData = async () => {
        const [iiifResponseRaw, objectMetadataResponseRaw] = await Promise.all([
          fetch(iiifUrl, {
            method: "GET",
          }),
          fetch(objectMetadataUrl, {
            method: "GET",
            // NOTE: Uncomment for local dev:
            // headers: {
            //   Authorization: `Basic ${credentials}`,
            // },
          }),
        ]);
        const [iiifResponse, objectMetadataResponse] = await Promise.all([
          iiifResponseRaw.json(),
          objectMetadataResponseRaw.json(),
        ]);

        setMuseumObjectState((prev) => ({
          ...prev,
          manifestData: iiifResponse as Manifest,
          objectMetadata: objectMetadataResponse as MuseumObjectMetadata,
        }));
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AttractMode />
      {museumObjectState.manifestData && (
        <IIIFViewer annotatedImageId={annotatedImageId} />
      )}
    </Suspense>
  );
}
