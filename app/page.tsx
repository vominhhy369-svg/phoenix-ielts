"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Mistake = {
  fixed: boolean;
};

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

  const [mockBestScore, setMockBestScore] = useState("Chưa có");
  const [mockTestCount, setMockTestCount] = useState(0);

  const [notesCount, setNotesCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [fixedMistakesCount, setFixedMistakesCount] = useState(0);

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

    const savedMockBest = localStorage.getItem("mockTestBestScore");
    const savedMockCount = localStorage.getItem("mockTestCount");

    const notes = JSON.parse(localStorage.getItem("ieltsNotes") || "[]");
    const mistakes = JSON.parse(
      localStorage.getItem("ieltsMistakes") || "[]"
    );

    const fixedMistakes = mistakes.filter(
      (mistake: Mistake) => mistake.fixed
    );

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

    if (savedMockBest) setMockBestScore(`${savedMockBest}/6`);
    if (savedMockCount) setMockTestCount(Number(savedMockCount));

    setNotesCount(notes.length);
    setMistakesCount(mistakes.length);
    setFixedMistakesCount(fixedMistakes.length);
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

  const notFixedMistakesCount = mistakesCount - fixedMistakesCount;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
        🎓 IELTS MASTER {targetBand}
      </h1>

      <p className="text-slate-400 mb-8 md:mb-10 text-base md:text-lg">
        Welcome back, {profileName} 👋 Keep going to IELTS {targetBand}!
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
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
            🏆 Level
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">{level}</p>

          <p className="mt-2 text-slate-400">
            Tổng XP:{" "}
            <span className="font-bold text-green-400">{totalXP}</span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🔥 Streak
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">Day {streak}</p>

          <p className="mt-2 text-slate-400">Hoàn thành Planner để tăng.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            🧪 Mock Test
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {mockBestScore}
          </p>

          <p className="mt-2 text-slate-400">Đã làm {mockTestCount} lần</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 mb-8">
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            📚 Vocabulary
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {learnedWords.length} từ
          </p>

          <p className="mt-2 text-slate-400">Mỗi từ = 10 XP</p>
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

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            📒 Notes
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {notesCount}
          </p>

          <p className="mt-2 text-slate-400">Ghi chú đã lưu</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-400">
            ❌ Mistakes
          </h2>

          <p className="mt-3 text-3xl md:text-4xl font-bold">
            {notFixedMistakesCount}
          </p>

          <p className="mt-2 text-slate-400">Lỗi cần ôn lại</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-8">
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
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 md:p-6 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-5">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/roadmap"
            className="bg-slate-900 hover:bg-slate-700 transition rounded-2xl p-5 font-bold"
          >
            🗺️ Xem Roadmap
          </Link>

          <Link
            href="/mock-test"
            className="bg-slate-900 hover:bg-slate-700 transition rounded-2xl p-5 font-bold"
          >
            🧪 Làm Mock Test
          </Link>

          <Link
            href="/notes"
            className="bg-slate-900 hover:bg-slate-700 transition rounded-2xl p-5 font-bold"
          >
            📒 Thêm ghi chú
          </Link>

          <Link
            href="/mistakes"
            className="bg-slate-900 hover:bg-slate-700 transition rounded-2xl p-5 font-bold"
          >
            ❌ Ôn lỗi sai
          </Link>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4">
          🔥 Lời nhắc
        </h2>

        <p className="text-slate-300 leading-8">
          Học đều mỗi ngày quan trọng hơn học quá nhiều trong một ngày. Chỉ cần
          bạn giữ nhịp, ôn lỗi sai và luyện đủ 4 kỹ năng, mục tiêu IELTS{" "}
          {targetBand} sẽ thực tế hơn rất nhiều.
        </p>

        {xpToNextLevel > 0 ? (
          <p className="mt-4 text-slate-400">
            Còn{" "}
            <span className="font-bold text-green-400">{xpToNextLevel} XP</span>{" "}
            để lên level tiếp theo.
          </p>
        ) : (
          <p className="mt-4 text-slate-400">
            Bạn đã đạt level cao nhất hiện tại. Tiếp tục giữ streak nhé!
          </p>
        )}
      </div>
    </main>
  );
}