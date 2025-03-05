"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { MuseumObjectState } from "@/interfaces/MuseumObjectContext";
import { Manifest } from "@iiif/presentation-3";
import { useContext, useEffect } from "react";
import AttractMode from "../attract-mode/attract-mode";
import IIIFViewer from "../iiif-viewer/iiif-viewer";

export default function MuseumObjectScreen() {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  // Fetch manifest data and store it in context
  useEffect(() => {
    const iiifUrl = `${process.env.NEXT_PUBLIC_URL}/one-image-example-manifest.json`;

    try {
      fetch(iiifUrl)
        .then((response) => response.json())
        .then((data: Manifest) => {
          const newState: MuseumObjectState = {
            ...museumObjectState,
            manifestData: data,
          };
          setMuseumObjectState(newState);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <AttractMode />
      <IIIFViewer />
    </>
  );
}
