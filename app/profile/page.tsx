"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("Triết");
  const [targetBand, setTargetBand] = useState("7.0");
  const [deadline, setDeadline] = useState("Cuối tháng 3");
  const [reason, setReason] = useState(
    "Mình muốn cải thiện tiếng Anh và đạt IELTS 6.5–7.0."
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedTargetBand = localStorage.getItem("profileTargetBand");
    const savedDeadline = localStorage.getItem("profileDeadline");
    const savedReason = localStorage.getItem("profileReason");

    if (savedName) setName(savedName);
    if (savedTargetBand) setTargetBand(savedTargetBand);
    if (savedDeadline) setDeadline(savedDeadline);
    if (savedReason) setReason(savedReason);
  }, []);

  const saveProfile = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileTargetBand", targetBand);
    localStorage.setItem("profileDeadline", deadline);
    localStorage.setItem("profileReason", reason);

    setMessage("✅ Profile đã được lưu!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">👤 Profile</h1>

      <p className="text-slate-400 mb-8">
        Lưu thông tin mục tiêu học IELTS của bạn.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-5">
            Thông tin học viên
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-slate-300 font-bold">
                Tên của bạn
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300 font-bold">
                Mục tiêu IELTS
              </label>

              <input
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300 font-bold">
                Deadline
              </label>

              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300 font-bold">
                Lý do học IELTS
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-36 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-green-500"
              />
            </div>

            <button
              onClick={saveProfile}
              className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-green-400 transition"
            >
              Lưu Profile
            </button>

            {message && <p className="text-green-400 font-bold">{message}</p>}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-5">
            Thẻ mục tiêu
          </h2>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <p className="text-slate-400">Học viên</p>
            <h3 className="text-4xl font-bold mt-2">{name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400">Target Band</p>
                <p className="text-3xl font-bold text-green-400 mt-2">
                  IELTS {targetBand}
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400">Deadline</p>
                <p className="text-2xl font-bold mt-2">{deadline}</p>
              </div>
            </div>

            <div className="mt-6 bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 mb-2">Lý do học</p>
              <p className="text-slate-200 leading-7">{reason}</p>
            </div>
          </div>

          <div className="mt-6 bg-green-950 border border-green-500 rounded-2xl p-5">
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🔥 Reminder
            </h3>

            <p className="text-slate-300 leading-7">
              Mỗi ngày chỉ cần học một ít, nhưng học đều. Phoenix IELTS sẽ lưu
              lại tiến độ để bạn thấy mình đang tiến bộ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}