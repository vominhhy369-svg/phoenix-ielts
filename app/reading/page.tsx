"use client";

import { useEffect, useState } from "react";

const questions = [
  {
    question: "What is the main topic of the passage?",
    options: ["Sports", "Learning English", "Music", "Food"],
    answer: "Learning English",
  },
  {
    question: "What should students do every day?",
    options: ["Sleep more", "Practice English", "Play games", "Skip lessons"],
    answer: "Practice English",
  },
  {
    question: "Why is reading useful?",
    options: [
      "It improves vocabulary",
      "It wastes time",
      "It makes students tired",
      "It is not important",
    ],
    answer: "It improves vocabulary",
  },
];

export default function Reading() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [time, setTime] = useState(600);

  useEffect(() => {
    const savedLastScore = localStorage.getItem("readingLastScore");
    const savedBestScore = localStorage.getItem("readingBestScore");

    if (savedLastScore) {
      setLastScore(Number(savedLastScore));
    }

    if (savedBestScore) {
      setBestScore(Number(savedBestScore));
    }
  }, []);

  useEffect(() => {
    if (time <= 0 || score !== null) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, score]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const chooseAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const submitQuiz = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
    setLastScore(correct);
    localStorage.setItem("readingLastScore", String(correct));

    if (bestScore === null || correct > bestScore) {
      setBestScore(correct);
      localStorage.setItem("readingBestScore", String(correct));
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setScore(null);
    setTime(600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold">📖 Reading</h1>
          <p className="text-slate-400 mt-3">
            Luyện đọc IELTS với bài đọc ngắn, timer và lưu điểm.
          </p>
        </div>

        <div className="bg-slate-800 px-6 py-3 rounded-2xl font-bold text-green-400">
          ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            Điểm gần nhất
          </h2>
          <p className="mt-3 text-3xl font-bold">
            {lastScore === null ? "Chưa có" : `${lastScore}/${questions.length}`}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            Điểm cao nhất
          </h2>
          <p className="mt-3 text-3xl font-bold">
            {bestScore === null ? "Chưa có" : `${bestScore}/${questions.length}`}
          </p>
        </div>
      </div>

      {time === 0 && (
        <div className="bg-red-500 text-white p-4 rounded-xl mb-6 font-bold">
          ⏰ Hết giờ rồi! Hãy nộp bài để xem kết quả.
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          The Importance of Learning English
        </h2>

        <p className="text-slate-300 leading-8">
          English is an important language for students around the world.
          Learning English can help students read books, watch videos, and
          communicate with people from many countries. To improve their English,
          students should practice every day. Reading is especially useful
          because it helps learners build vocabulary and understand how sentences
          are written.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.question} className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">
              {index + 1}. {q.question}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => chooseAnswer(index, option)}
                  className={`p-3 rounded-xl text-left ${
                    answers[index] === option
                      ? "bg-green-500 text-black font-bold"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={submitQuiz}
          className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
        >
          Nộp bài
        </button>

        <button
          onClick={resetQuiz}
          className="bg-slate-700 px-8 py-3 rounded-xl font-bold"
        >
          Làm lại
        </button>
      </div>

      {score !== null && (
        <div className="mt-6 bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">
            Kết quả: {score}/{questions.length}
          </h2>
        </div>
      )}
    </div>
  );
}