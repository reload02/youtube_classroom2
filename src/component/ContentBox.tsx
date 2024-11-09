import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Processedvideo, VideoLocation } from "../type/Type";
import VideoList from "./VideoList";

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyMode, setStudyMode] =
    useState<VideoLocation>("onBeforeWatchedBox");
  const [videos, setViseos] = useState([]);

  useEffect(() => {
    setViseos(JSON.parse(localStorage.getItem("SAVED_VIDEO") || "[]"));
  }, [studyMode, isModalOpen]);

  return (
    <>
      <button onClick={() => setStudyMode("onBeforeWatchedBox")}>학습전</button>
      <button
        onClick={() => {
          setStudyMode("onAfterWatchedBox");
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
        {studyMode === "onBeforeWatchedBox" ? (
          <VideoList
            videos={videos.filter(
              (video: Processedvideo) => video.status === "saved"
            )}
            location="onBeforeWatchedBox"
          />
        ) : (
          <VideoList
            videos={videos.filter(
              (video: Processedvideo) => video.status === "watched"
            )}
            location="onBeforeWatchedBox"
          />
        )}
      </section>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ContentBox;
