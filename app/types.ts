

export interface ImageContent {
  Title: string;
  Image: {Url: string; Wallpaper: string};
  Description: string;
}

export interface ModelMediaContent {
  FullDateString: string;
  Hash: string;
  Market: string;
  Name: string;
  Ssd: string;
  ImageContent: ImageContent;
}
export interface Model {
  MediaContents: ModelMediaContent[];
}