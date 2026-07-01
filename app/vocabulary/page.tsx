"use client";

import { useEffect, useState } from "react";
import Flashcard from "../../components/Flashcard";

const words = [
  {
    word: "improve",
    meaning: "cải thiện",
    options: ["cải thiện", "mục tiêu", "thói quen", "tập trung"],
  },
  {
    word: "goal",
    meaning: "mục tiêu",
    options: ["nghe", "mục tiêu", "viết", "đọc"],
  },
  {
    word: "habit",
    meaning: "thói quen",
    options: ["ngữ pháp", "bài đọc", "thói quen", "bài viết"],
  },
  {
    word: "focus",
    meaning: "tập trung",
    options: ["phát âm", "từ vựng", "tập trung", "bài thi"],
  },
];

export default function Vocabulary() {
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const [search, setSearch] = useState("");
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

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

  const currentQuestion = words[quizIndex];

  const chooseAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    if (answer === currentQuestion.meaning) {
      setQuizScore(quizScore + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex + 1 < words.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer("");
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer("");
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">📚 Vocabulary</h1>

      <p className="text-slate-400 mb-8">
        Học từ vựng IELTS bằng flashcard và quiz.
      </p>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode("flashcard")}
          className={`px-6 py-3 rounded-xl font-bold ${
            mode === "flashcard"
              ? "bg-green-500 text-black"
              : "bg-slate-800 text-white"
          }`}
        >
          🎴 Flashcards
        </button>

        <button
          onClick={() => setMode("quiz")}
          className={`px-6 py-3 rounded-xl font-bold ${
            mode === "quiz"
              ? "bg-green-500 text-black"
              : "bg-slate-800 text-white"
          }`}
        >
          🧠 Quiz
        </button>
      </div>

      {mode === "flashcard" && (
        <>
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
        </>
      )}

      {mode === "quiz" && (
        <div className="bg-slate-800 rounded-2xl p-8">
          {!quizFinished ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-slate-400">
                  Câu {quizIndex + 1}/{words.length}
                </p>

                <p className="text-green-400 font-bold">
                  Điểm: {quizScore}
                </p>
              </div>

              <h2 className="text-4xl font-bold text-green-400 mb-6">
                {currentQuestion.word}
              </h2>

              <p className="text-slate-300 mb-6">
                Chọn nghĩa đúng của từ này:
              </p>

              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.meaning;

                  return (
                    <button
                      key={option}
                      onClick={() => chooseAnswer(option)}
                      disabled={selectedAnswer !== ""}
                      className={`p-4 rounded-xl text-left font-bold ${
                        selectedAnswer === ""
                          ? "bg-slate-700 hover:bg-slate-600"
                          : isSelected && isCorrect
                          ? "bg-green-500 text-black"
                          : isSelected && !isCorrect
                          ? "bg-red-500 text-white"
                          : isCorrect
                          ? "bg-green-500 text-black"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <button
                  onClick={nextQuestion}
                  className="mt-8 bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
                >
                  Câu tiếp theo
                </button>
              )}
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-green-400 mb-4">
                Hoàn thành Quiz!
              </h2>

              <p className="text-2xl mb-8">
                Kết quả: {quizScore}/{words.length}
              </p>

              <button
                onClick={restartQuiz}
                className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
              >
                Làm lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}