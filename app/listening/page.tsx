"use client";

import { useEffect, useState } from "react";

const transcript =
  "Welcome to this English course. To improve your listening skill, you should practice every day. Listening carefully can help you understand English speakers better.";

const questions = [
  {
    question: "What is the speaker talking about?",
    options: ["A school", "An English course", "A restaurant", "A sport club"],
    answer: "An English course",
  },
  {
    question: "How often should students practice?",
    options: ["Every day", "Once a month", "Never", "Only on Sunday"],
    answer: "Every day",
  },
  {
    question: "What skill is mentioned?",
    options: ["Cooking", "Listening", "Driving", "Drawing"],
    answer: "Listening",
  },
];

export default function Listening() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const savedLastScore = localStorage.getItem("listeningLastScore");
    const savedBestScore = localStorage.getItem("listeningBestScore");

    if (savedLastScore) {
      setLastScore(Number(savedLastScore));
    }

    if (savedBestScore) {
      setBestScore(Number(savedBestScore));
    }
  }, []);

  const playAudio = () => {
    const speech = new SpeechSynthesisUtterance(transcript);
    speech.lang = "en-US";
    speech.rate = 0.85;
    window.speechSynthesis.speak(speech);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
  };

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
    localStorage.setItem("listeningLastScore", String(correct));

    if (bestScore === null || correct > bestScore) {
      setBestScore(correct);
      localStorage.setItem("listeningBestScore", String(correct));
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setScore(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">🎧 Listening</h1>

      <p className="text-slate-400 mb-8">
        Luyện nghe IELTS với transcript, phát âm tự động và lưu điểm.
      </p>

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

      <div className="bg-slate-800 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Listening Practice 1
        </h2>

        <p className="text-slate-300 mb-5">
          Bấm Play để nghe đoạn tiếng Anh. Nghe xong hãy trả lời câu hỏi bên dưới.
        </p>

        <div className="flex gap-4">
          <button
            onClick={playAudio}
            className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            ▶ Play
          </button>

          <button
            onClick={stopAudio}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
          >
            ■ Stop
          </button>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="bg-slate-700 px-6 py-3 rounded-xl font-bold"
          >
            {showTranscript ? "Ẩn Transcript" : "Hiện Transcript"}
          </button>
        </div>

        {showTranscript && (
          <div className="mt-6 bg-slate-900 rounded-xl p-5 text-slate-300 leading-8">
            {transcript}
          </div>
        )}
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