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
  const [time, setTime] = useState(600);

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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold">📖 Reading</h1>
          <p className="text-slate-400 mt-3">
            Luyện đọc IELTS với bài đọc ngắn và câu hỏi.
          </p>
        </div>

        <div className="bg-slate-800 px-6 py-3 rounded-2xl font-bold text-green-400">
          ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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

      <button
        onClick={submitQuiz}
        className="mt-8 bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
      >
        Nộp bài
      </button>

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