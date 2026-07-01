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

  useEffect(() => {
    const saved = localStorage.getItem("plannerTasks");

    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((item) => item !== task));
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  const progress = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📅 Study Planner</h1>

      <p className="text-slate-400 mb-8">
        Kế hoạch học IELTS hôm nay của Triết.
      </p>

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

      <div className="mt-8 bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          🎯 Mục tiêu
        </h2>

        <p className="text-slate-300">
          Hoàn thành đủ 6 nhiệm vụ mỗi ngày để tiến gần hơn tới IELTS 7.0.
        </p>
      </div>
    </div>
  );
}