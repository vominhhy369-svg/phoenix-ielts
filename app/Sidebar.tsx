"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/", icon: "🏠" },
  { name: "Profile", href: "/profile", icon: "👤" },
  { name: "Vocabulary", href: "/vocabulary", icon: "📚" },
  { name: "Grammar", href: "/grammar", icon: "✍️" },
  { name: "Reading", href: "/reading", icon: "📖" },
  { name: "Listening", href: "/listening", icon: "🎧" },
  { name: "Speaking", href: "/speaking", icon: "🎤" },
  { name: "Writing", href: "/writing", icon: "📝" },
  { name: "Planner", href: "/planner", icon: "📅" },
  { name: "Achievements", href: "/achievements", icon: "🏆" },
  { name: "Statistics", href: "/statistics", icon: "📊" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-800 bg-slate-900 text-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="p-4 md:p-6">
        <div className="mb-4 md:mb-10">
          <h1 className="text-2xl font-bold md:text-3xl">🎓 Phoenix</h1>

          <p className="mt-1 text-xs text-slate-400 md:text-sm">
            IELTS MASTER 7.0
          </p>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-3 md:overflow-visible md:pb-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition md:text-base ${
                  isActive
                    ? "bg-green-500 text-black"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 hidden rounded-2xl bg-slate-800 p-4 md:block">
          <p className="text-sm text-slate-400">Goal</p>

          <p className="mt-1 text-2xl font-bold text-green-400">
            IELTS 7.0
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Deadline: cuối tháng 3
          </p>
        </div>
      </div>
    </aside>
  );
}