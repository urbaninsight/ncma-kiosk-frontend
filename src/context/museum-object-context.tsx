"use client";

import {
  MuseumObjectState,
  MuseumObjectStateContext,
} from "@/interfaces/MuseumObjectContext";
import { createContext, useState } from "react";

const initialMuseumObjectState: MuseumObjectState = {
  manifestData: undefined,
  attractModeActive: false,
  pinchToZoomIndicatorActive: false,
  activeLanguage: "en",
};

export const MuseumObjectContext = createContext<MuseumObjectStateContext>({
  museumObjectState: initialMuseumObjectState,
  setMuseumObjectState: () => {},
});

export default function MuseumObjectContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [museumObjectState, setMuseumObjectState] = useState(
    initialMuseumObjectState,
  );

  return (
    <MuseumObjectContext.Provider
      value={{ museumObjectState, setMuseumObjectState }}
    >
      {children}
    </MuseumObjectContext.Provider>
  );
}
