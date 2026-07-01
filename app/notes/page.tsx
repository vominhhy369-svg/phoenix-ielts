"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

const categories = ["Vocabulary", "Grammar", "Writing", "Speaking", "Other"];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Vocabulary");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("ieltsNotes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("ieltsNotes", JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("Bạn cần nhập tiêu đề và nội dung ghi chú.");
      return;
    }

    const newNote: Note = {
      id: String(Date.now()),
      title,
      content,
      category,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    saveNotes([newNote, ...notes]);

    setTitle("");
    setContent("");
    setCategory("Vocabulary");
  };

  const deleteNote = (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa ghi chú này không?"
    );

    if (!confirmDelete) return;

    const newNotes = notes.filter((note) => note.id !== id);
    saveNotes(newNotes);
  };

  const filteredNotes = notes.filter((note) => {
    const keyword = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword) ||
      note.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">📒 Notes</h1>

      <p className="text-slate-400 mb-8">
        Sổ tay cá nhân để lưu ghi chú Vocabulary, Grammar, Writing và Speaking.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6 xl:col-span-1">
          <h2 className="text-2xl font-bold text-green-400 mb-5">
            Thêm ghi chú mới
          </h2>

          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề ghi chú..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nội dung ghi chú..."
              className="w-full h-48 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500"
            />

            <button
              onClick={addNote}
              className="w-full bg-green-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition"
            >
              Lưu ghi chú
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 xl:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-green-400">
                Ghi chú đã lưu
              </h2>

              <p className="text-slate-400 mt-1">
                Tổng cộng: {notes.length} ghi chú
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm ghi chú..."
              className="w-full md:w-72 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {filteredNotes.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-6 text-slate-400">
              Chưa có ghi chú nào hoặc không tìm thấy kết quả.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className="bg-slate-900 rounded-2xl p-5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-green-400 font-bold">
                        {note.category} • {note.createdAt}
                      </p>

                      <h3 className="text-2xl font-bold mt-2">{note.title}</h3>
                    </div>

                    <button
                      onClick={() => deleteNote(note.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-400 transition"
                    >
                      Xóa
                    </button>
                  </div>

                  <p className="mt-4 text-slate-300 leading-8 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-950 border border-green-500 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-3">
          💡 Gợi ý dùng Notes
        </h2>

        <p className="text-slate-300 leading-8">
          Bạn có thể lưu collocations, lỗi grammar hay sai, ideas cho Writing
          Task 2, hoặc câu trả lời Speaking hay. Những ghi chú này sẽ được lưu
          trong trình duyệt bằng localStorage.
        </p>
      </div>
    </div>
  );
}