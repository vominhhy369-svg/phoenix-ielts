"use client";

import { useEffect, useState } from "react";

export default function Writing() {
  const [essay, setEssay] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedEssay = localStorage.getItem("writingEssay");

    if (savedEssay) {
      setEssay(savedEssay);
    }
  }, []);

  const wordCount = essay
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const saveEssay = () => {
    localStorage.setItem("writingEssay", essay);
    setSavedMessage("✅ Bài viết đã được lưu!");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📝 Writing</h1>

      <p className="text-slate-400 mb-8">
        Luyện viết IELTS Task 2. Viết bài, đếm số từ và lưu nháp.
      </p>

      <div className="bg-slate-800 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Writing Task 2
        </h2>

        <p className="text-slate-300 leading-8">
          Some people think students should study alone, while others believe
          studying in groups is better. Discuss both views and give your own
          opinion.
        </p>
      </div>

      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Viết bài của bạn ở đây..."
        className="w-full h-80 bg-slate-800 rounded-2xl p-6 text-white outline-none resize-none"
      />

      <div className="mt-6 flex justify-between items-center">
        <p className="text-slate-400">
          Số từ:{" "}
          <span className="text-green-400 font-bold">{wordCount}</span>
        </p>

        <button
          onClick={saveEssay}
          className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
        >
          Lưu bài viết
        </button>
      </div>

      {savedMessage && (
        <p className="mt-4 text-green-400 font-bold">
          {savedMessage}
        </p>
      )}

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-3">
          Gợi ý cấu trúc
        </h3>

        <ul className="space-y-2 text-slate-300">
          <li>1. Introduction: Paraphrase đề + nêu ý kiến.</li>
          <li>2. Body 1: Lý do học một mình có lợi.</li>
          <li>3. Body 2: Lý do học nhóm có lợi.</li>
          <li>4. Conclusion: Tóm tắt và khẳng định ý kiến.</li>
        </ul>
      </div>
    </div>
  );
}