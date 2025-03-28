"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext, useEffect, useRef, useState } from "react";
import HandTouchIcon from "../icons/hand-touch";
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

  if (!attractModeActive) {
    return null;
  }

  // TODO: Fade out
  // TODO: Reset IIIF to default state on animation end
  return (
    <div className="attract-mode absolute left-0 top-0 z-[10] flex h-[100dvh] w-[100dvw] cursor-pointer flex-col items-center justify-center gap-y-8 bg-black text-white">
      <div className="flex flex-col items-center justify-center gap-y-16">
        {/* Video + Text */}
        <div className="mb-6 flex flex-row justify-center gap-x-8 px-[108px]">
          {/* Video BG */}
          <div className="flex flex-1">
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

          {/* Text */}
          {/* TODO: multilingual */}
          {!!museumObjectState.manifestData?.label?.["en"]?.length &&
            !!museumObjectState.manifestData?.summary?.["en"]?.length && (
              <div className="flex flex-1">
                <div>
                  <h1 className="z-[11] text-3xl font-semibold leading-[100%]">
                    {museumObjectState.manifestData.label["en"]}
                  </h1>
                  <div
                    className="mt-4 flex flex-col gap-y-4 text-[28px] font-light leading-[120%]"
                    dangerouslySetInnerHTML={{
                      __html: museumObjectState.manifestData.summary["en"],
                    }}
                  ></div>
                </div>
              </div>
            )}

          {/* Text Skeleton */}
          {/* TODO: */}
          {!museumObjectState.manifestData?.label?.["en"]?.length && (
            <div className="z-[11] flex flex-col items-center justify-center gap-y-8">
              {/* Title Skeleton */}
              <Skeleton className="h-[72px] w-[800px]" />

              {/* Button Skeleton */}
              <Skeleton className="h-[60px] w-[260px]" />
            </div>
          )}
        </div>

        {/* User Instructions */}
        <div className="flex animate-pulse flex-row items-center gap-x-4 text-3xl font-semibold leading-[100%]">
          <HandTouchIcon />

          <span>Touch anywhere to explore</span>
        </div>
      </div>
    </div>
  );
}
