import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchVideo } from "../api/YoutubeAPI";
import { useEffect, useState } from "react";
import { Processedvideo } from "../type/Type";

const WatchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState<Processedvideo>({
    status: "default",
    nextageToken: "",
    etag: "",
    videoId: "",
    channelId: "",
    title: "로딩중",
    description: "",
    thumbnailUrl: "",
    channelTitle: "",
    publishTime: "",
  });
  const nav = useNavigate();
  const VideoID = searchParams.get("v") || "";

  useEffect(() => {
    const t = async () => {
      const fetchVideoInfo = await fetchVideo(VideoID);
      if (fetchVideoInfo && fetchVideoInfo.length > 0)
        setVideoData(fetchVideoInfo[0]);
      else
        setVideoData((prev) => {
          return { ...prev, title: "불러올 영상이 없습니다" };
        });
    };
    t();
  }, [VideoID]);

  return (
    <div>
      <button
        onClick={() => {
          nav(-1);
        }}
        style={{ height: "50px" }}
      >
        ↩️뒤로가기
      </button>
      <div>
        <img
          src={videoData.thumbnailUrl}
          style={{ width: "650px", height: "500px", borderRadius: "5px" }}
        />
        <h1>{videoData.title || "불러올 영상이 없습니다."}</h1>
      </div>
    </div>
  );
};

export default WatchPage;
