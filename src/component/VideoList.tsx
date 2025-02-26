import { Processedvideo } from "../type/Type";
import VideoItem from "./VideoItem";
import { VideoLocation } from "../type/Type";
import "./VideoList.css";
import { useEffect, useState } from "react";

interface Props {
  location: VideoLocation;
  videos: Processedvideo[];
}

const VideoList: React.FC<Props> = ({ location, videos }) => {
  const [videosCount, setVideosCount] = useState(videos.length);

  useEffect(() => {
    setVideosCount(videos.length);
  }, [videos]);

  if (videosCount === 0) return <EmptyVideoList />;

  return (
    <div className="VideoList">
      {videos.map((video) => (
        <VideoItem key={video.videoId} video={video} location={location} />
      ))}
    </div>
  );
};

const EmptyVideoList: React.FC = () => {
  return (
    <img
      style={{ height: "500px", width: "900px" }}
      src="https://www.ecommerce-nation.com/wp-content/uploads/2017/08/How-to-Give-Your-E-Commerce-No-Results-Page-the-Power-to-Sell.png.webp"
    ></img>
  );
};

export default VideoList;
