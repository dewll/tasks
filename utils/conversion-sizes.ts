import {
  ImageDimensions,
  ImageDimensionsByRatio,
} from '../../routes/legacy/trigger/thumbnails/helpers/image-dimensions';

export const ConversionSizes: ConversionSizesType = {
  default: [
    {
      height: 450,
      width: 450,
      textForFirebase: 'standard',
    },
    {
      height: 120,
      width: 120,
      textForFirebase: 'low',
    },
  ],
  inspirationPhotos: [
    {
      ratio: 3.75,
      textForFirebase: 'standard',
    },
    {
      ratio: 14.0625,
      textForFirebase: 'low',
    },
  ],
  stories: [
    {
      ratio: 2.222, // to 45%
      textForFirebase: 'standard',
    },
    {
      ratio: 3.333, // to 30%
      textForFirebase: 'low',
    },
  ],
};

interface ConversionSizesType {
  default: ImageDimensions[];
  inspirationPhotos: ImageDimensionsByRatio[];
  stories: ImageDimensionsByRatio[];
}
