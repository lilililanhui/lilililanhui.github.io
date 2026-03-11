import { resumeData } from "../data/resume";

export default function Hero() {
  const { hero } = resumeData;

  return (
    <section className="mb-10 col-span-12 lg:col-span-8 border-b md:border-b-0 md:border-r border-newspaper border-opacity-90 pb-8 md:pb-0 md:pr-8">
      <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4 tracking-tight">
        {hero.headline}
      </h2>
      <h3 className="text-xl md:text-2xl font-serif italic mb-6 text-gray-800">
        {hero.subheadline}
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p className="font-bold text-sm uppercase mb-3">{hero.author}</p>
          <p className="text-justify columns-1 md:columns-2 gap-8 text-lg font-serif first-letter:text-7xl first-letter:float-left first-letter:pr-2 first-letter:font-black first-letter:leading-none">
            {hero.content}
            <span className="block mt-4">
              With a relentless drive for excellence, this individual constantly 
              explores new tools, reads documentation like it's a gripping novel, 
              and ensures that every line of code adds tangible value to the 
              product.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
