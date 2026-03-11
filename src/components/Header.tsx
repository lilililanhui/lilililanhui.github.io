import { resumeData } from "../data/resume";

export default function Header() {
  const { header } = resumeData;
  const today = new Date().toLocaleDateString("zh-CN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      {/* Top bar with meta info */}
      <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest border-newspaper border-b pb-1 mb-2">
        <span>{header.location}</span>
        <span>{header.edition}</span>
        <span>{header.price}</span>
      </div>

      {/* Main Title */}
      <div className="text-center py-4 px-2">
        <h1
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {header.title}
        </h1>
        <p className="text-sm md:text-lg font-bold tracking-widest mt-2 uppercase">
          {header.subtitle}
        </p>
      </div>

      {/* Bottom bar with date */}
      <div className="flex justify-between items-center text-xs md:text-sm font-bold uppercase tracking-widest border-double-newspaper mt-2 mb-6">
        <span>The Daily Edition</span>
        <span>{today}</span>
        <span>Weather: Sunny & Code</span>
      </div>
    </header>
  );
}
