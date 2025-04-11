import { Manifest } from "@iiif/presentation-3";
import { Viewer as OSDViewer } from "openseadragon";
import { Dispatch, SetStateAction } from "react";
import { MuseumObjectMetadata } from "./MuseumObjectMetadata";

export interface MuseumObjectStateContext {
  museumObjectState: MuseumObjectState;
  setMuseumObjectState: Dispatch<SetStateAction<MuseumObjectState>>;
}

export interface MuseumObjectState {
  manifestData?: Manifest;
  objectMetadata?: MuseumObjectMetadata;
  openSeadragonViewer?: OSDViewer;
  attractModeActive: boolean;
}
