import React, { useContext, useState } from "react";
import { Processedvideo, VideoLocation, VideoState } from "../type/Type";
import { useNavigate } from "react-router-dom";
import { setVideoContext } from "./ContentBox";

interface Props {
  video: Processedvideo;
  location: VideoLocation;
}

interface Props2 {
  video: Processedvideo;
}
const VideoItem: React.FC<Props> = ({ video, location }) => {
  const [videoStatus, setVideoStatus] = useState(video.status);
  const setVideos = useContext(setVideoContext);

  if (setVideos === null) return null;

  const handleVideo = (status: VideoState) => {
    setVideoStatus(status);
    setVideos((prev) => [
      ...prev.filter((prevVideo) => prevVideo.videoId !== video.videoId),
      { ...video, status: status },
    ]);
  };

  const saveVideo = () => {
    setVideoStatus("saved");
    setVideos((prev) => [...prev, { ...video, status: "saved" }]);
  };

  const deleteVideo = () => {
    setVideos((prev) => {
      return prev.filter((prevVideo) => prevVideo.videoId !== video.videoId);
    });
  };

  if (location === "onSearchMoadl")
    return (
      <div>
        <VideoPoster video={video} />
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
        <VideoPoster video={video} />
        <button
          onClick={() => {
            handleVideo("watched");
          }}
        >
          ✅
        </button>
        <button onClick={deleteVideo}>🗑️</button>
      </div>
    );
  else if (location === "onAfterWatchedBox")
    return (
      <div>
        <VideoPoster video={video} />
        <button
          onClick={() => {
            handleVideo("saved");
          }}
        >
          ↩️
        </button>
        <button onClick={deleteVideo}>🗑️</button>
      </div>
    );
};

const VideoPoster: React.FC<Props2> = ({ video }) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav(`watch/?v=${video.videoId}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <img
        src={video.thumbnailUrl}
        style={{ width: "250px", height: "200px", borderRadius: "5px" }}
      />
      <div style={{ width: "250px", height: "50px", textAlign: "center" }}>
        {video.title.length > 40
          ? video.title.slice(0, 40) + "...."
          : video.title}
      </div>
    </div>
  );
};

export default VideoItem;
