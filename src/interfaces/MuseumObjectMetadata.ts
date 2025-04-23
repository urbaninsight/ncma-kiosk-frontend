// TODO: Update these interfaces to match the actual API response as it changes

export interface ObjectMetadataMultilingualText {
  en: string;
  es: string;
}

export interface ObjectMetadataImageSizes {
  thumbnail: string;
  medium: string;
  medium_large: string;
  large: string;
  full: string;
}

export interface ObjectMetadataImageAnnotation {
  annotation_coordinates: string;
  annotation_title: ObjectMetadataMultilingualText;
  annotation_description: ObjectMetadataMultilingualText;
  annotation_related_image: ObjectMetadataImageSizes;
  annotation_related_caption: ObjectMetadataMultilingualText;
}

export interface MuseumObjectMetadata {
  id: string;
  title: string;
  description: ObjectMetadataMultilingualText;
  description_image: ObjectMetadataImageSizes;
  description_video: string;
  image: ObjectMetadataImageSizes;
  image_annotations: ObjectMetadataImageAnnotation[];
  annotation_color: string;
  annotation_highlight_color: string;
}
