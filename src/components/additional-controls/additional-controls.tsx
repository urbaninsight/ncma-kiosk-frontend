"use client";

import { translations } from "@/assets/static-data/translations";
import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext, useEffect, useState } from "react";
import ExitFullscreenIcon from "../icons/exit-fullscreen";
import FullscreenIcon from "../icons/fullscreen";
import InfoSpeechBubbleIcon from "../icons/info-speech-bubble";
import PinchToZoomIcon from "../icons/pinch-to-zoom";
import LanguageButton from "../language-button/language-button";

// These controls display next to the Clover Controls (e.g. zoom in, zoom out, home) and are meant to blend in with the Clover UI.
export default function AdditionalControls() {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const onLearnMoreClick = (event: any) => {
    // The attract mode has listeners for click events that close the attract mode.
    // We want this button to open the attract mode, but don't want the click event to immediately close it.
    event.stopPropagation();

    setMuseumObjectState((prevState) => ({
      ...prevState,
      attractModeActive: true,
    }));
  };

  const onFullscreenClick = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    }
  };

  const { activeLanguage } = museumObjectState;

  return (
    <div className="mr-[-1px] flex flex-col items-center justify-center gap-y-[0.618rem] rounded-lg p-4 cloverSm:flex-row cloverSm:gap-x-[0.618rem]">
      {museumObjectState.kioskMode && (
        <div className="additional-controls-instruction w-max-content hidden h-8 items-center justify-center rounded-md bg-black px-[18px] py-[15px] text-white cloverSm:flex">
          <span className="mr-4 text-lg">
            <PinchToZoomIcon className="h-6 w-6" />
          </span>
          <span>{translations[activeLanguage].pinchToZoom}</span>
        </div>
      )}

      <LanguageButton />

      <button
        className="additional-controls-button w-max-content group flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black py-[15px] text-white hover:border-ncmaOrange hover:bg-ncmaDarkOrange hover:text-ncmaOrange cloverSm:w-auto cloverSm:px-[18px]"
        onPointerUp={onLearnMoreClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onLearnMoreClick(e);
          }
        }}
      >
        <span className="text-lg cloverSm:mr-4">
          <InfoSpeechBubbleIcon
            className="h-5 w-5 fill-white group-hover:fill-ncmaOrange"
            fill="inherit"
          />
        </span>
        <span className="hidden cloverSm:block">
          {translations[activeLanguage].learnMore}
        </span>
        <span className="sr-only">
          {translations[activeLanguage].learnMore}
        </span>
      </button>

      {/* Fullscreen */}
      {!museumObjectState.kioskMode && (
        <button
          className="additional-controls-button w-max-content group flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black py-[15px] text-white hover:border-ncmaOrange hover:bg-ncmaDarkOrange hover:text-ncmaOrange cloverSm:w-auto cloverSm:px-[18px]"
          onPointerUp={onFullscreenClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onFullscreenClick();
            }
          }}
        >
          <span className="text-lg cloverSm:mr-4">
            {isFullscreen ? (
              <ExitFullscreenIcon className="h-5 w-5 stroke-white group-hover:stroke-ncmaOrange" />
            ) : (
              <FullscreenIcon className="h-5 w-5 stroke-white group-hover:stroke-ncmaOrange" />
            )}
          </span>
          <span className="hidden cloverSm:block">
            {isFullscreen
              ? translations[activeLanguage].exitFullscreen
              : translations[activeLanguage].fullscreen}
          </span>
          <span className="sr-only">
            {isFullscreen
              ? translations[activeLanguage].exitFullscreen
              : translations[activeLanguage].fullscreen}
          </span>
        </button>
      )}
    </div>
  );
}
