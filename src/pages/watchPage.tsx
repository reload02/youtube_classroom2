import { useSearchParams } from "react-router-dom";
import { fetchVideo } from "../api/YoutubeAPI";
import { useEffect, useState } from "react";

const WatchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState({ title: "로딩중" });

  const VideoID = searchParams.get("v");

  useEffect(() => {
    const t = async () => {
      const fetchVideoInfo = await fetchVideo(VideoID);
      if (fetchVideoInfo && fetchVideoInfo.length > 0)
        setVideoData(fetchVideoInfo[0]);
      else setVideoData({ title: "불러올 영상이 없습니다" });

      console.log(fetchVideoInfo[0]);
    };
    t();
  }, [VideoID]);

  return (
    <>
      <img
        src={videoData.thumbnailUrl}
        style={{ width: "650px", height: "500px", borderRadius: "5px" }}
      />
      <h1>{videoData.title || "불러올 영상이 없습니다."}</h1>
    </>
  );
};

export default WatchPage;
