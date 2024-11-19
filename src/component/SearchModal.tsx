import "./Modal.css";
import { useEffect, useState } from "react";
import RecentSubmitText from "./RecentSubmitText";
import { fetchQueryVideo } from "../api/YoutubeAPI";
import { ApiVideo, Processedvideo } from "../type/Type";
import VideoList from "./VideoList";
import { formatVideoDatas } from "../api/YoutubeAPI";

//import { fetchMok } from "../api/YoutubeAPI";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");
  const [videos, setVideos] = useState<Processedvideo[]>([]);

  useEffect(() => {
    const fetchData = async (submitText: string) => {
      const fetchedData = await fetchQueryVideo(submitText);

      if (fetchedData !== null) {
        const formatDatas = formatVideoDatas(fetchedData);
        setVideos(formatDatas);
      } else setVideos([]);
    };
    if (submitText !== "" && isModalOpen) {
      fetchData(submitText);
      //setVideos(fetchMok());
      setSearchText(submitText);
    }
  }, [submitText, isModalOpen]);

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
        <div>
          <VideoList videos={videos} location="onSearchMoadl" />
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
