import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import { Processedvideo, VideoLocation } from "../type/Type";
import VideoList from "./VideoList";

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentViewComponent, setCurrentViewComponent] =
    useState<VideoLocation>("onBeforeWatchedBox");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const savedVideoData = localStorage.getItem("SAVED_VIDEO");
    if (savedVideoData !== null) setVideos(JSON.parse(savedVideoData));
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
      <SearchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ContentBox;
