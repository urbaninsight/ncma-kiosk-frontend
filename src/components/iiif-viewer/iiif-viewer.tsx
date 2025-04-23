"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import dynamic from "next/dynamic";
import { Viewer as OSDViewer } from "openseadragon";
import { useContext, useEffect, useRef, useState } from "react";
import tinyColor2 from "tinycolor2";
import AdditionalControls from "../additional-controls/additional-controls";
import PinchToZoomIndicator from "../pinch-to-zoom-indicator/pinch-to-zoom-indicator";

// TODO: Loading skeleton
const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((mod) => mod.Viewer),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading viewer...</p>, // Optional: Add a loading fallback
  },
);

interface IIIFViewerProps {
  annotatedImageId: string;
}

export default function IIIFViewer({ annotatedImageId }: IIIFViewerProps) {
  const { museumObjectState } = useContext(MuseumObjectContext);

  const [openSeadragonViewer, setOpenSeadragonViewer] = useState<OSDViewer>();

  const viewerRef = useRef<HTMLDivElement>(null);

  // TODO: remove once we no longer need mock data for testing
  // const iiifContent = `${process.env.NEXT_PUBLIC_URL}/test-wimpel-manifest.json`;

  // TODO: base content off of ENV variable?
  const iiifContent = `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${annotatedImageId}/IIIF`;

  // TODO: base colors off of ENV variables?
  const customTheme = {
    colors: {
      /**
       * Black and dark grays in a light theme.
       * All must contrast to 4.5 or greater with `secondary`.
       */
      primary: "#095CFF",
      primaryMuted: "#433A3F",
      primaryAlt: "#211C1F",

      /**
       * Key brand color(s).
       * `accent` must contrast to 4.5 or greater with `secondary`.
       */
      accent: "#095CFF",
      accentMuted: "#1E69FB",
      accentAlt: "#1E69FB",

      /**
       * White and light grays in a light theme.
       * All must must contrast to 4.5 or greater with `primary` and  `accent`.
       */
      secondary: "#000",
      secondaryMuted: "#ECEFF1",
      secondaryAlt: "#CFD8DC",
    },
    fonts: {
      sans: "'Helvetica Neue', sans-serif",
      display: "Optima, Georgia, Arial, sans-serif",
    },
  };

  const onOSDViewerInitialized = (OSDViewer: OSDViewer) => {
    setOpenSeadragonViewer(OSDViewer);
  };

  useEffect(() => {
    if (museumObjectState.attractModeActive && !!openSeadragonViewer) {
      setTimeout(() => {
        openSeadragonViewer.viewport.goHome();
      }, 1000); // wait for slide animation to finish
    }
  }, [museumObjectState.attractModeActive]);

  return (
    <div
      ref={viewerRef}
      className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center bg-black text-white"
    >
      {/* Addditional Controls (bottom right of the screen) */}
      <div className="absolute bottom-0 right-[8.75rem] z-[9]">
        <AdditionalControls />
      </div>

      {/* Pinch-To-Zoom Indicator */}
      <div className="pointer-events-none absolute right-0 top-0 z-[9] mt-36 flex h-[100dvh] w-[100dvw] items-center justify-center">
        <PinchToZoomIndicator viewerRef={viewerRef} />
      </div>

      {/* Viewer */}
      <Viewer
        iiifContent={iiifContent}
        unVaultedIIIFContent={museumObjectState.manifestData}
        customTheme={customTheme}
        openSeadragonInstanceCallback={onOSDViewerInitialized}
        activeLanguageCode={museumObjectState.activeLanguage}
        options={{
          canvasBackgroundColor: "#000",
          canvasHeight: "100%",
          showIIIFBadge: false,
          showTitle: false,
          informationPanel: {
            open: false,
            renderAbout: false,
          },
          annotationOverlays: {
            backgroundColor:
              museumObjectState.objectMetadata?.annotation_color ?? "",
            borderWidth: "10px",
            borderType: "solid",
            borderColor: tinyColor2(
              museumObjectState.objectMetadata?.annotation_color ?? "",
            )
              .setAlpha(0.5)
              .toRgbString(),
            highlightedBackgroundColor:
              museumObjectState.objectMetadata?.annotation_highlight_color ??
              "",
            highlightedBorderColor: tinyColor2(
              museumObjectState.objectMetadata?.annotation_highlight_color ??
                "",
            )
              .setAlpha(0.5)
              .toRgbString(),
            opacity: "1",
            zoomLevel: 24,
          },
          openSeadragon: {
            // scrollZoom: true,
            navigatorRotate: false,
            showRotationControl: false,
            showHomeControl: true,
            showFullPageControl: false,
            navigatorDisplayRegionColor: "transparent",
            gestureSettingsMouse: {
              scrollToZoom: true,
            },
            // pinchZoom: true,
          },
        }}
      />
    </div>
  );
}
