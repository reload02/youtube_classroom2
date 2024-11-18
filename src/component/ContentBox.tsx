import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import { Processedvideo, VideoLocation } from "../type/Type";
import VideoList from "./VideoList";
import "./ContentBox.css";

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentViewComponent, setCurrentViewComponent] =
    useState<VideoLocation>("onBeforeWatchedBox");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const savedVideoData = localStorage.getItem("SAVED_VIDEO");
    if (savedVideoData !== null) setVideos(JSON.parse(savedVideoData));
  }, [currentViewComponent, isModalOpen]);

  return (
    <div className="contentBox">
      <h1>나만의 유튜브 강의실</h1>
      <div className="buttonWrapper">
        <div className="leftChild">
          <button
            style={{
              height:
                currentViewComponent === "onBeforeWatchedBox" ? "30px" : "25px",
            }}
            onClick={() => setCurrentViewComponent("onBeforeWatchedBox")}
          >
            시청 전
          </button>
          <button
            style={{
              height:
                currentViewComponent === "onAfterWatchedBox" ? "30px" : "25px",
            }}
            onClick={() => {
              setCurrentViewComponent("onAfterWatchedBox");
            }}
          >
            시청 후
          </button>
        </div>
        <div className="rightChild">
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            검색 🔍
          </button>
        </div>
      </div>
      <section>
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
    </div>
  );
};

export default ContentBox;
