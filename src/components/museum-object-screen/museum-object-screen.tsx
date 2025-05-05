"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { MuseumObjectState } from "@/interfaces/MuseumObjectContext";
import { MuseumObjectMetadata } from "@/interfaces/MuseumObjectMetadata";
import { Manifest } from "@iiif/presentation-3";
import { useContext, useEffect } from "react";
import IIIFViewer from "../iiif-viewer/iiif-viewer";

interface MuseumObjectScreenProps {
  annotatedImageId: string;
}

export default function MuseumObjectScreen({
  annotatedImageId,
}: MuseumObjectScreenProps) {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  // Fetch manifest data and store it in context
  useEffect(() => {
    // TODO: remove once we no longer need mock data for testing
    const iiifUrl = `${process.env.NEXT_PUBLIC_URL}/birds-eye-boston.json`;
    // const iiifUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}/IIIF`;

    const objectMetadataUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}`;

    try {
      const fetchData = async () => {
        const [iiifResponseRaw, objectMetadataResponseRaw] = await Promise.all([
          fetch(iiifUrl),
          fetch(objectMetadataUrl),
        ]);
        const [iiifResponse, objectMetadataResponse] = await Promise.all([
          iiifResponseRaw.json(),
          objectMetadataResponseRaw.json(),
        ]);

        const newState: MuseumObjectState = {
          ...museumObjectState,
          manifestData: iiifResponse as Manifest,
          objectMetadata: objectMetadataResponse as MuseumObjectMetadata,
        };
        setMuseumObjectState(newState);
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {/* <AttractMode /> */}
      {museumObjectState.manifestData && (
        <IIIFViewer annotatedImageId={annotatedImageId} />
      )}
    </>
  );
}
