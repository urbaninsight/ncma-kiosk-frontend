"use client";

import dynamic from "next/dynamic";

// TODO: Loading skeleton
const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((mod) => mod.Viewer),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading viewer...</p>, // Optional: Add a loading fallback
  },
);

export default function IIIFViewer() {
  // TODO: base content off of ENV variable?
  const iiifContent = `${process.env.NEXT_PUBLIC_URL}/one-image-example-manifest.json`;

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

  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center bg-black text-white">
      <Viewer
        iiifContent={iiifContent}
        customTheme={customTheme}
        options={{
          canvasBackgroundColor: "#000",
          canvasHeight: "100%",
          showIIIFBadge: false,
          showTitle: false,
          // TODO: ENV variable to hide info panel toggle?
          informationPanel: {
            open: false,
            renderToggle: true,
            renderAbout: false,
            renderAnnotation: true,
          },
          openSeadragon: {
            scrollZoom: true,
            navigatorRotate: false,
            showRotationControl: false,
            showHomeControl: false,
            showFullPageControl: false,
            navigatorDisplayRegionColor: "transparent",
            gestureSettingsMouse: {
              scrollToZoom: true,
            },
          },
        }}
      />
    </div>
  );
}
