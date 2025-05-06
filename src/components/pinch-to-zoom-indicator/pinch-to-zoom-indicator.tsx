import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext, useEffect } from "react";
import PinchToZoomIcon from "../icons/pinch-to-zoom";

interface PinchToZoomIndicatorProps {
  viewerRef: React.RefObject<HTMLDivElement>;
}

// TODO: pass viewer ref
export default function PinchToZoomIndicator({
  viewerRef,
}: PinchToZoomIndicatorProps) {
  // TODO: stop displaying once user interacts with the viewer
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  const showPinchToZoomIndicator = () => {
    setMuseumObjectState((prev) => ({
      ...prev,
      pinchToZoomIndicatorActive: true,
    }));
  };
  const hidePinchToZoomIndicator = () => {
    setMuseumObjectState((prev) => ({
      ...prev,
      pinchToZoomIndicatorActive: false,
    }));
  };

  // When the attract mode reactivates, reset the pinch to zoom for the next user
  useEffect(() => {
    if (museumObjectState.attractModeActive) {
      setTimeout(() => {
        showPinchToZoomIndicator();
      }, 1000); // Wait for the attract mode to animate in before showing
    }
  }, [museumObjectState.attractModeActive]);

  // Handle user interaction
  const handleUserInteraction = () => {
    if (museumObjectState.pinchToZoomIndicatorActive) {
      hidePinchToZoomIndicator();
    }
  };

  // Set up event listeners for user interaction
  useEffect(() => {
    const events = ["click", "touchstart", "keydown", "wheel"];
    const currentViewer = viewerRef.current;
    events.forEach((event) => {
      currentViewer?.addEventListener(event, handleUserInteraction);
    });

    // Clean up event listeners and timer
    return () => {
      events.forEach((event) => {
        currentViewer?.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
    // TODO: implement proper size and color
    <div
      className={`transition-opacity duration-700 ease-in-out ${museumObjectState.pinchToZoomIndicatorActive ? "opacity-100" : "opacity-0"}`}
    >
      <PinchToZoomIcon className="h-32 w-32 animate-pulse" />
    </div>
  );
}
