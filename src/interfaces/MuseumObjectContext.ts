import { Manifest } from "@iiif/presentation-3";
import { Viewer as OSDViewer } from "openseadragon";
import { Dispatch, SetStateAction } from "react";
import { MuseumObjectMetadata } from "./MuseumObjectMetadata";

export interface MuseumObjectStateContext {
  museumObjectState: MuseumObjectState;
  setMuseumObjectState: Dispatch<SetStateAction<MuseumObjectState>>;
}

export interface MuseumObjectState {
  manifestData?: Manifest; // IIIF manifest JSON data converted to js object
  objectMetadata?: MuseumObjectMetadata; // Metadata from the WP API
  openSeadragonViewer?: OSDViewer; // OpenSeadragon Instance used inside clover
  attractModeActive: boolean;
  pinchToZoomIndicatorActive: boolean;
  activeLanguage: "en" | "es";
}
