"use client";

import { useEffect, useState } from "react";
import Flashcard from "../../components/Flashcard";

const words = [
  { word: "improve", meaning: "cải thiện" },
  { word: "goal", meaning: "mục tiêu" },
  { word: "habit", meaning: "thói quen" },
  { word: "focus", meaning: "tập trung" },
];

export default function Vocabulary() {
  const [search, setSearch] = useState("");
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("learnedWords");

    if (saved) {
      setLearnedWords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
  }, [learnedWords]);

  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLearned = (word: string) => {
    if (learnedWords.includes(word)) {
      setLearnedWords(learnedWords.filter((item) => item !== word));
    } else {
      setLearnedWords([...learnedWords, word]);
    }
  };

  const learnedCount = filteredWords.filter((item) =>
    learnedWords.includes(item.word)
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📚 Vocabulary</h1>

      <p className="text-slate-400 mb-8">
        Tìm kiếm và học từ vựng IELTS.
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm từ vựng..."
        className="w-full mb-8 rounded-xl bg-slate-800 px-5 py-3 text-white outline-none"
      />

      <div className="flex justify-between items-center text-slate-400 mb-6">
        <p>Đang hiển thị: {filteredWords.length} từ</p>

        <p className="text-green-400 font-bold">
          ✅ Đã học: {learnedCount}/{filteredWords.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredWords.map((item) => (
          <div key={item.word}>
            <Flashcard word={item.word} meaning={item.meaning} />

            <button
              onClick={() => toggleLearned(item.word)}
              className={`mt-3 w-full py-2 rounded-xl font-bold ${
                learnedWords.includes(item.word)
                  ? "bg-green-500 text-black"
                  : "bg-slate-700 text-white"
              }`}
            >
              {learnedWords.includes(item.word)
                ? "✅ Đã học"
                : "⬜ Chưa học"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}