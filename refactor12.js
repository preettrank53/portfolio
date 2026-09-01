const fs = require('fs');
const path = require('path');

// 1. IdentityPane.tsx
const idFile = path.resolve('./components/identity/IdentityPane.tsx');
let idCode = fs.readFileSync(idFile, 'utf8');

// Remove PRLogo from header and make it "Preet Rank" without uppercase
const idHeaderOld = `<div className="flex items-center gap-4">
                  <PRLogo className="w-10 h-auto text-zinc-50" />
                  <h1 className="font-sans font-extrabold tracking-tighter uppercase text-zinc-50 whitespace-nowrap text-3xl md:text-3xl">
                    PREET RANK
                  </h1>
                </div>`;
const idHeaderNew = `<h1 className="font-sans font-extrabold tracking-tighter text-zinc-50 whitespace-nowrap text-3xl md:text-3xl">
                  Preet Rank
                </h1>`;
idCode = idCode.replace(idHeaderOld, idHeaderNew);
// Remove PRLogo import if it's there
idCode = idCode.replace(/import \{ PRLogo \} from "@\/components\/identity\/PRLogo";\n?/, '');

fs.writeFileSync(idFile, idCode, 'utf8');

// 2. page.tsx
const pageFile = path.resolve('./app/page.tsx');
let pageCode = fs.readFileSync(pageFile, 'utf8');

// Nav links
pageCode = pageCode.replace(
  /<a href="#experience" className="hover:text-zinc-50 transition-colors">EXPERIENCE<\/a>/,
  '<a href="#experience" className="hover:text-zinc-50 transition-colors">Experience</a>'
);
pageCode = pageCode.replace(
  /<a href="#projects" className="hover:text-zinc-50 transition-colors">PROJECTS<\/a>/,
  '<a href="#projects" className="hover:text-zinc-50 transition-colors">Projects</a>'
);
pageCode = pageCode.replace(
  /<a href="#skills" className="hover:text-zinc-50 transition-colors">SKILLS<\/a>/,
  '<a href="#skills" className="hover:text-zinc-50 transition-colors">Skills</a>'
);
pageCode = pageCode.replace(
  /<a href="\/wall" className="hover:text-zinc-50 transition-colors border border-zinc-800 px-2 py-1 hover:border-zinc-50">WALL<\/a>/,
  '<a href="/wall" className="hover:text-zinc-50 transition-colors border border-zinc-800 px-2 py-1 hover:border-zinc-50">Wall</a>'
);

// Section headers (remove uppercase class and change text)
pageCode = pageCode.replace(
  /<h2 id="experience" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 uppercase sticky top-16 z-40">EXPERIENCE<\/h2>/,
  '<h2 id="experience" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 sticky top-16 z-40">Experience</h2>'
);
pageCode = pageCode.replace(
  /<h2 id="projects" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 uppercase sticky top-16 z-40">PROJECTS<\/h2>/,
  '<h2 id="projects" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 sticky top-16 z-40">Projects</h2>'
);
pageCode = pageCode.replace(
  /<h2 id="skills" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 uppercase sticky top-16 z-40">SKILLS<\/h2>/,
  '<h2 id="skills" className="border-b border-zinc-800 bg-zinc-950 px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 sticky top-16 z-40">Skills</h2>'
);

fs.writeFileSync(pageFile, pageCode, 'utf8');

console.log("Rewrite Step 12 done.");
