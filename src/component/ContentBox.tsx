import { useEffect, useReducer, useRef, useState } from "react";
import Modal from "./Modal";
import { Processedvideo, VideoLocation } from "../type/Type";
import VideoList from "./VideoList";

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentViewComponent, setCurrentViewComponent] =
    useState<VideoLocation>("onBeforeWatchedBox");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const previousVideos = localStorage.getItem("SAVED_VIDEO");
    if (previousVideos !== null) setVideos(JSON.parse(previousVideos));
    console.log(currentViewComponent);
  }, [currentViewComponent, isModalOpen]);

  return (
    <>
      <button onClick={() => setCurrentViewComponent("onBeforeWatchedBox")}>
        학습전
      </button>
      <button
        onClick={() => {
          setCurrentViewComponent("onAfterWatchedBox");
        }}
      >
        학습후
      </button>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        검색창
      </button>
      <section style={{ border: "1px solid black" }}>
        {currentViewComponent === "onBeforeWatchedBox" ? (
          <VideoList
            videos={videos.filter(
              (video: Processedvideo) => video.status === "saved"
            )}
            location={currentViewComponent}
          />
        ) : (
          <VideoList
            videos={videos.filter(
              (video: Processedvideo) => video.status === "watched"
            )}
            location={currentViewComponent}
          />
        )}
      </section>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ContentBox;
