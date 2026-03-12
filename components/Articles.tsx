import { resumeData } from "@/data/resume";
import { Link2, Github } from "lucide-react";

export default function Articles() {
  const { projects } = resumeData;

  // Split projects into two categories based on role
  const workProjects = projects.filter(p => !p.role?.includes("开源"));
  const openSourceProjects = projects.filter(p => p.role?.includes("开源"));

  return (
    <div className="border-newspaper border-t pt-8 mt-8">
      
      {/* Work Projects Section */}
      <section className="mb-12">
        <h3 className="text-3xl font-black uppercase mb-6 tracking-tight flex items-center">
          <span className="bg-ink text-paper px-3 py-1 mr-3 text-2xl">03</span>
          项目经历
        </h3>
        
        <div className="space-y-10">
          {workProjects.map((project, index) => (
            <article 
              key={`work-${index}`} 
              className="border border-newspaper p-6 md:p-8 bg-paper-dark/10 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h4 className="text-2xl font-black uppercase tracking-tighter">
                  {project.name}
                </h4>
                {project.role && (
                  <p className="text-sm font-bold italic text-gray-800 mt-2 md:mt-0">
                    {project.role}
                  </p>
                )}
              </div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-600 border-b border-newspaper pb-3">
                Tech: {project.tech}
              </p>
              <div className="font-serif text-justify text-[15px] mb-6 space-y-3 leading-relaxed">
                {Array.isArray(project.description)
                  ? project.description.map((desc, i) => <p key={i}>{desc}</p>)
                  : <p>{project.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Open Source Section */}
      <section>
        <h3 className="text-3xl font-black uppercase mb-6 tracking-tight flex items-center">
          <span className="bg-ink text-paper px-3 py-1 mr-3 text-2xl">04</span>
          开源项目
        </h3>
        
        <div className="space-y-10">
          {openSourceProjects.map((project, index) => (
            <article 
              key={`os-${index}`} 
              className="border border-newspaper p-6 md:p-8 bg-paper-dark/10 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h4 className="text-2xl font-black uppercase tracking-tighter">
                  {project.name}
                </h4>
                {project.role && (
                  <p className="text-sm font-bold italic text-gray-800 mt-2 md:mt-0">
                    {project.role}
                  </p>
                )}
              </div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-600 border-b border-newspaper pb-3">
                Tech: {project.tech}
              </p>
              <div className="font-serif text-justify text-[15px] mb-6 space-y-3 leading-relaxed">
                {Array.isArray(project.description)
                  ? project.description.map((desc, i) => <p key={i}>{desc}</p>)
                  : <p>{project.description}</p>}
              </div>
              <div className="flex flex-wrap gap-4 mt-auto">
                {project.link && project.link !== "#" && (
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-black uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
                  >
                    查看插件 <Link2 className="w-4 h-4 ml-1" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github} 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-black uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
                  >
                    源码仓库 <Github className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
