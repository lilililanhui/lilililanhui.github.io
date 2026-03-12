import { resumeData } from "@/data/resume";

export default function Footer() {
  const { header } = resumeData;

  return (
    <footer className="mt-16 border-t-4 border-ink pt-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
            {header.title}
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-600">
            Subscribe for daily code updates
          </p>
        </div>

        <div className="text-center md:text-right text-xs font-bold uppercase tracking-widest text-gray-500">
          <p>&copy; {new Date().getFullYear()} {header.title}. ALL RIGHTS RESERVED.</p>
          <p className="mt-1">PRINTED IN NEXT.JS. STYLED WITH TAILWIND CSS.</p>
        </div>
      </div>
    </footer>
  );
}
