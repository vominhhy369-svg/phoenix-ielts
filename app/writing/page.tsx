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

  const paragraphCount = essay
    .split("\n")
    .filter((paragraph) => paragraph.trim().length > 0).length;

  let estimatedBand = "Chưa đủ dữ liệu";
  let feedback = "Hãy viết bài để nhận nhận xét.";

  if (wordCount > 0 && wordCount < 100) {
    estimatedBand = "Band 4.0 - 5.0";
    feedback =
      "Bài còn khá ngắn. Với IELTS Writing Task 2, bạn nên viết khoảng 250 từ.";
  } else if (wordCount >= 100 && wordCount < 200) {
    estimatedBand = "Band 5.0 - 6.0";
    feedback =
      "Bài đã có nội dung nhưng vẫn cần phát triển thêm ý, ví dụ và kết luận.";
  } else if (wordCount >= 200 && wordCount < 250) {
    estimatedBand = "Band 6.0 - 6.5";
    feedback =
      "Bài khá ổn. Hãy cố gắng đạt ít nhất 250 từ và chia đoạn rõ hơn.";
  } else if (wordCount >= 250) {
    estimatedBand = "Band 6.5+";
    feedback =
      "Độ dài tốt. Tiếp theo hãy kiểm tra ngữ pháp, từ nối, ví dụ và tính mạch lạc.";
  }

  const saveEssay = () => {
    localStorage.setItem("writingEssay", essay);
    setSavedMessage("✅ Bài viết đã được lưu!");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const clearEssay = () => {
    setEssay("");
    localStorage.removeItem("writingEssay");
    setSavedMessage("🗑️ Đã xóa bài viết.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📝 Writing</h1>

      <p className="text-slate-400 mb-8">
        Luyện IELTS Writing Task 2, đếm số từ, lưu bài và nhận xét cơ bản.
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

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Số từ</h2>
          <p className="mt-3 text-4xl font-bold">{wordCount}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Số đoạn</h2>
          <p className="mt-3 text-4xl font-bold">{paragraphCount}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            Band ước lượng
          </h2>
          <p className="mt-3 text-2xl font-bold">{estimatedBand}</p>
        </div>
      </div>

      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Viết bài của bạn ở đây..."
        className="w-full h-80 bg-slate-800 rounded-2xl p-6 text-white outline-none resize-none"
      />

      <div className="mt-6 flex gap-4">
        <button
          onClick={saveEssay}
          className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
        >
          Lưu bài viết
        </button>

        <button
          onClick={clearEssay}
          className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold"
        >
          Xóa bài viết
        </button>
      </div>

      {savedMessage && (
        <p className="mt-4 text-green-400 font-bold">{savedMessage}</p>
      )}

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-3">
          Nhận xét tự động
        </h3>

        <p className="text-slate-300 leading-8">{feedback}</p>
      </div>

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-3">
          Gợi ý cấu trúc
        </h3>

        <ul className="space-y-2 text-slate-300">
          <li>1. Introduction: Paraphrase đề + nêu ý kiến.</li>
          <li>2. Body 1: Trình bày quan điểm thứ nhất + ví dụ.</li>
          <li>3. Body 2: Trình bày quan điểm thứ hai + ví dụ.</li>
          <li>4. Conclusion: Tóm tắt và khẳng định ý kiến.</li>
        </ul>
      </div>
    </div>
  );
}