"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

type Mistake = {
  id: string;
  skill: string;
  question: string;
  wrongAnswer: string;
  correctAnswer: string;
  reason: string;
  fixed: boolean;
  createdAt: string;
};

type ReviewItem =
  | {
      kind: "note";
      note: Note;
    }
  | {
      kind: "mistake";
      mistake: Mistake;
    };

export default function Review() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("ieltsNotes") || "[]");
    const savedMistakes = JSON.parse(
      localStorage.getItem("ieltsMistakes") || "[]"
    );
    const savedReviewCount = localStorage.getItem("reviewCount");

    setNotes(savedNotes);
    setMistakes(savedMistakes);

    if (savedReviewCount) {
      setReviewCount(Number(savedReviewCount));
    }
  }, []);

  const notFixedMistakes = mistakes.filter((mistake) => !mistake.fixed);
  const fixedMistakes = mistakes.filter((mistake) => mistake.fixed);

  const reviewItems: ReviewItem[] = [
    ...notFixedMistakes.map((mistake) => ({
      kind: "mistake" as const,
      mistake,
    })),
    ...notes.map((note) => ({
      kind: "note" as const,
      note,
    })),
  ];

  const startRandomReview = () => {
    if (reviewItems.length === 0) {
      setCurrentItem(null);
      setMessage("Hiện chưa có Notes hoặc lỗi sai nào để ôn tập.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * reviewItems.length);
    setCurrentItem(reviewItems[randomIndex]);

    const newCount = reviewCount + 1;
    setReviewCount(newCount);
    localStorage.setItem("reviewCount", String(newCount));

    setMessage("");
  };

  const markMistakeFixed = (id: string) => {
    const newMistakes = mistakes.map((mistake) =>
      mistake.id === id ? { ...mistake, fixed: true } : mistake
    );

    setMistakes(newMistakes);
    localStorage.setItem("ieltsMistakes", JSON.stringify(newMistakes));

    setCurrentItem(null);
    setMessage("✅ Đã đánh dấu lỗi này là đã sửa.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">🔁 Review Mode</h1>

      <p className="text-slate-400 mb-8">
        Ôn tập nhanh từ Notes và Mistake Book để nhớ lâu hơn.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">📒 Notes</h2>
          <p className="mt-3 text-4xl font-bold">{notes.length}</p>
          <p className="mt-2 text-slate-400">Ghi chú đã lưu</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">❌ Lỗi cần ôn</h2>
          <p className="mt-3 text-4xl font-bold">{notFixedMistakes.length}</p>
          <p className="mt-2 text-slate-400">Lỗi chưa sửa</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">✅ Đã sửa</h2>
          <p className="mt-3 text-4xl font-bold">{fixedMistakes.length}</p>
          <p className="mt-2 text-slate-400">Lỗi đã sửa</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">🔁 Review</h2>
          <p className="mt-3 text-4xl font-bold">{reviewCount}</p>
          <p className="mt-2 text-slate-400">Số lần ôn tập</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Bắt đầu ôn tập
        </h2>

        <p className="text-slate-300 leading-8 mb-6">
          Bấm nút bên dưới để hệ thống chọn ngẫu nhiên một ghi chú hoặc một lỗi
          sai chưa sửa cho bạn ôn lại.
        </p>

        <button
          onClick={startRandomReview}
          className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition"
        >
          Random Review
        </button>

        {message && <p className="mt-4 text-green-400 font-bold">{message}</p>}
      </div>

      {currentItem && currentItem.kind === "note" && (
        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-green-400 font-bold mb-2">
            📒 Note • {currentItem.note.category} • {currentItem.note.createdAt}
          </p>

          <h2 className="text-3xl font-bold mb-4">{currentItem.note.title}</h2>

          <p className="text-slate-300 leading-8 whitespace-pre-wrap">
            {currentItem.note.content}
          </p>

          <button
            onClick={startRandomReview}
            className="mt-6 bg-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition"
          >
            Ôn câu khác
          </button>
        </div>
      )}

      {currentItem && currentItem.kind === "mistake" && (
        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-green-400 font-bold mb-2">
            ❌ Mistake • {currentItem.mistake.skill} •{" "}
            {currentItem.mistake.createdAt}
          </p>

          <h2 className="text-3xl font-bold mb-5">
            {currentItem.mistake.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-red-400 font-bold mb-2">Đáp án sai</p>
              <p className="text-slate-300">
                {currentItem.mistake.wrongAnswer}
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-green-400 font-bold mb-2">Đáp án đúng</p>
              <p className="text-slate-300">
                {currentItem.mistake.correctAnswer}
              </p>
            </div>
          </div>

          {currentItem.mistake.reason.trim().length > 0 && (
            <div className="bg-slate-900 rounded-2xl p-5 mb-5">
              <p className="text-green-400 font-bold mb-2">Bài học rút ra</p>
              <p className="text-slate-300 leading-8">
                {currentItem.mistake.reason}
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => markMistakeFixed(currentItem.mistake.id)}
              className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition"
            >
              Đánh dấu đã sửa
            </button>

            <button
              onClick={startRandomReview}
              className="bg-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition"
            >
              Ôn câu khác
            </button>
          </div>
        </div>
      )}

      {!currentItem && (
        <div className="bg-green-950 border border-green-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            💡 Cách dùng Review Mode
          </h2>

          <p className="text-slate-300 leading-8">
            Mỗi ngày bạn nên vào Review Mode 5–10 phút. Ôn lại lỗi sai sẽ giúp
            bạn tăng điểm nhanh hơn học quá nhiều kiến thức mới.
          </p>
        </div>
      )}
    </div>
  );
}