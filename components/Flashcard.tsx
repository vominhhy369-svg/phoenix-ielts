"use client";

import { useState } from "react";

type Props = {
  word: string;
  meaning: string;
};

export default function Flashcard({ word, meaning }: Props) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      onClick={() => setFlip(!flip)}
      className="cursor-pointer bg-slate-800 rounded-2xl p-10 flex items-center justify-center h-48 hover:bg-slate-700 transition"
    >
      <h2 className="text-3xl font-bold text-green-400 text-center">
        {flip ? meaning : word}
      </h2>
    </div>
  );
}