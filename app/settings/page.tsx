"use client";

import { useEffect, useState } from "react";

const storageKeys = [
  "learnedWords",
  "plannerTasks",
  "completedGrammarLessons",

  "writingEssay",
  "speakingAnswer",

  "readingLastScore",
  "readingBestScore",
  "listeningLastScore",
  "listeningBestScore",

  "streakCount",
  "lastStreakDate",
  "lastStudyDate",

  "profileName",
  "profileTargetBand",
  "profileDeadline",
  "profileReason",

  "mockTestLastScore",
  "mockTestBestScore",
  "mockTestCount",
  "mockTestWriting",
  "mockTestSpeaking",

  "ieltsNotes",
  "ieltsMistakes",

  "reviewCount",
];

type Mistake = {
  fixed: boolean;
};

export default function Settings() {
  const [profileName, setProfileName] = useState("Triết");
  const [targetBand, setTargetBand] = useState("7.0");

  const [learnedWords, setLearnedWords] = useState(0);
  const [grammarLessons, setGrammarLessons] = useState(0);
  const [plannerTasks, setPlannerTasks] = useState(0);

  const [hasWriting, setHasWriting] = useState(false);
  const [hasSpeaking, setHasSpeaking] = useState(false);

  const [readingBestScore, setReadingBestScore] = useState("Chưa có");
  const [listeningBestScore, setListeningBestScore] = useState("Chưa có");

  const [streak, setStreak] = useState(0);

  const [mockBestScore, setMockBestScore] = useState("Chưa có");
  const [mockTestCount, setMockTestCount] = useState(0);

  const [notesCount, setNotesCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [fixedMistakesCount, setFixedMistakesCount] = useState(0);

  const [reviewCount, setReviewCount] = useState(0);

  const [message, setMessage] = useState("");

  const loadData = () => {
    const words = JSON.parse(localStorage.getItem("learnedWords") || "[]");

    const grammar = JSON.parse(
      localStorage.getItem("completedGrammarLessons") || "[]"
    );

    const tasks = JSON.parse(localStorage.getItem("plannerTasks") || "[]");

    const essay = localStorage.getItem("writingEssay") || "";
    const speaking = localStorage.getItem("speakingAnswer") || "";

    const reading = localStorage.getItem("readingBestScore");
    const listening = localStorage.getItem("listeningBestScore");

    const savedStreak = localStorage.getItem("streakCount");

    const savedProfileName = localStorage.getItem("profileName");
    const savedTargetBand = localStorage.getItem("profileTargetBand");

    const savedMockBest = localStorage.getItem("mockTestBestScore");
    const savedMockCount = localStorage.getItem("mockTestCount");

    const notes = JSON.parse(localStorage.getItem("ieltsNotes") || "[]");

    const mistakes = JSON.parse(
      localStorage.getItem("ieltsMistakes") || "[]"
    );

    const savedReviewCount = localStorage.getItem("reviewCount");

    const fixedMistakes = mistakes.filter(
      (mistake: Mistake) => mistake.fixed
    ).length;

    setProfileName(savedProfileName || "Triết");
    setTargetBand(savedTargetBand || "7.0");

    setLearnedWords(words.length);
    setGrammarLessons(grammar.length);
    setPlannerTasks(tasks.length);

    setHasWriting(essay.trim().length > 0);
    setHasSpeaking(speaking.trim().length > 0);

    setReadingBestScore(reading ? `${reading}/3` : "Chưa có");
    setListeningBestScore(listening ? `${listening}/3` : "Chưa có");

    setStreak(savedStreak ? Number(savedStreak) : 0);

    setMockBestScore(savedMockBest ? `${savedMockBest}/6` : "Chưa có");
    setMockTestCount(savedMockCount ? Number(savedMockCount) : 0);

    setNotesCount(notes.length);
    setMistakesCount(mistakes.length);
    setFixedMistakesCount(fixedMistakes);

    setReviewCount(savedReviewCount ? Number(savedReviewCount) : 0);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetProgress = () => {
    const confirmReset = window.confirm(
      "Bạn có chắc muốn xóa toàn bộ dữ liệu Phoenix IELTS không?"
    );

    if (!confirmReset) return;

    storageKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    loadData();

    setMessage("✅ Đã reset toàn bộ dữ liệu Phoenix IELTS.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">⚙️ Settings</h1>

      <p className="text-slate-400 mb-8">
        Quản lý dữ liệu học tập đang lưu trong Phoenix IELTS.
      </p>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          👤 Profile hiện tại
        </h2>

        <p className="text-slate-300">
          Học viên: <span className="font-bold text-white">{profileName}</span>
        </p>

        <p className="text-slate-300 mt-2">
          Target Band:{" "}
          <span className="font-bold text-white">IELTS {targetBand}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">📚 Vocabulary</h2>
          <p className="mt-3 text-4xl font-bold">{learnedWords}</p>
          <p className="mt-2 text-slate-400">Từ đã học</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">✍️ Grammar</h2>
          <p className="mt-3 text-4xl font-bold">{grammarLessons}</p>
          <p className="mt-2 text-slate-400">Bài đã hoàn thành</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">📅 Planner</h2>
          <p className="mt-3 text-4xl font-bold">{plannerTasks}/6</p>
          <p className="mt-2 text-slate-400">Nhiệm vụ hôm nay</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">🔥 Streak</h2>
          <p className="mt-3 text-4xl font-bold">Day {streak}</p>
          <p className="mt-2 text-slate-400">Chuỗi học liên tiếp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            📖 Reading / Listening
          </h2>

          <p className="text-slate-300 mb-2">
            Reading cao nhất:{" "}
            <span className="font-bold text-white">{readingBestScore}</span>
          </p>

          <p className="text-slate-300">
            Listening cao nhất:{" "}
            <span className="font-bold text-white">{listeningBestScore}</span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            📝 Writing / Speaking
          </h2>

          <p className="text-slate-300 mb-2">
            Writing:{" "}
            <span className="font-bold text-white">
              {hasWriting ? "Có bài đã lưu" : "Chưa có bài"}
            </span>
          </p>

          <p className="text-slate-300">
            Speaking:{" "}
            <span className="font-bold text-white">
              {hasSpeaking ? "Có câu trả lời đã lưu" : "Chưa có câu trả lời"}
            </span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            🧪 Mock Test
          </h2>

          <p className="text-slate-300 mb-2">
            Điểm cao nhất:{" "}
            <span className="font-bold text-white">{mockBestScore}</span>
          </p>

          <p className="text-slate-300">
            Số lần làm:{" "}
            <span className="font-bold text-white">{mockTestCount}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">📒 Notes</h2>

          <p className="text-4xl font-bold">{notesCount}</p>

          <p className="mt-2 text-slate-400">Ghi chú đã lưu</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            ❌ Mistake Book
          </h2>

          <p className="text-slate-300 mb-2">
            Tổng lỗi:{" "}
            <span className="font-bold text-white">{mistakesCount}</span>
          </p>

          <p className="text-slate-300">
            Đã sửa:{" "}
            <span className="font-bold text-white">{fixedMistakesCount}</span>
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            🔁 Review Mode
          </h2>

          <p className="text-4xl font-bold">{reviewCount}</p>

          <p className="mt-2 text-slate-400">Số lần ôn tập nhanh</p>
        </div>
      </div>

      <div className="bg-red-950 border border-red-500 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-3">Danger Zone</h2>

        <p className="text-slate-300 mb-5 leading-7">
          Nút này sẽ xóa toàn bộ dữ liệu đã lưu trên trình duyệt hiện tại:
          Profile, Vocabulary, Grammar, Reading, Listening, Writing, Speaking,
          Planner, Streak, Mock Test, Notes, Mistake Book và Review Mode.
        </p>

        <button
          onClick={resetProgress}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-400 transition"
        >
          Reset toàn bộ dữ liệu
        </button>

        {message && <p className="mt-4 text-green-400 font-bold">{message}</p>}
      </div>
    </div>
  );
}