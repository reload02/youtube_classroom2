import { Processedvideo } from "../type/Type";
import VideoItem from "./VideoItem";
import { VideoLocation } from "../type/Type";
import "./VideoList.css";
import { useEffect, useState } from "react";
interface Props {
  videos: Processedvideo[];
  location: VideoLocation;
}

const VideoList: React.FC<Props> = ({ videos, location }) => {
  const [videosCount, setVideosCount] = useState(videos.length);

  useEffect(() => {
    setVideosCount(videos.length);
  }, [videos]);

  if (videosCount === 0)
    return (
      <img
        style={{ height: "500px", width: "900px" }}
        src="https://www.geumsan.go.kr/lifelongedu/img/sub01/nodata.jpg"
      ></img>
    );
  return (
    <div className="VideoList">
      {videos.map((video, index) => (
        <VideoItem
          key={index}
          video={video}
          location={location}
          setVideosCount={setVideosCount}
        />
      ))}
    </div>
  );
};

export default VideoList;
