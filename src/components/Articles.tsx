import { resumeData } from "../data/resume";
import { Link2 } from "lucide-react";

export default function Articles() {
  const { experience, projects } = resumeData;

  return (
    <div className="grid grid-cols-12 gap-8 border-newspaper border-t pt-8">
      {/* Experience Section */}
      <section className="col-span-12 md:col-span-6 lg:col-span-5 md:pr-8 md:border-r border-newspaper border-b md:border-b-0 pb-8 md:pb-0">
        <h3 className="text-3xl font-black uppercase mb-6 tracking-tight flex items-center">
          <span className="bg-ink text-paper px-3 py-1 mr-3 text-2xl">01</span>
          Career History
        </h3>
        
        <div className="space-y-8">
          {experience.map((job, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xl font-bold uppercase">{job.role}</h4>
                <span className="text-sm font-bold uppercase tracking-wider">{job.date}</span>
              </div>
              <p className="text-sm font-black italic mb-3 text-gray-700 underline decoration-gray-400">
                @ {job.company}
              </p>
              <p className="text-justify font-serif text-lg leading-relaxed group-hover:bg-paper-dark transition-colors px-1 -mx-1 rounded">
                {job.description}
              </p>
              {index !== experience.length - 1 && (
                <div className="flex items-center justify-center my-6">
                  <span className="w-16 border-t border-newspaper border-dashed"></span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="col-span-12 md:col-span-6 lg:col-span-7">
        <h3 className="text-3xl font-black uppercase mb-6 tracking-tight flex items-center">
          <span className="bg-ink text-paper px-3 py-1 mr-3 text-2xl">02</span>
          Featured Projects
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article 
              key={index} 
              className="border border-newspaper p-5 bg-paper-dark/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter line-clamp-2">
                {project.name}
              </h4>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-600 border-b border-newspaper pb-2">
                Tech: {project.tech}
              </p>
              <p className="font-serif text-justify text-base mb-6 h-24 overflow-hidden">
                {project.description}
              </p>
              <a 
                href={project.link} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-black uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
              >
                Read More <Link2 className="w-4 h-4 ml-1" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
