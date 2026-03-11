import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 font-body text-ink max-w-7xl mx-auto selection:bg-ink selection:text-paper">
      {/* Newspaper container */}
      <main className="bg-paper shadow-2xl ring-1 ring-ink/5 p-6 md:p-10 mx-auto relative overflow-hidden">
        {/* Newspaper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        ></div>
        
        <div className="relative z-10">
          <Header />
          
          <div className="grid grid-cols-12 md:gap-8 mt-8">
            <Hero />
            <Sidebar />
          </div>
          
          <Articles />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
