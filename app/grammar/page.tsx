const lessons = [
  {
    title: "Present Simple",
    level: "Basic",
    description: "Dùng để nói về thói quen, sự thật hiển nhiên và lịch trình.",
    example: "I study English every day.",
  },
  {
    title: "Present Continuous",
    level: "Basic",
    description: "Dùng để nói về hành động đang xảy ra tại thời điểm nói.",
    example: "I am learning IELTS now.",
  },
  {
    title: "Past Simple",
    level: "Basic",
    description: "Dùng để nói về hành động đã xảy ra và kết thúc trong quá khứ.",
    example: "I watched an English video yesterday.",
  },
  {
    title: "Future with will",
    level: "Basic",
    description: "Dùng để nói về dự đoán hoặc quyết định trong tương lai.",
    example: "I will get IELTS 7.0.",
  },
];

export default function Grammar() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-3">✍️ Grammar</h1>

      <p className="text-slate-400 mb-10">
        Học ngữ pháp IELTS từ cơ bản đến nâng cao.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-400">
                {lesson.title}
              </h2>

              <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                {lesson.level}
              </span>
            </div>

            <p className="mt-4 text-slate-300">
              {lesson.description}
            </p>

            <div className="mt-5 bg-slate-900 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Example:</p>
              <p className="mt-1 italic">{lesson.example}</p>
            </div>

            <button className="mt-5 w-full bg-green-500 text-black py-2 rounded-xl font-bold">
              Bắt đầu học
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}