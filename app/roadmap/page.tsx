"use client";

import { useEffect, useState } from "react";

const stages = [
  {
    level: "Beginner",
    xp: "0 - 99 XP",
    title: "Làm quen với IELTS",
    description:
      "Tập trung học từ vựng cơ bản, ngữ pháp nền tảng và tạo thói quen học mỗi ngày.",
  },
  {
    level: "Starter",
    xp: "100 - 299 XP",
    title: "Bắt đầu luyện kỹ năng",
    description:
      "Bắt đầu làm Reading, Listening ngắn và viết các đoạn văn đơn giản.",
  },
  {
    level: "Learner",
    xp: "300 - 599 XP",
    title: "Tăng tốc luyện đề",
    description:
      "Luyện đều 4 kỹ năng, theo dõi điểm Reading/Listening và cải thiện Writing.",
  },
  {
    level: "IELTS Warrior",
    xp: "600+ XP",
    title: "Sẵn sàng bứt phá",
    description:
      "Duy trì streak, làm bài đầy đủ và luyện theo format gần giống đề thi thật.",
  },
];

export default function Roadmap() {
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

  let currentLevel = "Beginner";

  if (totalXP >= 600) {
    currentLevel = "IELTS Warrior";
  } else if (totalXP >= 300) {
    currentLevel = "Learner";
  } else if (totalXP >= 100) {
    currentLevel = "Starter";
  }

  const progressToWarrior = Math.min(Math.round((totalXP / 600) * 100), 100);

  let nextSuggestion = "Hãy bắt đầu bằng Vocabulary và Planner hôm nay.";

  if (learnedWords.length < 4) {
    nextSuggestion = "Nên học thêm Vocabulary để mở huy hiệu từ vựng đầu tiên.";
  } else if (grammarLessons.length < 1) {
    nextSuggestion = "Nên hoàn thành ít nhất 1 bài Grammar.";
  } else if (readingBestScore === "Chưa có") {
    nextSuggestion = "Nên làm 1 bài Reading để lưu điểm đầu tiên.";
  } else if (listeningBestScore === "Chưa có") {
    nextSuggestion = "Nên làm 1 bài Listening để lưu điểm đầu tiên.";
  } else if (!hasWriting) {
    nextSuggestion = "Nên viết và lưu 1 bài Writing đầu tiên.";
  } else if (plannerTasks.length < 6) {
    nextSuggestion = "Nên hoàn thành đủ 6 nhiệm vụ trong Planner hôm nay.";
  } else {
    nextSuggestion = "Rất tốt! Hãy duy trì streak và luyện đều mỗi ngày.";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        🗺️ IELTS Roadmap
      </h1>

      <p className="text-slate-400 mb-8">
        Lộ trình học IELTS cá nhân dựa trên tiến độ hiện tại của bạn.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Level hiện tại</h2>

          <p className="mt-3 text-4xl font-bold">{currentLevel}</p>

          <p className="mt-2 text-slate-400">{totalXP} XP</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 xl:col-span-2">
          <div className="flex justify-between mb-3">
            <h2 className="text-2xl font-bold text-green-400">
              Tiến độ tới IELTS Warrior
            </h2>

            <p className="font-bold text-green-400">{progressToWarrior}%</p>
          </div>

          <div className="w-full h-5 bg-slate-700 rounded-full">
            <div
              className="h-5 bg-green-500 rounded-full"
              style={{ width: `${progressToWarrior}%` }}
            ></div>
          </div>

          <p className="mt-3 text-slate-400">
            Cần 600 XP để đạt cấp IELTS Warrior.
          </p>
        </div>
      </div>

      <div className="bg-green-950 border border-green-500 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          🎯 Việc nên làm tiếp theo
        </h2>

        <p className="text-slate-200 leading-7">{nextSuggestion}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stages.map((stage) => {
          const isCurrent = stage.level === currentLevel;

          return (
            <div
              key={stage.level}
              className={`rounded-2xl p-6 border transition ${
                isCurrent
                  ? "bg-green-500 text-black border-green-300"
                  : "bg-slate-800 text-white border-slate-700"
              }`}
            >
              <p
                className={`text-sm font-bold ${
                  isCurrent ? "text-black" : "text-green-400"
                }`}
              >
                {stage.xp}
              </p>

              <h2 className="text-3xl font-bold mt-2">{stage.level}</h2>

              <h3 className="text-xl font-bold mt-4">{stage.title}</h3>

              <p
                className={`mt-3 leading-7 ${
                  isCurrent ? "text-slate-900" : "text-slate-300"
                }`}
              >
                {stage.description}
              </p>

              <p className="mt-5 font-bold">
                {isCurrent ? "✅ Bạn đang ở level này" : "⬜ Chưa phải level hiện tại"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}