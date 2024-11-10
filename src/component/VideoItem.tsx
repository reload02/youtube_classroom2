import React, { useEffect, useState } from "react";
import { Processedvideo, VideoLocation, VideoState } from "../type/Type";

interface Props {
  video: Processedvideo;
  location: VideoLocation;
  setVideosCount: React.Dispatch<React.SetStateAction<number>>;
}

const VideoItem: React.FC<Props> = ({ video, location, setVideosCount }) => {
  const [videoStatus, setVideoStatus] = useState(video.status);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    setVideoStatus(video.status);
  }, [location, video]);

  if (!visible) return null;

  const handleVideo = (status: VideoState) => {
    video.status = status;
    setVideoStatus(status);
    const latest = localStorage.getItem("SAVED_VIDEO");
    if (latest === null)
      localStorage.setItem("SAVED_VIDEO", JSON.stringify([video]));
    else {
      localStorage.setItem(
        "SAVED_VIDEO",
        JSON.stringify([
          ...JSON.parse(latest).filter(
            (videoData: Processedvideo) => videoData.videoId !== video.videoId
          ),
          video,
        ])
      );
      setVisible(false);
      setVideosCount((prev) => prev - 1);
    }
  };

  const saveVideo = () => {
    video.status = "saved";
    setVideoStatus("saved");
    const latest = localStorage.getItem("SAVED_VIDEO");
    if (latest === null)
      localStorage.setItem("SAVED_VIDEO", JSON.stringify([video]));
    else {
      localStorage.setItem(
        "SAVED_VIDEO",
        JSON.stringify([
          ...JSON.parse(latest).filter(
            (videoData: Processedvideo) => videoData.videoId !== video.videoId
          ),
          video,
        ])
      );
    }
  };

  const deleteVideo = () => {
    const latest = localStorage.getItem("SAVED_VIDEO");
    if (latest === null) localStorage.setItem("SAVED_VIDEO", "[]");
    else {
      localStorage.setItem(
        "SAVED_VIDEO",
        JSON.stringify([
          ...JSON.parse(latest).filter(
            (videoData: Processedvideo) => videoData.videoId !== video.videoId
          ),
        ])
      );
      setVisible(false);
      setVideosCount((prev) => prev - 1);
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
        <button
          onClick={() => {
            handleVideo("watched");
          }}
        >
          시청완료
        </button>
        <button onClick={deleteVideo}>지우기</button>
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
        <button
          onClick={() => {
            handleVideo("saved");
          }}
        >
          다시보기
        </button>
        <button onClick={deleteVideo}>지우기</button>
      </div>
    );
};

export default VideoItem;
