"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/", icon: "🏠" },
  { name: "Vocabulary", href: "/vocabulary", icon: "📚" },
  { name: "Grammar", href: "/grammar", icon: "✍️" },
  { name: "Reading", href: "/reading", icon: "📖" },
  { name: "Listening", href: "/listening", icon: "🎧" },
  { name: "Speaking", href: "/speaking", icon: "🎤" },
  { name: "Writing", href: "/writing", icon: "📝" },
  { name: "Planner", href: "/planner", icon: "📅" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 border-r border-slate-800">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">🎓 Phoenix</h1>
        <p className="text-slate-400 mt-2 text-sm">
          IELTS MASTER 7.0
        </p>
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-xl font-bold transition ${
                isActive
                  ? "bg-green-500 text-black"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 bg-slate-800 rounded-2xl p-4">
        <p className="text-sm text-slate-400">Goal</p>
        <p className="text-2xl font-bold text-green-400 mt-1">
          IELTS 7.0
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Deadline: cuối tháng 3
        </p>
      </div>
    </aside>
  );
}