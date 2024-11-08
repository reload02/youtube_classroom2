import { Processedvideo } from "../type/Type";
import VideoItem from "./VideoItem";
import { VideoLocation } from "../type/Type";
interface Props {
  videos: Processedvideo[];
  location: VideoLocation;
}

const VideoList: React.FC<Props> = ({ videos, location }) => {
  return (
    <div>
      {videos.map((video, index) => (
        <VideoItem key={index} video={video} location={location} />
      ))}
    </div>
  );
};

export default VideoList;
