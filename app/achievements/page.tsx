"use client";

import { useEffect, useState } from "react";

const achievements = [
  {
    id: "first-word",
    icon: "📚",
    title: "First Word",
    description: "Học ít nhất 1 từ vựng.",
  },
  {
    id: "vocab-4",
    icon: "🔥",
    title: "Vocabulary Starter",
    description: "Học đủ 4 từ vựng đầu tiên.",
  },
  {
    id: "grammar-1",
    icon: "✍️",
    title: "Grammar Starter",
    description: "Hoàn thành ít nhất 1 bài Grammar.",
  },
  {
    id: "reading-1",
    icon: "📖",
    title: "Reading Practice",
    description: "Làm ít nhất 1 bài Reading.",
  },
  {
    id: "listening-1",
    icon: "🎧",
    title: "Listening Practice",
    description: "Làm ít nhất 1 bài Listening.",
  },
  {
    id: "writing-1",
    icon: "📝",
    title: "First Writing",
    description: "Viết và lưu bài Writing đầu tiên.",
  },
  {
    id: "streak-1",
    icon: "🔥",
    title: "First Streak",
    description: "Đạt streak Day 1.",
  },
  {
    id: "warrior",
    icon: "🏆",
    title: "IELTS Warrior",
    description: "Đạt tổng XP từ 600 trở lên.",
  },
];

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const learnedWords = JSON.parse(
      localStorage.getItem("learnedWords") || "[]"
    );

    const grammarLessons = JSON.parse(
      localStorage.getItem("completedGrammarLessons") || "[]"
    );

    const plannerTasks = JSON.parse(
      localStorage.getItem("plannerTasks") || "[]"
    );

    const writingEssay = localStorage.getItem("writingEssay") || "";

    const readingBestScore = localStorage.getItem("readingBestScore");
    const listeningBestScore = localStorage.getItem("listeningBestScore");
    const streakCount = Number(localStorage.getItem("streakCount") || "0");

    const readingXP = readingBestScore ? Number(readingBestScore) * 20 : 0;
    const listeningXP = listeningBestScore ? Number(listeningBestScore) * 20 : 0;

    const xp =
      learnedWords.length * 10 +
      grammarLessons.length * 30 +
      plannerTasks.length * 20 +
      readingXP +
      listeningXP +
      streakCount * 25 +
      (writingEssay.trim().length > 0 ? 50 : 0);

    setTotalXP(xp);

    const newUnlocked: string[] = [];

    if (learnedWords.length >= 1) newUnlocked.push("first-word");
    if (learnedWords.length >= 4) newUnlocked.push("vocab-4");
    if (grammarLessons.length >= 1) newUnlocked.push("grammar-1");
    if (readingBestScore) newUnlocked.push("reading-1");
    if (listeningBestScore) newUnlocked.push("listening-1");
    if (writingEssay.trim().length > 0) newUnlocked.push("writing-1");
    if (streakCount >= 1) newUnlocked.push("streak-1");
    if (xp >= 600) newUnlocked.push("warrior");

    setUnlocked(newUnlocked);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">🏆 Achievements</h1>

      <p className="text-slate-400 mb-8">
        Huy hiệu được mở khóa dựa trên tiến độ học IELTS của bạn.
      </p>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-400">
          Tổng XP hiện tại
        </h2>

        <p className="mt-3 text-4xl font-bold">{totalXP} XP</p>

        <p className="mt-2 text-slate-400">
          Mở thêm huy hiệu bằng cách học Vocabulary, Grammar, Reading,
          Listening, Writing và hoàn thành Planner.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {achievements.map((badge) => {
          const isUnlocked = unlocked.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-6 transition ${
                isUnlocked
                  ? "bg-green-500 text-black"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              <div className="text-5xl mb-4">
                {isUnlocked ? badge.icon : "🔒"}
              </div>

              <h2 className="text-2xl font-bold">{badge.title}</h2>

              <p className="mt-3">{badge.description}</p>

              <p className="mt-5 font-bold">
                {isUnlocked ? "✅ Đã mở khóa" : "⬜ Chưa mở khóa"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
