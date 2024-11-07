import "./Modal.css";
import { useEffect, useState } from "react";
import RecentSubmitText from "./RecentSubmitText";
import { fetchSearchVideo } from "../api/YoutubeAPI";
import { processedvideo } from "../type/Type";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");
  const [videos, setVideos] = useState<processedvideo[]>([]);

  useEffect(() => {
    console.log(submitText);
    const fetchData = async (submitText: string) => {
      const temp = await fetchSearchVideo(submitText);
      if (temp !== null) setVideos(temp);
      else setVideos([]);
    };
    fetchData(submitText);
  }, [submitText]);

  if (!isModalOpen) return null;
  return (
    <div className="modal" onClick={() => setIsModalOpen(false)}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div>유튜브영상을 검색하세요</div>
        <div>
          <input
            placeholder="검색어를 입력하시오."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setSubmitText(searchText);
            }}
          >
            검색
          </button>
        </div>
        <RecentSubmitText
          submitText={submitText}
          setSubmitText={setSubmitText}
        />
        {videos.map((video, index) => (
          <div key={index}>{video.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
