import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SearchModal from "./SearchModal";
import { Processedvideo, VideoLocation } from "../type/Type";
import VideoList from "./VideoList";
import "./ContentBox.css";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../api/localstorageAPI";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import OpenAI from "openai";

export const setVideoContext = createContext<Dispatch<
  SetStateAction<Processedvideo[]>
> | null>(null);

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentViewComponent, setCurrentViewComponent] =
    useState<VideoLocation>("onBeforeWatchedBox");
  const [videos, setVideos] = useState<Processedvideo[]>([]);

  useEffect(() => {
    gpt();
    if (getLocalStorageData("SAVED_VIDEO") !== "[]") {
      setVideos(JSON.parse(getLocalStorageData("SAVED_VIDEO")));
    }
  }, []);

  useEffect(() => {
    setLocalStorageData("SAVED_VIDEO", JSON.stringify(videos));
  }, [videos]);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const gpt = async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with statements, and your task is to convert them to standard English.",
        },
        {
          role: "user",
          content: "She no went to the market.",
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
    });

    console.log(response.choices[0].message);
  };

  return (
    <div className="contentBox">
      <setVideoContext.Provider value={setVideos}>
        <h1>나만의 유튜브 강의실</h1>
        <LoginButton />
        <LogoutButton />
        <Profile />
        <div className="buttonWrapper">
          <div className="leftChild">
            <button
              style={{
                height:
                  currentViewComponent === "onBeforeWatchedBox"
                    ? "30px"
                    : "25px",
              }}
              onClick={() => setCurrentViewComponent("onBeforeWatchedBox")}
            >
              시청 전
            </button>
            <button
              style={{
                height:
                  currentViewComponent === "onAfterWatchedBox"
                    ? "30px"
                    : "25px",
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
        <SearchModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </setVideoContext.Provider>
    </div>
  );
};

export default ContentBox;
