"use client";

import { useEffect, useState } from "react";

const readingQuestions = [
  {
    question: "What is the main idea of the passage?",
    options: [
      "Online learning is always bad.",
      "Online learning has both advantages and disadvantages.",
      "Students should never study online.",
      "Teachers do not like online learning.",
    ],
    answer: "Online learning has both advantages and disadvantages.",
  },
  {
    question: "Why do some students like online learning?",
    options: [
      "Because it is flexible.",
      "Because it has no homework.",
      "Because it is always easy.",
      "Because teachers are not needed.",
    ],
    answer: "Because it is flexible.",
  },
  {
    question: "What problem can online learning cause?",
    options: [
      "It can make students travel more.",
      "It can reduce students' concentration.",
      "It can remove all exams.",
      "It can make schools disappear.",
    ],
    answer: "It can reduce students' concentration.",
  },
];

const listeningQuestions = [
  {
    question: "Where does the speaker want to go?",
    options: ["Library", "Museum", "Train station", "Bookstore"],
    answer: "Library",
  },
  {
    question: "What time does the place close?",
    options: ["4 p.m.", "5 p.m.", "6 p.m.", "7 p.m."],
    answer: "6 p.m.",
  },
  {
    question: "What does the speaker need?",
    options: ["A map", "A ticket", "A student card", "A notebook"],
    answer: "A student card",
  },
];

export default function MockTest() {
  const [readingAnswers, setReadingAnswers] = useState<string[]>([]);
  const [listeningAnswers, setListeningAnswers] = useState<string[]>([]);
  const [writingAnswer, setWritingAnswer] = useState("");
  const [speakingAnswer, setSpeakingAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [lastScore, setLastScore] = useState("Chưa có");
  const [bestScore, setBestScore] = useState("Chưa có");
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    const savedLast = localStorage.getItem("mockTestLastScore");
    const savedBest = localStorage.getItem("mockTestBestScore");
    const savedCount = localStorage.getItem("mockTestCount");

    if (savedLast) setLastScore(`${savedLast}/6`);
    if (savedBest) setBestScore(`${savedBest}/6`);
    if (savedCount) setTestCount(Number(savedCount));
  }, []);

  const playListening = () => {
    const text =
      "Hello. I would like to go to the library. I need to borrow some books for my English class. Could you tell me what time the library closes today? I heard it closes at six p.m. Also, do I need to bring my student card? Thank you.";

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.85;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const stopListening = () => {
    window.speechSynthesis.cancel();
  };

  const chooseReadingAnswer = (index: number, answer: string) => {
    const newAnswers = [...readingAnswers];
    newAnswers[index] = answer;
    setReadingAnswers(newAnswers);
  };

  const chooseListeningAnswer = (index: number, answer: string) => {
    const newAnswers = [...listeningAnswers];
    newAnswers[index] = answer;
    setListeningAnswers(newAnswers);
  };

  const readingScore = readingQuestions.filter(
    (item, index) => readingAnswers[index] === item.answer
  ).length;

  const listeningScore = listeningQuestions.filter(
    (item, index) => listeningAnswers[index] === item.answer
  ).length;

  const totalScore = readingScore + listeningScore;

  const submitTest = () => {
    setSubmitted(true);

    localStorage.setItem("mockTestLastScore", String(totalScore));

    const oldBest = Number(localStorage.getItem("mockTestBestScore") || "0");

    if (totalScore > oldBest) {
      localStorage.setItem("mockTestBestScore", String(totalScore));
      setBestScore(`${totalScore}/6`);
    }

    const newCount = Number(localStorage.getItem("mockTestCount") || "0") + 1;
    localStorage.setItem("mockTestCount", String(newCount));

    setLastScore(`${totalScore}/6`);
    setTestCount(newCount);

    if (writingAnswer.trim().length > 0) {
      localStorage.setItem("mockTestWriting", writingAnswer);
    }

    if (speakingAnswer.trim().length > 0) {
      localStorage.setItem("mockTestSpeaking", speakingAnswer);
    }
  };

  const resetTest = () => {
    setReadingAnswers([]);
    setListeningAnswers([]);
    setWritingAnswer("");
    setSpeakingAnswer("");
    setSubmitted(false);
    window.speechSynthesis.cancel();
  };

  const writingWordCount = writingAnswer
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        🧪 Mock Test
      </h1>

      <p className="text-slate-400 mb-8">
        Làm bài test IELTS mini để kiểm tra Reading, Listening, Writing và Speaking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Lần gần nhất</h2>
          <p className="mt-3 text-4xl font-bold">{lastScore}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Điểm cao nhất</h2>
          <p className="mt-3 text-4xl font-bold">{bestScore}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">Số lần làm</h2>
          <p className="mt-3 text-4xl font-bold">{testCount}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          📖 Reading Section
        </h2>

        <p className="text-slate-300 leading-8 mb-6">
          Online learning has become more popular in recent years. Many students
          enjoy it because it is flexible and allows them to study from home.
          However, online learning can also make it harder for students to
          concentrate. Some students may feel lonely or distracted when they do
          not study in a classroom. Therefore, online learning can be useful,
          but students still need discipline and support.
        </p>

        <div className="space-y-6">
          {readingQuestions.map((item, index) => (
            <div key={item.question} className="bg-slate-900 rounded-2xl p-5">
              <h3 className="text-xl font-bold mb-4">
                {index + 1}. {item.question}
              </h3>

              <div className="space-y-3">
                {item.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => chooseReadingAnswer(index, option)}
                    className={`w-full text-left rounded-xl p-3 font-bold transition ${
                      readingAnswers[index] === option
                        ? "bg-green-500 text-black"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {submitted && (
                <p className="mt-3 font-bold">
                  {readingAnswers[index] === item.answer
                    ? "✅ Đúng"
                    : `❌ Sai. Đáp án đúng: ${item.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🎧 Listening Section
        </h2>

        <p className="text-slate-400 mb-5">
          Bấm Play để nghe đoạn audio bằng giọng đọc máy.
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={playListening}
            className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            ▶ Play
          </button>

          <button
            onClick={stopListening}
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
          >
            Stop
          </button>
        </div>

        <div className="space-y-6">
          {listeningQuestions.map((item, index) => (
            <div key={item.question} className="bg-slate-900 rounded-2xl p-5">
              <h3 className="text-xl font-bold mb-4">
                {index + 1}. {item.question}
              </h3>

              <div className="space-y-3">
                {item.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => chooseListeningAnswer(index, option)}
                    className={`w-full text-left rounded-xl p-3 font-bold transition ${
                      listeningAnswers[index] === option
                        ? "bg-green-500 text-black"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {submitted && (
                <p className="mt-3 font-bold">
                  {listeningAnswers[index] === item.answer
                    ? "✅ Đúng"
                    : `❌ Sai. Đáp án đúng: ${item.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          📝 Writing Section
        </h2>

        <p className="text-slate-300 leading-8 mb-5">
          Some people think technology makes students learn better. Others think
          it can distract them. Discuss both views and give your opinion.
        </p>

        <p className="text-slate-400 mb-3">
          Số từ hiện tại:{" "}
          <span className="font-bold text-green-400">{writingWordCount}</span>
        </p>

        <textarea
          value={writingAnswer}
          onChange={(e) => setWritingAnswer(e.target.value)}
          placeholder="Viết bài Writing của bạn ở đây..."
          className="w-full h-64 bg-slate-900 border border-slate-700 rounded-2xl p-5 outline-none resize-none focus:border-green-500"
        />
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🎤 Speaking Section
        </h2>

        <p className="text-slate-300 leading-8 mb-5">
          Describe a subject you enjoy studying. You should say what it is, why
          you enjoy it, how often you study it, and explain why it is useful for
          you.
        </p>

        <textarea
          value={speakingAnswer}
          onChange={(e) => setSpeakingAnswer(e.target.value)}
          placeholder="Ghi ý tưởng Speaking của bạn ở đây..."
          className="w-full h-48 bg-slate-900 border border-slate-700 rounded-2xl p-5 outline-none resize-none focus:border-green-500"
        />
      </div>

      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🏁 Kết quả
        </h2>

        {submitted ? (
          <div>
            <p className="text-4xl font-bold mb-3">
              {totalScore}/6 điểm
            </p>

            <p className="text-slate-300">
              Reading: {readingScore}/3 | Listening: {listeningScore}/3
            </p>
          </div>
        ) : (
          <p className="text-slate-400">
            Làm xong Reading và Listening rồi bấm nộp bài.
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={submitTest}
            className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold"
          >
            Nộp bài
          </button>

          <button
            onClick={resetTest}
            className="bg-slate-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            Làm lại
          </button>
        </div>
      </div>
    </div>
  );
}