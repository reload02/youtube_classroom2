import { ApiVideo, ApiVideos, Processedvideo } from "../type/Type.tsx";
//import { mokdata1, mokdata2 } from "../../public/mockData.tsx";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

//const API_KEY = `AIzaSyAF_MIoAJyLJMcy0-v6ki4Oyr3Ao-tF9xA`;// kokomo129
const API_KEY = "AIzaSyDp8S2de2K1R3c3LLxwetR3ko67yeTF2VQ"; //ehp6821
export async function fetchSearchVideo(query: string) {
  console.log("검색 시도함");
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=15&type=video&key=${API_KEY}`;
  if (query === "") {
    throw new Error("검색어가 없어요");
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP 에러 status: ${response.status}`);
    }
    const data = await response.json();
    const formattedData = formatVideoDatas(data);
    return formattedData;
  } catch (error) {
    console.error("Fetch 에러:", error);
    return null;
  }
}

export async function fetchVideo(VideoID: string) {
  console.log("검색 시도함");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VideoID}&key=${API_KEY}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP 에러 status: ${response.status}`);
    }
    const data = await response.json();
    const formattedData = formatVideoDatas(data);
    return formattedData;
  } catch (error) {
    console.error("Fetch 에러:", error);
    return null;
  }
}

const formatVideoDatas = (videoDatas: ApiVideos): Processedvideo[] => {
  const formatDatas: Processedvideo[] = videoDatas.items.map(
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
        publishTime: video.snippet.publishTime,
      };
    }
  );

  const savedVideoData = localStorage.getItem("SAVED_VIDEO");
  if (savedVideoData === null) return formatDatas;

  const savedVideoID = JSON.parse(savedVideoData).map(
    (data: Processedvideo) => {
      if (data.status !== "default") return data.videoId;
    }
  );
  formatDatas.map((data) => {
    if (savedVideoID.includes(data.videoId)) {
      data.status = "saved";
      return data;
    }
    return data;
  });
  return formatDatas;
};

// export const fetchMok = () => {
//   const fetchedData = formatVideoDatas(mokdata2);

//   return fetchedData;
// };
