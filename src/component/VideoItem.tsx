import { useState } from "react";
import { Processedvideo, VideoLocation } from "../type/Type";

interface Props {
  video: Processedvideo;
  location: VideoLocation;
}

const VideoItem: React.FC<Props> = ({ video, location }) => {
  const [videoStatus, setVideoStatus] = useState(video.status);

  const saveVideo = () => {
    console.log("저장함");
    video.status = "saved";
    setVideoStatus("saved");
    const latest = localStorage.getItem("SAVED_VIDEO");
    if (latest === null)
      localStorage.setItem("SAVED_VIDEO", JSON.stringify([video]));
    else {
      localStorage.setItem(
        "SAVED_VIDEO",
        JSON.stringify([...JSON.parse(latest), video])
      );
    }
  };

  if (location === "onSearchMoadl")
    return (
      <div>
        <img
          src={video.thumbnailUrl}
          style={{ width: "250px", height: "200px" }}
        />
        <div>{video.title.slice(0, 40)}</div>
        {videoStatus === "default" ? (
          <button onClick={saveVideo}>저장하기</button>
        ) : (
          <button>저장완료</button>
        )}
      </div>
    );
  else if (location === "onBeforeWatchedBox")
    return (
      <div>
        <img
          src={video.thumbnailUrl}
          style={{ width: "250px", height: "200px" }}
        />
        <div>{video.title.slice(0, 40)}</div>
        <button>시청완료</button>
        <button>지우기</button>
      </div>
    );
  else if (location === "onAfterWatchedBox")
    return (
      <div>
        <img
          src={video.thumbnailUrl}
          style={{ width: "250px", height: "200px" }}
        />
        <div>{video.title.slice(0, 40)}</div>
        <button>다시보기</button>
        <button>지우기</button>
      </div>
    );
};

export default VideoItem;
