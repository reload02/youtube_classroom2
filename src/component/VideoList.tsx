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
        src="https://www.ecommerce-nation.com/wp-content/uploads/2017/08/How-to-Give-Your-E-Commerce-No-Results-Page-the-Power-to-Sell.png.webp"
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
