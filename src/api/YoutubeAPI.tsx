import { ApiVideo, ApiVideos, Processedvideo } from "../type/Type.tsx";
import { getLocalStorageData } from "./localstorageAPI.tsx";
//import { mokdata1, mokdata2 } from "../../public/mockData.tsx";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchQueryVideo(query: string, nextageToken? :string|undefined) {
  console.log("token : "+nextageToken);
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=15&type=video&key=${API_KEY}`;
  if(nextageToken!==undefined)url+=`&pageToken=${nextageToken}`
  if (query === "") {
    throw new Error("검색어가 없어요");
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP 에러 status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Fetch 에러:", error);
    return null;
  }
}

export async function fetchVideo(VideoID: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VideoID}&key=${API_KEY}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP 에러 status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch 에러:", error);
    return null;
  }
}

export const processVideoDatas = (videoDatas: ApiVideos): Processedvideo[] => {
  const processDatas: Processedvideo[] = videoDatas.items.map(
    (video: ApiVideo) => {
      return {
        status: "default",
        nextageToken: videoDatas.nextPageToken,
        etag: video.etag,
        videoId: video.id.videoId,
        channelId: video.snippet.channelId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
        publishTime: video.snippet.publishedAt,
      };
    }
  );

  const savedVideoData = getLocalStorageData("SAVED_VIDEO");
  if (savedVideoData === "[]") return processDatas;

  const savedVideoID = JSON.parse(savedVideoData).map(
    (data: Processedvideo) => {
      if (data.status !== "default") return data.videoId;
    }
  );
  processDatas.map((data) => {
    if (savedVideoID.includes(data.videoId)) {
      data.status = "saved";
      return data;
    }
    return data;
  });
  return processDatas;
};

// export const fetchMok = () => {
//   const fetchedData = formatVideoDatas(mokdata2);

//   return fetchedData;
// };
