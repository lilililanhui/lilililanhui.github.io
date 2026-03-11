import { resumeData } from "../data/resume";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const { contact } = resumeData;

  return (
    <footer className="mt-16 border-t-4 border-ink pt-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
            The Daily Developer
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-600">
            Subscribe for daily code updates
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href={`mailto:${contact.email}`}
            className="p-3 border-2 border-transparent hover:border-ink rounded-full transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href={`https://${contact.github}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 border-2 border-transparent hover:border-ink rounded-full transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 border-2 border-transparent hover:border-ink rounded-full transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`https://${contact.twitter}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 border-2 border-transparent hover:border-ink rounded-full transition-all duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
        <p>&copy; {new Date().getFullYear()} The Daily Developer. All rights reserved.</p>
        <p className="mt-1">Printed in React. Styled with Tailwind CSS.</p>
      </div>
    </footer>
  );
}
