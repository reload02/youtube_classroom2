import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchVideo } from "../api/YoutubeAPI";
import { useEffect, useState, useRef } from "react";
import { Processedvideo } from "../type/Type";
import "./watchPage.css";
import { formatVideoDatas } from "../api/YoutubeAPI";

const WatchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [videoData, setVideoData] = useState<Processedvideo>({
    status: "default",
    nextageToken: "",
    etag: "",
    videoId: "",
    channelId: "",
    title: "로딩중",
    description: "",
    thumbnailUrl: "",
    channelTitle: "",
    publishTime: "",
  });
  const [isOpenDetail, setIsOpenSrtail] = useState(false);
  const nav = useNavigate();
  const VideoID = searchParams.get("v") || "";

  useEffect(() => {
    const loadVideoData = async () => {
      const fetchVideoInfo = await fetchVideo(VideoID);
      if (fetchVideoInfo) {
        const formatDatas = formatVideoDatas(fetchVideoInfo)[0];
        setVideoData(formatDatas);
      } else
        setVideoData((prev) => {
          return { ...prev, title: "불러올 영상이 없습니다" };
        });
    };
    loadVideoData();
  }, [VideoID]);

  useEffect(() => {
    if (inputRef.current) {
      const newHeight: number = Math.max(
        inputRef.current.scrollHeight,
        Number(inputRef.current.style.height.slice(0, -2))
      );
      inputRef.current.blur();

      if (isOpenDetail) {
        inputRef.current.style.height = `${newHeight}px`;
      } else if (!isOpenDetail) {
        inputRef.current.style.height = "100px";
      }
    }
  }, [isOpenDetail]);

  return (
    <>
      <div className="watchPage">
        <button
          onClick={() => {
            nav(-1);
          }}
          style={{ height: "50px" }}
        >
          ↩️뒤로가기
        </button>
        <div className="videoContainer">
          <div style={{ width: "700px" }}>
            <img
              src={videoData.thumbnailUrl}
              style={{ width: "650px", height: "500px", borderRadius: "5px" }}
            />
            <h1 style={{ width: "630px", height: "100px", overflow: "hidden" }}>
              {videoData.title}
            </h1>
            <div style={{ fontSize: "25px" }}>{videoData.channelTitle}</div>
            <div style={{ fontSize: "15px", color: "gray" }}>
              업로드 날짜 : {videoData.publishTime.slice(0, 10)}
            </div>
            <textarea
              ref={inputRef}
              onClick={() => {
                setIsOpenSrtail(!isOpenDetail);
              }}
              readOnly
              value={videoData.description}
              style={{
                borderRadius: "5px",
                resize: "none",
                width: "640px",
                padding: "10px",
                border: "None",
                outline: "none",
                height: "100px",
                backgroundColor: "gainsboro",
                overflow: "hidden",
                transition: "height 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchPage;
