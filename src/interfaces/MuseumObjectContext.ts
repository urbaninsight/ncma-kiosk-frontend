import { Manifest } from "@iiif/presentation-3";

export interface MuseumObjectStateContext {
  museumObjectState: MuseumObjectState;
  setMuseumObjectState: (museumObjectState: MuseumObjectState) => void;
}

export interface MuseumObjectState {
  manifestData?: Manifest; // TODO: look online for iiif manifest ts types
}