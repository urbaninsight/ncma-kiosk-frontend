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
      ATTRACT_MODE_TIMEOUT_MILLISECONDS,
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
    <div className="attract-mode absolute left-0 top-0 z-[10] flex h-[100dvh] w-[100dvw] cursor-pointer flex-col items-center justify-center gap-y-8 bg-black text-white">
      {/* Video BG */}
      <div className="absolute left-0 top-0 h-[100dvh] w-[100dvw]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          {/* TODO: make dynamic */}
          <source src="/test_vid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Darkened Overlay over Video so text is more legible */}
      <div className="absolute left-0 top-0 z-[10] h-[100dvh] w-[100dvw] bg-black opacity-30"></div>

      {/* Title + Button */}
      {!!museumObjectState.manifestData?.label?.["en"]?.length && (
        <>
          <h1 className="z-[11] max-w-6xl animate-pulse text-center text-7xl font-bold">
            {/* TODO: support multilingual */}
            {museumObjectState.manifestData?.label["en"] ?? ""}
          </h1>
          <p className="mb-5 animate-pulse border-4 border-white px-5 py-2 text-3xl font-bold uppercase hover:border-gray-500 hover:text-gray-500">
            Tap to Begin
          </p>
        </>
      )}

      {/* Loading Skeleton */}
      {!!museumObjectState.manifestData?.label?.["en"]?.length && (
        <div className="z-[11] flex flex-col items-center justify-center gap-y-8">
          {/* Title Skeleton */}
          <Skeleton className="h-[72px] w-[800px]" />

          {/* Button Skeleton */}
          <Skeleton className="h-[60px] w-[260px]" />
        </div>
      )}
    </div>
  ) : null;
}
