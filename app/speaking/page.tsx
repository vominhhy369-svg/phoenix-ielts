"use client";

import { useEffect, useState } from "react";

const topics = [
  {
    part: "Part 1",
    question: "Do you like learning English? Why?",
  },
  {
    part: "Part 1",
    question: "What do you usually do after school?",
  },
  {
    part: "Part 2",
    question:
      "Describe a goal you want to achieve. You should say what it is, why it is important, and how you plan to achieve it.",
  },
  {
    part: "Part 3",
    question: "Why do many students want to study abroad?",
  },
];

export default function Speaking() {
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const savedAnswer = localStorage.getItem("speakingAnswer");
    if (savedAnswer) {
      setAnswer(savedAnswer);
    }
  }, []);

  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const randomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopic(topics[randomIndex]);
    setTime(120);
    setIsRunning(false);
  };

  const saveAnswer = () => {
    localStorage.setItem("speakingAnswer", answer);
    alert("✅ Câu trả lời đã được lưu!");
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">🎤 Speaking</h1>

      <p className="text-slate-400 mb-8">
        Luyện Speaking IELTS với câu hỏi Part 1, Part 2 và Part 3.
      </p>

      <div className="bg-slate-800 rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-center mb-5">
          <span className="bg-green-500 text-black px-4 py-1 rounded-full font-bold">
            {currentTopic.part}
          </span>

          <div className="text-green-400 font-bold text-xl">
            ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-400 leading-snug">
          {currentTopic.question}
        </h2>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Bắt đầu nói
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Tạm dừng
          </button>

          <button
            onClick={randomTopic}
            className="bg-slate-700 px-6 py-3 rounded-xl font-bold"
          >
            Đổi câu hỏi
          </button>
        </div>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ghi ý chính hoặc câu trả lời của bạn ở đây..."
        className="w-full h-64 bg-slate-800 rounded-2xl p-6 text-white outline-none resize-none"
      />

      <button
        onClick={saveAnswer}
        className="mt-6 bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
      >
        Lưu câu trả lời
      </button>

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-3">
          Gợi ý trả lời Speaking
        </h3>

        <ul className="space-y-2 text-slate-300">
          <li>1. Trả lời trực tiếp câu hỏi.</li>
          <li>2. Thêm lý do: because...</li>
          <li>3. Thêm ví dụ cá nhân.</li>
          <li>4. Nói chậm, rõ, không cần quá nhanh.</li>
        </ul>
      </div>
    </div>
  );
}