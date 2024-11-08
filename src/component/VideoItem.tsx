import { Processedvideo, VideoState, VideoLocation } from "../type/Type";

interface Props {
  video: Processedvideo;

  location: VideoLocation;
}

const VideoItem: React.FC<Props> = ({ video, location }) => {
  if (location === "onSearchMoadl")
    return (
      <div>
        <div>{video.title}</div>
        <img src={video.thumbnailUrl} />
        {video.status === "default" ? (
          <button>저장하기</button>
        ) : (
          <button>저장완료</button>
        )}
      </div>
    );
  else if (location === "onBeforeWatchedBox")
    return (
      <div>
        <div>{video.title}</div>
        <img src={video.thumbnailUrl} />
        <button>시청완료</button>
        <button>지우기</button>
      </div>
    );
  else if (location === "onAfterWatchedBox")
    return (
      <div>
        <div>{video.title}</div>
        <img src={video.thumbnailUrl} />
        <button>다시보기</button>
        <button>지우기</button>
      </div>
    );
};

export default VideoItem;
