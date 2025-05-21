"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext, useEffect, useState } from "react";

export default function LanguageButton() {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);
  const [languageButtonText, setLanguageButtonText] = useState("Español");

  useEffect(() => {
    if (museumObjectState.activeLanguage === "en") {
      setLanguageButtonText("Español");
    } else {
      setLanguageButtonText("English");
    }
  }, [museumObjectState.activeLanguage]);

  const onLanguageClick = (event: any) => {
    // The attract mode has listeners for click events that close the attract mode.
    // We want this button to switch lanugages, but don't want the click event to close the attract mode.
    event.stopPropagation();

    if (museumObjectState.activeLanguage === "en") {
      setMuseumObjectState((prevState) => ({
        ...prevState,
        activeLanguage: "es",
      }));
    } else {
      setMuseumObjectState((prevState) => ({
        ...prevState,
        activeLanguage: "en",
      }));
    }
  };

  return (
    <button
      className="additional-controls-button flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black px-[18px] py-[15px] text-white hover:border-ncmaOrange hover:bg-ncmaDarkOrange hover:text-ncmaOrange cloverXs:w-32"
      onClick={onLanguageClick}
      onTouchStart={onLanguageClick}
    >
      <span className="hidden cloverXs:block">{languageButtonText}</span>
      <span className="block uppercase cloverXs:hidden">
        {museumObjectState.activeLanguage}
      </span>
    </button>
  );
}
