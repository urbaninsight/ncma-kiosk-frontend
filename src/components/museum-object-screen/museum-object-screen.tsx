"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { MuseumObjectState } from "@/interfaces/MuseumObjectContext";
import { MuseumObjectMetadata } from "@/interfaces/MuseumObjectMetadata";
import { Manifest } from "@iiif/presentation-3";
import { useContext, useEffect } from "react";
import AttractMode from "../attract-mode/attract-mode";
import IIIFViewer from "../iiif-viewer/iiif-viewer";

export default function MuseumObjectScreen() {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  // Fetch manifest data and store it in context
  useEffect(() => {
    // TODO: remove once we no longer need mock data for testing
    // const iiifUrl = `${process.env.NEXT_PUBLIC_URL}/test-wimpel-manifest.json`;
    const iiifUrl =
      "https://dev-ncma-sandbox.pantheonsite.io/wp-json/ncma/v1/ncma-annotated-image/13/IIIF";

    const objectMetadataUrl =
      "https://dev-ncma-sandbox.pantheonsite.io/wp-json/ncma/v1/ncma-annotated-image/13";

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
      <AttractMode />
      {museumObjectState.manifestData && <IIIFViewer />}
    </>
  );
}
