"use client";

import { useEffect, useState } from "react";

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

const skills = ["Reading", "Listening", "Grammar", "Writing", "Speaking"];

export default function Mistakes() {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [skill, setSkill] = useState("Reading");
  const [question, setQuestion] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedMistakes = localStorage.getItem("ieltsMistakes");

    if (savedMistakes) {
      setMistakes(JSON.parse(savedMistakes));
    }
  }, []);

  const saveMistakes = (newMistakes: Mistake[]) => {
    setMistakes(newMistakes);
    localStorage.setItem("ieltsMistakes", JSON.stringify(newMistakes));
  };

  const addMistake = () => {
    if (
      question.trim().length === 0 ||
      wrongAnswer.trim().length === 0 ||
      correctAnswer.trim().length === 0
    ) {
      alert("Bạn cần nhập câu hỏi, đáp án sai và đáp án đúng.");
      return;
    }

    const newMistake: Mistake = {
      id: String(Date.now()),
      skill,
      question,
      wrongAnswer,
      correctAnswer,
      reason,
      fixed: false,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    saveMistakes([newMistake, ...mistakes]);

    setSkill("Reading");
    setQuestion("");
    setWrongAnswer("");
    setCorrectAnswer("");
    setReason("");
  };

  const toggleFixed = (id: string) => {
    const newMistakes = mistakes.map((mistake) =>
      mistake.id === id ? { ...mistake, fixed: !mistake.fixed } : mistake
    );

    saveMistakes(newMistakes);
  };

  const deleteMistake = (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa lỗi này không?");

    if (!confirmDelete) return;

    const newMistakes = mistakes.filter((mistake) => mistake.id !== id);
    saveMistakes(newMistakes);
  };

  const filteredMistakes = mistakes.filter((mistake) => {
    const keyword = search.toLowerCase();

    return (
      mistake.skill.toLowerCase().includes(keyword) ||
      mistake.question.toLowerCase().includes(keyword) ||
      mistake.wrongAnswer.toLowerCase().includes(keyword) ||
      mistake.correctAnswer.toLowerCase().includes(keyword) ||
      mistake.reason.toLowerCase().includes(keyword)
    );
  });

  const fixedCount = mistakes.filter((mistake) => mistake.fixed).length;
  const notFixedCount = mistakes.length - fixedCount;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        ❌ Mistake Book
      </h1>

      <p className="text-slate-400 mb-8">
        Lưu lại lỗi sai IELTS để ôn tập và tránh lặp lại lỗi cũ.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Tổng lỗi</h2>
          <p className="mt-3 text-4xl font-bold">{mistakes.length}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Đã sửa</h2>
          <p className="mt-3 text-4xl font-bold">{fixedCount}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Cần ôn lại</h2>
          <p className="mt-3 text-4xl font-bold">{notFixedCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-5">
            Thêm lỗi sai mới
          </h2>

          <div className="space-y-4">
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            >
              {skills.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Câu hỏi hoặc lỗi bạn gặp..."
              className="w-full h-28 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500"
            />

            <input
              value={wrongAnswer}
              onChange={(e) => setWrongAnswer(e.target.value)}
              placeholder="Đáp án bạn chọn / lỗi sai..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />

            <input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Đáp án đúng / cách sửa đúng..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Lý do sai hoặc bài học rút ra..."
              className="w-full h-28 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500"
            />

            <button
              onClick={addMistake}
              className="w-full bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition"
            >
              Lưu lỗi sai
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 xl:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-green-400">
                Danh sách lỗi sai
              </h2>

              <p className="text-slate-400 mt-1">
                Ôn lại lỗi cũ để tăng điểm nhanh hơn.
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm lỗi sai..."
              className="w-full md:w-72 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {filteredMistakes.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-6 text-slate-400">
              Chưa có lỗi sai nào hoặc không tìm thấy kết quả.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((mistake) => (
                <div
                  key={mistake.id}
                  className={`rounded-2xl p-5 border ${
                    mistake.fixed
                      ? "bg-green-950 border-green-500"
                      : "bg-slate-900 border-slate-700"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-green-400 font-bold">
                        {mistake.skill} • {mistake.createdAt}
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {mistake.question}
                      </h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        onClick={() => toggleFixed(mistake.id)}
                        className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold hover:bg-green-400 transition"
                      >
                        {mistake.fixed ? "Đã sửa" : "Đánh dấu đã sửa"}
                      </button>

                      <button
                        onClick={() => deleteMistake(mistake.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-400 transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-red-400 font-bold mb-2">Sai</p>
                      <p className="text-slate-300">{mistake.wrongAnswer}</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-green-400 font-bold mb-2">Đúng</p>
                      <p className="text-slate-300">{mistake.correctAnswer}</p>
                    </div>
                  </div>

                  {mistake.reason.trim().length > 0 && (
                    <div className="mt-4 bg-slate-800 rounded-xl p-4">
                      <p className="text-green-400 font-bold mb-2">
                        Bài học rút ra
                      </p>

                      <p className="text-slate-300 leading-7">
                        {mistake.reason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}