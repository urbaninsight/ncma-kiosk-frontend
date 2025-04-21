"use client";

import { MuseumObjectContext } from "@/context/museum-object-context";
import dynamic from "next/dynamic";
import { Viewer as OSDViewer } from "openseadragon";
import { useContext, useEffect, useState } from "react";
import AdditionalControls from "../additional-controls/additional-controls";

// TODO: Loading skeleton
const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((mod) => mod.Viewer),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading viewer...</p>, // Optional: Add a loading fallback
  },
);

export default function IIIFViewer() {
  const { museumObjectState } = useContext(MuseumObjectContext);

  const [openSeadragonViewer, setOpenSeadragonViewer] = useState<OSDViewer>();

  // TODO: remove once we no longer need mock data for testing
  // const iiifContent = `${process.env.NEXT_PUBLIC_URL}/test-wimpel-manifest.json`;

  // TODO: base content off of ENV variable?
  const iiifContent =
    "https://dev-ncma-sandbox.pantheonsite.io/wp-json/ncma/v1/ncma-annotated-image/13/IIIF";

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
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center bg-black text-white">
      {/* Addditional Controls (bottom right of the screen) */}
      <div className="absolute bottom-0 right-[8.75rem] z-[9]">
        <AdditionalControls />
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
            backgroundColor: "rgba(209, 99, 58, 1)",
            borderWidth: "10px",
            borderType: "solid",
            borderColor: "rgba(209, 99, 58, 0.5)",
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
