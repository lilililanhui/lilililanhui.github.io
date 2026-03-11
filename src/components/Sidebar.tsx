import { resumeData } from "../data/resume";

export default function Sidebar() {
  const { skills } = resumeData;

  return (
    <aside className="col-span-12 lg:col-span-4 lg:pl-8 mt-10 lg:mt-0">
      <div className="border border-newspaper border-opacity-90 p-6 bg-paper-dark/30 shadow-sm relative">
        <h3 className="text-3xl font-black uppercase mb-4 text-center border-b border-newspaper pb-2">
          Classifieds: Skills
        </h3>
        
        <div className="space-y-6">
          {skills.map((skill, i) => (
            <div key={i} className="mb-4">
              <h4 className="text-lg font-bold uppercase underline decoration-2 underline-offset-4 mb-2">
                Wanted: {skill.category}
              </h4>
              <p className="font-serif text-justify italic">
                Looking for expertise in: <span className="font-bold">{skill.items}</span>. 
                Must have a keen eye for detail.
              </p>
            </div>
          ))}
        </div>
        
        {/* decorative element */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-newspaper border-dashed pointer-events-none opacity-40"></div>
      </div>
    </aside>
  );
}
