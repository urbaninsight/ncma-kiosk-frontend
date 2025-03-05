"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext, useEffect, useRef, useState } from "react";
import Skeleton from "../skeleton/skeleton";

const ATTRACT_MODE_TIMEOUT_MINUTES = 3;
const ATTRACT_MODE_TIMEOUT_MILLISECONDS =
  ATTRACT_MODE_TIMEOUT_MINUTES * 60 * 1000;

export default function AttractModeContent() {
  const { museumObjectState } = useContext(MuseumObjectContext);
  const [attractModeActive, setAttractModeActive] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null); // Use a ref for the timer

  // Function to start the attract mode
  const startAttractMode = () => {
    setAttractModeActive(true);
    // Add logic to play your attract mode video or animation here
    console.log("Attract mode started");
  };

  // Function to stop the attract mode
  const stopAttractMode = () => {
    setAttractModeActive(false);
    // Add logic to stop your attract mode video or animation here
    console.log("Attract mode stopped");
  };

  // Reset the inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(
      startAttractMode,
      ATTRACT_MODE_TIMEOUT_MILLISECONDS
    );
  };

  // Handle user interaction
  const handleUserInteraction = () => {
    if (attractModeActive) {
      stopAttractMode();
    }
    resetInactivityTimer();
  };

  // Set up event listeners for user interaction
  useEffect(() => {
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, handleUserInteraction);
    });

    // Start the initial inactivity timer
    resetInactivityTimer();

    // Clean up event listeners and timer
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [attractModeActive]);

  // TODO: Fade out
  // TODO: Reset IIIF to default state on animation end
  return attractModeActive ? (
    <div className="attract-mode absolute top-0 left-0 h-[100dvh] w-[100dvw] flex flex-col justify-center items-center gap-y-8 bg-black text-white z-[10] cursor-pointer">
      {/* Video BG */}
      <div className="absolute top-0 left-0 h-[100dvh] w-[100dvw]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover h-full w-full"
        >
          {/* TODO: make dynamic */}
          <source src="/test_vid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Darkened Overlay over Video so text is more legible */}
      <div className="absolute top-0 left-0 h-[100dvh] w-[100dvw] bg-black opacity-30 z-[10]"></div>

      {/* Title + Button */}
      {!!museumObjectState.manifestData?.label?.["en"]?.length && (
        <>
          <h1 className="text-7xl font-bold animate-pulse text-center max-w-6xl z-[11]">
            {/* TODO: support multilingual */}
            {museumObjectState.manifestData?.label["en"] ?? ""}
          </h1>
          <p className="animate-pulse text-3xl font-bold uppercase border-4 border-white px-5 py-2 hover:text-gray-500 hover:border-gray-500 mb-5">
            Tap to Begin
          </p>
        </>
      )}

      {/* Loading Skeleton */}
      {!!museumObjectState.manifestData?.label?.["en"]?.length && (
        <div className="flex flex-col justify-center items-center gap-y-8 z-[11]">
          {/* Title Skeleton */}
          <Skeleton className="w-[800px] h-[72px]" />

          {/* Button Skeleton */}
          <Skeleton className="w-[260px] h-[60px]" />
        </div>
      )}
    </div>
  ) : null;
}
