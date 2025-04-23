import { MuseumObjectContext } from "@/context/museum-object-context";
import { useContext } from "react";
import InfoSpeechBubbleIcon from "../icons/info-speech-bubble";
import PinchToZoomIcon from "../icons/pinch-to-zoom";
import LanguageButton from "../language-button/language-button";

// These controls display next to the Clover Controls (e.g. zoom in, zoom out, home) and are meant to blend in with the Clover UI.
export default function AdditionalControls() {
  const { setMuseumObjectState } = useContext(MuseumObjectContext);

  const onLearnMoreClick = (event: any) => {
    // The attract mode has listeners for click events that close the attract mode.
    // We want this button to open the attract mode, but don't want the click event to immediately close it.
    event.stopPropagation();

    setMuseumObjectState((prevState) => ({
      ...prevState,
      attractModeActive: true,
    }));
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-[0.618rem] rounded-lg p-4">
      <div className="w-max-content mr-8 flex h-10 items-center justify-center rounded-md bg-black px-[18px] py-[15px] text-white">
        <span className="mr-4 text-lg">
          <PinchToZoomIcon className="h-7 w-7" />
        </span>
        <span>Pinch to zoom</span>
      </div>

      <LanguageButton />

      <button
        className="additional-controls-button w-max-content group flex h-8 items-center justify-center rounded-full border-2 border-white bg-black px-[18px] py-[15px] text-white hover:border-black hover:bg-white hover:text-black"
        onClick={onLearnMoreClick}
      >
        <span className="mr-4 text-lg">
          <InfoSpeechBubbleIcon
            className="h-5 w-5 fill-white group-hover:fill-black"
            fill="inherit"
          />
        </span>
        <span>Learn more</span>
      </button>
    </div>
  );
}
