import React, { useEffect, useState } from "react";

interface Props {
  submitText: string;
  setSubmitText: React.Dispatch<React.SetStateAction<string>>;
}

const RecentSubmitText: React.FC<Props> = ({ submitText, setSubmitText }) => {
  const [recentTexts, setRecentTexts] = useState<string[]>([]);

  useEffect(() => {
    const editRecentSubmitText = () => {
      setRecentTexts((prev) => {
        return [
          submitText,
          ...prev.filter((text) => text !== submitText),
        ].slice(0, 3);
      });
    };
    editRecentSubmitText();
  }, [submitText]);

  return (
    <div>
      {recentTexts.map((text, index) => {
        return (
          <span
            key={index}
            onClick={() => {
              setSubmitText(text);
            }}
          >
            {text + " "}
          </span>
        );
      })}
    </div>
  );
};

export default RecentSubmitText;
