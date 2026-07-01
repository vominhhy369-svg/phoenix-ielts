"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [profileName, setProfileName] = useState("Triết");
  const [targetBand, setTargetBand] = useState("7.0");
  const [deadline, setDeadline] = useState("Cuối tháng 3");

  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [plannerTasks, setPlannerTasks] = useState<string[]>([]);
  const [grammarLessons, setGrammarLessons] = useState<string[]>([]);
  const [hasWriting, setHasWriting] = useState(false);
  const [streak, setStreak] = useState(0);

  const [readingLastScore, setReadingLastScore] = useState<string>("Chưa có");
  const [readingBestScore, setReadingBestScore] = useState<string>("Chưa có");

  const [listeningLastScore, setListeningLastScore] =
    useState<string>("Chưa có");
  const [listeningBestScore, setListeningBestScore] =
    useState<string>("Chưa có");

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedTargetBand = localStorage.getItem("profileTargetBand");
    const savedDeadline = localStorage.getItem("profileDeadline");

    const savedWords = localStorage.getItem("learnedWords");
    const savedTasks = localStorage.getItem("plannerTasks");
    const savedGrammar = localStorage.getItem("completedGrammarLessons");
    const savedEssay = localStorage.getItem("writingEssay");
    const savedStreak = localStorage.getItem("streakCount");

    const savedReadingLast = localStorage.getItem("readingLastScore");
    const savedReadingBest = localStorage.getItem("readingBestScore");

    const savedListeningLast = localStorage.getItem("listeningLastScore");
    const savedListeningBest = localStorage.getItem("listeningBestScore");

    if (savedName) setProfileName(savedName);
    if (savedTargetBand) setTargetBand(savedTargetBand);
    if (savedDeadline) setDeadline(savedDeadline);

    if (savedWords) setLearnedWords(JSON.parse(savedWords));
    if (savedTasks) setPlannerTasks(JSON.parse(savedTasks));
    if (savedGrammar) setGrammarLessons(JSON.parse(savedGrammar));

    if (savedEssay && savedEssay.trim().length > 0) {
      setHasWriting(true);
    }

    if (savedStreak) {
      setStreak(Number(savedStreak));
    }

    if (savedReadingLast) setReadingLastScore(`${savedReadingLast}/3`);
    if (savedReadingBest) setReadingBestScore(`${savedReadingBest}/3`);

    if (savedListeningLast) setListeningLastScore(`${savedListeningLast}/3`);
    if (savedListeningBest) setListeningBestScore(`${savedListeningBest}/3`);
  }, []);

  const totalTasks = 6;
  const totalGrammarLessons = 4;

  const plannerProgress = Math.round((plannerTasks.length / totalTasks) * 100);

  const grammarProgress = Math.round(
    (grammarLessons.length / totalGrammarLessons) * 100
  );

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

  const xpToNextLevel =
    totalXP < 100
      ? 100 - totalXP
      : totalXP < 300
      ? 300 - totalXP
      : totalXP < 600
      ? 600 - totalXP
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
        🎓 IELTS MASTER {targetBand}
      </h1>

      <p className="text-slate-400 mb-8 md:mb-10 text-base md:text-lg">
        Welcome back, {profileName} 👋 Keep going to IELTS {targetBand}!
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8 md:mb-10">
        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🎯 Goal
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            IELTS {targetBand}
          </p>

          <p className="mt-2 text-slate-400">Deadline: {deadline}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            📚 Vocabulary
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {learnedWords.length} từ
          </p>

          <p className="mt-2 text-slate-400">Đã học và lưu tiến độ</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            ✍️ Grammar
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {grammarLessons.length}/{totalGrammarLessons}
          </p>

          <p className="mt-2 text-slate-400">Bài ngữ pháp đã học</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            📝 Writing
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {hasWriting ? "Có bài" : "Chưa có"}
          </p>

          <p className="mt-2 text-slate-400">Bài viết nháp của bạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 mb-8 md:mb-10">
        <div className="bg-slate-800 rounded-2xl p-5 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              📅 Tiến độ hôm nay
            </h2>

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
            Bạn đã hoàn thành {plannerTasks.length}/{totalTasks} nhiệm vụ hôm
            nay.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              ✍️ Tiến độ Grammar
            </h2>

            <p className="text-green-400 font-bold text-2xl">
              {grammarProgress}%
            </p>
          </div>

          <div className="w-full h-5 bg-slate-700 rounded-full">
            <div
              className="h-5 bg-green-500 rounded-full"
              style={{ width: `${grammarProgress}%` }}
            ></div>
          </div>

          <p className="mt-4 text-slate-400">
            Bạn đã học {grammarLessons.length}/{totalGrammarLessons} bài
            Grammar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8 md:mb-10">
        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            📖 Reading
          </h2>

          <p className="mt-3 text-slate-300">
            Gần nhất: <span className="font-bold">{readingLastScore}</span>
          </p>

          <p className="mt-2 text-slate-300">
            Cao nhất: <span className="font-bold">{readingBestScore}</span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🎧 Listening
          </h2>

          <p className="mt-3 text-slate-300">
            Gần nhất: <span className="font-bold">{listeningLastScore}</span>
          </p>

          <p className="mt-2 text-slate-300">
            Cao nhất: <span className="font-bold">{listeningBestScore}</span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🔥 Streak
          </h2>

          <p className="mt-3 text-3xl font-bold">Day {streak}</p>

          <p className="mt-2 text-slate-400">
            Hoàn thành đủ nhiệm vụ để tăng streak.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🏆 Level
          </h2>

          <p className="mt-3 text-3xl font-bold">{level}</p>

          <p className="mt-2 text-slate-400">
            Tổng XP:{" "}
            <span className="font-bold text-green-400">{totalXP}</span>
          </p>

          {xpToNextLevel > 0 ? (
            <p className="mt-2 text-slate-500">
              Còn {xpToNextLevel} XP để lên level tiếp theo.
            </p>
          ) : (
            <p className="mt-2 text-slate-500">
              Bạn đã đạt level cao nhất hiện tại.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">
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

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">
            🔥 Lời nhắc
          </h2>

          <p className="text-slate-300 leading-8">
            Học đều mỗi ngày quan trọng hơn học quá nhiều trong một ngày.
            Chỉ cần bạn giữ nhịp, mục tiêu IELTS {targetBand} sẽ thực tế hơn
            rất nhiều.
          </p>
        </div>
      </div>
    </main>
  );
}