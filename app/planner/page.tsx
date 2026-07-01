"use client";

import { useEffect, useState } from "react";

const tasks = [
  "Vocabulary - học 20 từ",
  "Grammar - học 1 bài",
  "Listening - luyện 20 phút",
  "Reading - làm 1 bài đọc",
  "Writing - viết 1 đoạn ngắn",
  "Speaking - luyện 1 câu hỏi",
];

export default function Planner() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem("plannerTasks");
    const savedStreak = localStorage.getItem("streakCount");

    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }

    if (savedStreak) {
      setStreak(Number(savedStreak));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(completedTasks));

    if (completedTasks.length === tasks.length) {
      const today = new Date().toDateString();
      const lastStreakDate = localStorage.getItem("lastStreakDate");

      if (lastStreakDate !== today) {
        const newStreak = streak + 1;

        setStreak(newStreak);
        localStorage.setItem("streakCount", String(newStreak));
        localStorage.setItem("lastStreakDate", today);
      }
    }
  }, [completedTasks, streak]);

  const toggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((item) => item !== task));
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  const resetToday = () => {
    setCompletedTasks([]);
    localStorage.setItem("plannerTasks", JSON.stringify([]));
  };

  const progress = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📅 Study Planner</h1>

      <p className="text-slate-400 mb-8">
        Kế hoạch học IELTS hôm nay của Triết.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            🔥 Streak
          </h2>

          <p className="mt-3 text-4xl font-bold">
            Day {streak}
          </p>

          <p className="mt-2 text-slate-400">
            Hoàn thành đủ nhiệm vụ mỗi ngày để tăng streak.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            ✅ Hoàn thành
          </h2>

          <p className="mt-3 text-4xl font-bold">
            {completedTasks.length}/{tasks.length}
          </p>

          <p className="mt-2 text-slate-400">
            Nhiệm vụ hôm nay.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex justify-between mb-3">
          <p className="font-bold">Tiến độ hôm nay</p>
          <p className="text-green-400 font-bold">{progress}%</p>
        </div>

        <div className="w-full h-4 bg-slate-700 rounded-full">
          <div
            className="h-4 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <button
            key={task}
            onClick={() => toggleTask(task)}
            className={`w-full text-left p-5 rounded-2xl font-bold transition ${
              completedTasks.includes(task)
                ? "bg-green-500 text-black"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {completedTasks.includes(task) ? "✅" : "⬜"} {task}
          </button>
        ))}
      </div>

      <button
        onClick={resetToday}
        className="mt-8 bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
      >
        Reset nhiệm vụ hôm nay
      </button>

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          🎯 Mục tiêu
        </h2>

        <p className="text-slate-300">
          Hoàn thành đủ 6 nhiệm vụ mỗi ngày để tăng streak và tiến gần hơn tới IELTS 7.0.
        </p>
      </div>
    </div>
  );
}