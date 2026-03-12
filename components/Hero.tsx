import { resumeData } from "@/data/resume";

export default function Hero() {
  const { skills, hero, experience } = resumeData;

  return (
    <section className="mb-10 col-span-12 lg:col-span-8 border-b md:border-b-0 md:border-r border-newspaper border-opacity-90 pb-8 md:pb-0 md:pr-8">
      {/* Hero Headline Section */}
      <div className="mb-8 border-b-2 border-newspaper pb-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none mb-4 tracking-tight">
          {hero.headline}
        </h2>
        <h3 className="text-xl md:text-2xl font-serif italic text-gray-800">
          {hero.subheadline}
        </h3>
      </div>

      {/* Experience Section (Moved up) */}
      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase mb-6 tracking-tight flex items-center border-b border-newspaper pb-2">
          <span className="bg-ink text-paper px-2 py-0.5 mr-3 text-xl">01</span>
          工作经历
        </h3>
        
        <div className="space-y-8">
          {experience.map((job, index) => (
            <article key={index} className="group">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xl font-bold uppercase">{job.role}</h4>
                <span className="text-sm font-bold uppercase tracking-wider">{job.date}</span>
              </div>
              <p className="text-sm font-black italic mb-3 text-gray-700 underline decoration-gray-400">
                @ {job.company}
              </p>
              <div className="space-y-3 font-serif text-[15px] leading-relaxed group-hover:bg-paper-dark transition-colors px-1 -mx-1 rounded">
                {Array.isArray(job.description)
                  ? job.description.map((desc, i) => <p key={i} className="text-justify">{desc}</p>)
                  : <p className="text-justify">{job.description}</p>}
              </div>
              {index !== experience.length - 1 && (
                <div className="flex items-center justify-center my-6">
                  <span className="w-16 border-t border-newspaper border-dashed"></span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-2xl font-black uppercase mb-6 tracking-tight flex items-center border-b border-newspaper pb-2">
          <span className="bg-ink text-paper px-2 py-0.5 mr-3 text-xl">02</span>
          专业技能
        </h3>
        <div className="space-y-5">
          {skills.map((skill, i) => (
            <div key={i} className="mb-2">
              <h4 className="text-[15px] font-bold uppercase underline decoration-2 underline-offset-4 mb-2">
                {skill.category}
              </h4>
              <p className="font-serif text-justify text-[14px] leading-relaxed">
                {skill.items}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
