import "./Modal.css";
import { useEffect, useState } from "react";
import RecentSubmitText from "./RecentSubmitText";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");

  useEffect(() => {
    console.log(submitText);
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
      </div>
    </div>
  );
};

export default Modal;
