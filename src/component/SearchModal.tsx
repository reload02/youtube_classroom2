import "./Modal.css";
import { useEffect, useState, useRef } from "react";
import RecentSubmitText from "./RecentSubmitText";
import { fetchQueryVideo } from "../api/YoutubeAPI";
import { Processedvideo } from "../type/Type";
import VideoList from "./VideoList";
import { processVideoDatas } from "../api/YoutubeAPI";
import "./LoadinfSppiner.css";

//import { fetchMok } from "../api/YoutubeAPI";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");
  const [videos, setVideos] = useState<Processedvideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVideos([]);
    setNextPageToken(undefined);
  }, [submitText]);

  useEffect(() => {
    const fetchData = async (
      submitText: string,
      nextageToken?: string | undefined
    ) => {
      setIsLoading(true);
      const fetchedData = await fetchQueryVideo(submitText, nextageToken);
      if (fetchedData !== null) {
        const formatDatas = processVideoDatas(fetchedData);

        if (nextageToken === undefined) setVideos(formatDatas);
        else
          setVideos((prev) => {
            const allVideos = [...prev, ...formatDatas];
            const uniqueVideos = Array.from(
              new Map(allVideos.map((video) => [video.videoId, video])).values()
            );
            return uniqueVideos;
          });
      } else setVideos([]);
      setIsLoading(false);
    };
    if (submitText !== "" && isModalOpen) {
      fetchData(submitText, nextPageToken);
      //setVideos(fetchMok());
      setSearchText(submitText);
    }
  }, [submitText, isModalOpen, nextPageToken]);

  useEffect(() => {
    if (videos.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(videos);
          setNextPageToken(videos[videos.length - 1].nextageToken);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [videos]);

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
            onKeyDown={(e) => {
              if (e.code === "Enter") setSubmitText(searchText);
            }}
          ></input>
          <button
            onClick={() => {
              setSubmitText(searchText);
            }}
          >
            검색
          </button>
          <button
            onClick={() => {
              console.log(videos.length);
            }}
          >
            e다음페이지
          </button>
        </div>
        <RecentSubmitText
          submitText={submitText}
          setSubmitText={setSubmitText}
        />
        <div>
          <VideoList videos={videos} location="onSearchMoadl" />
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "60px",
              }}
            >
              <section className="spinner" />
            </div>
          ) : (
            <></>
          )}
          <div ref={observerRef} style={{ height: "10px" }} />
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
