"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { MuseumObjectState } from "@/interfaces/MuseumObjectContext";
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
    const iiifUrl = `https://aam-demo.pages.dev/birds-eye-boston.json`;
    // const iiifUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}/IIIF`;

    try {
      const fetchData = async () => {
        const [iiifResponseRaw] = await Promise.all([fetch(iiifUrl)]);
        const [iiifResponse] = await Promise.all([iiifResponseRaw.json()]);

        const newState: MuseumObjectState = {
          ...museumObjectState,
          manifestData: iiifResponse as Manifest,
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
