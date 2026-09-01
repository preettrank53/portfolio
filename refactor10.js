const fs = require('fs');
const path = require('path');

// 1. Update IdentityPane.tsx
const idFile = path.resolve('./components/identity/IdentityPane.tsx');
let idCode = fs.readFileSync(idFile, 'utf8');

// The Resume Callout
const resumeOld = `<a
                  href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 bg-transparent border border-zinc-700 text-zinc-50 font-sans font-bold text-xs uppercase tracking-[0.15em] hover:bg-zinc-900 transition-colors duration-200 flex items-center justify-center"
                >
                  VIEW RESUME
                </a>`;

const resumeNew = `<div className="relative w-full">
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end pointer-events-none opacity-70 rotate-[-4deg]">
                  <span className="font-handwritten text-lg text-zinc-400">takes 30 seconds</span>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 mt-1 mr-2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <a
                  href="https://drive.google.com/file/d/1zUTtekkFg1UgHhO_-4BFfWzjUHMoBPH9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 bg-transparent border border-zinc-700 text-zinc-50 font-sans font-bold text-xs uppercase tracking-[0.15em] hover:bg-zinc-900 transition-colors duration-200 flex items-center justify-center"
                >
                  VIEW RESUME
                </a>
              </div>`;
idCode = idCode.replace(resumeOld, resumeNew);

// Social Connect Label
const socialOld = `<div className="flex justify-between w-full max-w-xs">`;
const socialNew = `<span className="hidden md:block font-handwritten text-zinc-500 text-sm mb-2 opacity-60">connect</span>
                <div className="flex justify-between w-full max-w-xs">`;
idCode = idCode.replace(socialOld, socialNew);

fs.writeFileSync(idFile, idCode, 'utf8');


// 2. Update SignatureWallEntry.tsx
const sigFile = path.resolve('./components/SignatureWallEntry.tsx');
let sigCode = fs.readFileSync(sigFile, 'utf8');

const sigOld = `<a
        href="/wall"
        onClick={handleClick}
        className="border border-zinc-50 text-zinc-50 px-8 py-3 hover:bg-zinc-50 hover:text-zinc-950 transition-colors uppercase tracking-widest text-sm font-bold relative overflow-hidden"
      >
        <span className={\`\${isPending ? "opacity-0" : "opacity-100"} transition-opacity duration-300\`}>
          SEE THE WALL
        </span>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-pulse">LOADING...</span>
          </div>
        )}
      </a>`;

const sigNew = `<div className="relative">
        <div className="absolute -top-12 -right-12 hidden md:flex flex-col items-start pointer-events-none opacity-70 rotate-[6deg]">
          <span className="font-handwritten text-xl text-zinc-400">add yours</span>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 ml-2 mt-1">
            <path d="M19 5l-7 7-7-7"/>
          </svg>
        </div>
        <a
          href="/wall"
          onClick={handleClick}
          className="block border border-zinc-50 text-zinc-50 px-8 py-3 hover:bg-zinc-50 hover:text-zinc-950 transition-colors uppercase tracking-widest text-sm font-bold relative overflow-hidden"
        >
          <span className={\`\${isPending ? "opacity-0" : "opacity-100"} transition-opacity duration-300\`}>
            SEE THE WALL
          </span>
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="animate-pulse">LOADING...</span>
            </div>
          )}
        </a>
      </div>`;

sigCode = sigCode.replace(sigOld, sigNew);

fs.writeFileSync(sigFile, sigCode, 'utf8');

console.log("Rewrite Step 10 done.");
