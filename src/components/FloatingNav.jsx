import React from "react";
import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import topIcon from "../assets/top.svg";

const FloatingNav = () => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} 복사 완료!`);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-4 z-50">
      <button
        onClick={() => handleCopy("youremail@example.com")}
        className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
      >
        <img src={emailIcon} alt="이메일" className="w-6 h-6" />
      </button>

      <button
        onClick={() => handleCopy("010-1234-5678")}
        className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
      >
        <img src={phoneIcon} alt="전화번호" className="w-6 h-6" />
      </button>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
      >
        <img src={topIcon} alt="Top으로" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingNav;
