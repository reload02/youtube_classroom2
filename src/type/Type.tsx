export type ApiVideos = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: "KR";
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ApiVideo[];
};

export type ApiVideo = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

export type processedvideo = {
  status: "default" | "saved" | "watched";
  nextageToken: string;
  etag: string;
  videoId: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishTime: string;
};
