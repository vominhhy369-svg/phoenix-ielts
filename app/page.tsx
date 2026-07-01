"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [plannerTasks, setPlannerTasks] = useState<string[]>([]);
  const [hasWriting, setHasWriting] = useState(false);

  useEffect(() => {
    const savedWords = localStorage.getItem("learnedWords");
    const savedTasks = localStorage.getItem("plannerTasks");
    const savedEssay = localStorage.getItem("writingEssay");

    if (savedWords) {
      setLearnedWords(JSON.parse(savedWords));
    }

    if (savedTasks) {
      setPlannerTasks(JSON.parse(savedTasks));
    }

    if (savedEssay && savedEssay.trim().length > 0) {
      setHasWriting(true);
    }
  }, []);

  const totalTasks = 6;
  const plannerProgress = Math.round((plannerTasks.length / totalTasks) * 100);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">🎓 IELTS MASTER 7.0</h1>

      <p className="text-slate-400 mb-10">
        Welcome back, Triết 👋 Keep going to IELTS 7.0!
      </p>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">🎯 Goal</h2>
          <p className="mt-3 text-3xl font-bold">IELTS 7.0</p>
          <p className="mt-2 text-slate-400">Deadline: cuối tháng 3</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">📚 Vocabulary</h2>
          <p className="mt-3 text-3xl font-bold">{learnedWords.length} từ</p>
          <p className="mt-2 text-slate-400">Đã học và lưu tiến độ</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">📝 Writing</h2>
          <p className="mt-3 text-3xl font-bold">
            {hasWriting ? "Có bài" : "Chưa có"}
          </p>
          <p className="mt-2 text-slate-400">Bài viết nháp của bạn</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">📅 Tiến độ hôm nay</h2>
          <p className="text-green-400 font-bold text-2xl">
            {plannerProgress}%
          </p>
        </div>

        <div className="w-full h-5 bg-slate-700 rounded-full">
          <div
            className="h-5 bg-green-500 rounded-full"
            style={{ width: `${plannerProgress}%` }}
          ></div>
        </div>

        <p className="mt-4 text-slate-400">
          Bạn đã hoàn thành {plannerTasks.length}/{totalTasks} nhiệm vụ hôm nay.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ✅ Nhiệm vụ hôm nay
          </h2>

          <ul className="space-y-3 text-slate-300">
            <li>📚 Vocabulary - học 20 từ</li>
            <li>✍️ Grammar - học 1 bài</li>
            <li>🎧 Listening - luyện 20 phút</li>
            <li>📖 Reading - làm 1 bài đọc</li>
            <li>📝 Writing - viết 1 đoạn ngắn</li>
            <li>🎤 Speaking - luyện 1 câu hỏi</li>
          </ul>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            🔥 Lời nhắc
          </h2>

          <p className="text-slate-300 leading-8">
            Học đều mỗi ngày quan trọng hơn học quá nhiều trong một ngày.
            Chỉ cần bạn giữ nhịp, mục tiêu IELTS 6.5–7.0 sẽ thực tế hơn rất nhiều.
          </p>
        </div>
      </div>
    </main>
  );
}