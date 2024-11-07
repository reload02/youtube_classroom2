import { useState } from "react";
import Modal from "./Modal";

const ContentBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button>학습전</button>
      <button>학습후</button>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        검색창
      </button>
      <section style={{ border: "1px solid black" }}>
        여기에 리스트 드렁옴
      </section>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ContentBox;
