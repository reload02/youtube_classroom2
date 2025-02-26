import React, { useEffect, useState } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../api/localstorageAPI";

interface Props {
  submitText: string;
  setSubmitText: React.Dispatch<React.SetStateAction<string>>;
}

const RecentSubmitText: React.FC<Props> = ({ submitText, setSubmitText }) => {
  const [recentTexts, setRecentTexts] = useState<string[]>(
    JSON.parse(getLocalStorageData("RECENT_TEXTS"))
  );

  useEffect(() => {
    const editRecentSubmitText = () => {
      setRecentTexts((prev) => {
        return [
          submitText,
          ...prev.filter((text) => text !== submitText),
        ].slice(0, 3);
      });
    };
    if (submitText !== "") editRecentSubmitText();
  }, [submitText]);

  useEffect(() => {
    setLocalStorageData("RECENT_TEXTS", JSON.stringify(recentTexts));
  }, [recentTexts]);

  if (recentTexts.length === 0)
    return (
      <div style={{ fontSize: "10px", color: "gray" }}>
        최근 검색어가 없습니다.
      </div>
    );

  return (
    <div>
      {recentTexts.map((text, index) => {
        return (
          <span
            key={index}
            onClick={() => {
              setSubmitText(text);
            }}
            style={{ cursor: "pointer", fontSize: "10px", color: "gray" }}
          >
            {text + " "}
          </span>
        );
      })}
    </div>
  );
};

export default RecentSubmitText;
