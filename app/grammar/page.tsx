"use client";

import { useEffect, useState } from "react";

const lessons = [
  {
    title: "Present Simple",
    level: "Basic",
    description: "Dùng để nói về thói quen, sự thật hiển nhiên và lịch trình.",
    formula: "Subject + V(s/es) + Object",
    example: "I study English every day.",
  },
  {
    title: "Present Continuous",
    level: "Basic",
    description: "Dùng để nói về hành động đang xảy ra tại thời điểm nói.",
    formula: "Subject + am/is/are + V-ing",
    example: "I am learning IELTS now.",
  },
  {
    title: "Past Simple",
    level: "Basic",
    description: "Dùng để nói về hành động đã xảy ra và kết thúc trong quá khứ.",
    formula: "Subject + V2/ed + Object",
    example: "I watched an English video yesterday.",
  },
  {
    title: "Future with will",
    level: "Basic",
    description: "Dùng để nói về dự đoán hoặc quyết định trong tương lai.",
    formula: "Subject + will + V",
    example: "I will get IELTS 7.0.",
  },
];

const quiz = [
  {
    question: "I ___ English every day.",
    options: ["study", "studying", "studied", "will studying"],
    answer: "study",
  },
  {
    question: "She ___ watching a video now.",
    options: ["is", "are", "am", "be"],
    answer: "is",
  },
  {
    question: "I ___ an English video yesterday.",
    options: ["watch", "watched", "watching", "will watch"],
    answer: "watched",
  },
  {
    question: "I ___ get IELTS 7.0.",
    options: ["am", "was", "will", "did"],
    answer: "will",
  },
];

export default function Grammar() {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("completedGrammarLessons");

    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "completedGrammarLessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  const toggleLesson = (title: string) => {
    if (completedLessons.includes(title)) {
      setCompletedLessons(completedLessons.filter((item) => item !== title));
    } else {
      setCompletedLessons([...completedLessons, title]);
    }
  };

  const chooseAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const submitQuiz = () => {
    let correct = 0;

    quiz.forEach((item, index) => {
      if (answers[index] === item.answer) {
        correct++;
      }
    });

    setScore(correct);
  };

  const resetQuiz = () => {
    setAnswers([]);
    setScore(null);
  };

  const progress = Math.round(
    (completedLessons.length / lessons.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">✍️ Grammar</h1>

      <p className="text-slate-400 mb-8">
        Học ngữ pháp IELTS từ cơ bản đến nâng cao.
      </p>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex justify-between mb-3">
          <p className="font-bold">Tiến độ Grammar</p>
          <p className="text-green-400 font-bold">{progress}%</p>
        </div>

        <div className="w-full h-4 bg-slate-700 rounded-full">
          <div
            className="h-4 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="mt-3 text-slate-400">
          Đã học {completedLessons.length}/{lessons.length} bài.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-4">
          {lessons.map((lesson) => (
            <button
              key={lesson.title}
              onClick={() => setSelectedLesson(lesson)}
              className={`w-full text-left rounded-2xl p-5 transition ${
                selectedLesson.title === lesson.title
                  ? "bg-green-500 text-black"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">{lesson.title}</h2>
                <span className="text-sm font-bold">{lesson.level}</span>
              </div>

              <p className="mt-2 text-sm opacity-80">
                {completedLessons.includes(lesson.title)
                  ? "✅ Đã học"
                  : "⬜ Chưa học"}
              </p>
            </button>
          ))}
        </div>

        <div className="xl:col-span-2">
          <div className="bg-slate-800 rounded-2xl p-8 mb-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-bold text-green-400">
                {selectedLesson.title}
              </h2>

              <span className="bg-green-500 text-black px-4 py-1 rounded-full font-bold">
                {selectedLesson.level}
              </span>
            </div>

            <p className="text-slate-300 leading-8">
              {selectedLesson.description}
            </p>

            <div className="mt-6 bg-slate-900 rounded-xl p-5">
              <p className="text-slate-400 text-sm">Formula:</p>
              <p className="mt-1 text-xl font-bold">
                {selectedLesson.formula}
              </p>
            </div>

            <div className="mt-5 bg-slate-900 rounded-xl p-5">
              <p className="text-slate-400 text-sm">Example:</p>
              <p className="mt-1 italic">{selectedLesson.example}</p>
            </div>

            <button
              onClick={() => toggleLesson(selectedLesson.title)}
              className={`mt-6 w-full py-3 rounded-xl font-bold ${
                completedLessons.includes(selectedLesson.title)
                  ? "bg-green-500 text-black"
                  : "bg-slate-700 text-white"
              }`}
            >
              {completedLessons.includes(selectedLesson.title)
                ? "✅ Đã học"
                : "⬜ Đánh dấu đã học"}
            </button>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-green-400 mb-6">
              🧠 Grammar Quiz
            </h2>

            <div className="space-y-6">
              {quiz.map((item, index) => (
                <div key={item.question} className="bg-slate-900 rounded-xl p-5">
                  <h3 className="font-bold mb-4">
                    {index + 1}. {item.question}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {item.options.map((option) => (
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
              <div className="mt-6 bg-slate-900 rounded-xl p-5">
                <h3 className="text-2xl font-bold text-green-400">
                  Kết quả: {score}/{quiz.length}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}