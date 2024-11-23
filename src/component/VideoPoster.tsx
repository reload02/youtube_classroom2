import { useNavigate } from "react-router-dom";
import { Processedvideo } from "../type/Type";

interface Props {
  video: Processedvideo;
}

const VideoPoster: React.FC<Props> = ({ video }) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav(`watch/?v=${video.videoId}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <img
        src={video.thumbnailUrl}
        style={{ width: "250px", height: "200px", borderRadius: "5px" }}
      />
      <div style={{ width: "250px", height: "50px", textAlign: "center" }}>
        {video.title.length > 40
          ? video.title.slice(0, 40) + "...."
          : video.title}
      </div>
    </div>
  );
};

export default VideoPoster;
