import { translations } from "@/assets/static-data/translations";
import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext } from "react";
import InfoSpeechBubbleIcon from "../icons/info-speech-bubble";
import PinchToZoomIcon from "../icons/pinch-to-zoom";
import LanguageButton from "../language-button/language-button";

// These controls display next to the Clover Controls (e.g. zoom in, zoom out, home) and are meant to blend in with the Clover UI.
export default function AdditionalControls() {
  const { museumObjectState, setMuseumObjectState } =
    useContext(MuseumObjectContext);

  const onLearnMoreClick = (event: any) => {
    // The attract mode has listeners for click events that close the attract mode.
    // We want this button to open the attract mode, but don't want the click event to immediately close it.
    event.stopPropagation();

    setMuseumObjectState((prevState) => ({
      ...prevState,
      attractModeActive: true,
    }));
  };

  const { activeLanguage } = museumObjectState;

  return (
    <div className="flex flex-row items-center justify-center space-x-[0.618rem] rounded-lg p-4">
      {museumObjectState.kioskMode && (
        <div className="additional-controls-instruction w-max-content mr-8 flex h-8 items-center justify-center rounded-md bg-black px-[18px] py-[15px] text-white">
          <span className="mr-4 text-lg">
            <PinchToZoomIcon className="h-6 w-6" />
          </span>
          <span>{translations[activeLanguage].pinchToZoom}</span>
        </div>
      )}

      <LanguageButton />

      <button
        className="additional-controls-button w-max-content group flex h-10 items-center justify-center rounded-full border-2 border-white bg-black px-[18px] py-[15px] text-white hover:border-ncmaOrange hover:bg-ncmaDarkOrange hover:text-ncmaOrange"
        onClick={onLearnMoreClick}
        onTouchStart={onLearnMoreClick}
      >
        <span className="mr-4 text-lg">
          <InfoSpeechBubbleIcon
            className="h-5 w-5 fill-white group-hover:fill-ncmaOrange"
            fill="inherit"
          />
        </span>
        <span>{translations[activeLanguage].learnMore}</span>
      </button>
    </div>
  );
}
