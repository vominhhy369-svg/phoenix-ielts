"use client";

import { useEffect, useState } from "react";

export default function Statistics() {
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [grammarLessons, setGrammarLessons] = useState<string[]>([]);
  const [plannerTasks, setPlannerTasks] = useState<string[]>([]);
  const [hasWriting, setHasWriting] = useState(false);
  const [readingBestScore, setReadingBestScore] = useState("Chưa có");
  const [listeningBestScore, setListeningBestScore] = useState("Chưa có");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setLearnedWords(JSON.parse(localStorage.getItem("learnedWords") || "[]"));
    setGrammarLessons(
      JSON.parse(localStorage.getItem("completedGrammarLessons") || "[]")
    );
    setPlannerTasks(JSON.parse(localStorage.getItem("plannerTasks") || "[]"));

    const essay = localStorage.getItem("writingEssay") || "";
    setHasWriting(essay.trim().length > 0);

    const reading = localStorage.getItem("readingBestScore");
    const listening = localStorage.getItem("listeningBestScore");
    const savedStreak = localStorage.getItem("streakCount");

    if (reading) setReadingBestScore(`${reading}/3`);
    if (listening) setListeningBestScore(`${listening}/3`);
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  const totalTasks = 6;
  const totalGrammarLessons = 4;

  const grammarProgress = Math.round(
    (grammarLessons.length / totalGrammarLessons) * 100
  );

  const plannerProgress = Math.round((plannerTasks.length / totalTasks) * 100);

  const readingXP =
    readingBestScore === "Chưa có"
      ? 0
      : Number(readingBestScore.split("/")[0]) * 20;

  const listeningXP =
    listeningBestScore === "Chưa có"
      ? 0
      : Number(listeningBestScore.split("/")[0]) * 20;

  const totalXP =
    learnedWords.length * 10 +
    grammarLessons.length * 30 +
    plannerTasks.length * 20 +
    readingXP +
    listeningXP +
    streak * 25 +
    (hasWriting ? 50 : 0);

  let level = "Beginner";

  if (totalXP >= 600) {
    level = "IELTS Warrior";
  } else if (totalXP >= 300) {
    level = "Learner";
  } else if (totalXP >= 100) {
    level = "Starter";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📊 Statistics</h1>

      <p className="text-slate-400 mb-8">
        Tổng quan tiến độ học IELTS của Triết.
      </p>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Tổng XP</h2>
          <p className="mt-3 text-4xl font-bold">{totalXP}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Level</h2>
          <p className="mt-3 text-3xl font-bold">{level}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Streak</h2>
          <p className="mt-3 text-4xl font-bold">Day {streak}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Writing</h2>
          <p className="mt-3 text-3xl font-bold">
            {hasWriting ? "Có bài" : "Chưa có"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            📚 Vocabulary
          </h2>

          <p className="text-3xl font-bold">{learnedWords.length} từ</p>

          <p className="mt-2 text-slate-400">
            Mỗi từ đã học được tính 10 XP.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            ✍️ Grammar
          </h2>

          <p className="text-3xl font-bold">
            {grammarLessons.length}/{totalGrammarLessons} bài
          </p>

          <div className="mt-4 w-full h-4 bg-slate-700 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{ width: `${grammarProgress}%` }}
            ></div>
          </div>

          <p className="mt-2 text-slate-400">{grammarProgress}% hoàn thành</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            📖 Reading
          </h2>

          <p className="text-3xl font-bold">{readingBestScore}</p>

          <p className="mt-2 text-slate-400">Điểm cao nhất đã lưu.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            🎧 Listening
          </h2>

          <p className="text-3xl font-bold">{listeningBestScore}</p>

          <p className="mt-2 text-slate-400">Điểm cao nhất đã lưu.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 col-span-2">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            📅 Planner hôm nay
          </h2>

          <p className="text-3xl font-bold">
            {plannerTasks.length}/{totalTasks} nhiệm vụ
          </p>

          <div className="mt-4 w-full h-4 bg-slate-700 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{ width: `${plannerProgress}%` }}
            ></div>
          </div>

          <p className="mt-2 text-slate-400">{plannerProgress}% hoàn thành</p>
        </div>
      </div>
    </div>
  );
}