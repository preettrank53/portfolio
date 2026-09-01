const fs = require('fs');
const path = require('path');

// 1. Update page.tsx
const pageFile = path.resolve('./app/page.tsx');
let pageCode = fs.readFileSync(pageFile, 'utf8');

// Header
pageCode = pageCode.replace(
  /className="sticky top-0 z-50 bg-zinc-950\/80 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center"/,
  'className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-6 flex justify-between items-center h-16"'
);

// Section Headers
pageCode = pageCode.replace(
  /px-6 py-3 text-sm font-mono text-zinc-50 uppercase sticky top-\[73px\] z-40/g,
  'px-4 md:px-6 py-3 text-sm font-mono text-zinc-50 uppercase sticky top-16 z-40'
);

fs.writeFileSync(pageFile, pageCode, 'utf8');


// 2. Update ExperienceCard.tsx
const expFile = path.resolve('./components/feed/ExperienceCard.tsx');
let expCode = fs.readFileSync(expFile, 'utf8');

// Padding
expCode = expCode.replace(
  /className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-zinc-800 hover:bg-zinc-900\/20 transition-colors group relative overflow-hidden rounded-none"/,
  'className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-zinc-800 hover:bg-zinc-900/20 transition-colors group relative overflow-hidden rounded-none"'
);

// Date & Duration
const expDateOld = `<span className="text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1 block">
          {post.date}{post.duration ? \` · \${post.duration}\` : ""}
        </span>`;
const expDateNew = `<div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">
            {post.date}
          </span>
          {post.duration && (
            <span className="text-xs text-zinc-600 font-mono uppercase tracking-wider block">
              {post.duration}
            </span>
          )}
        </div>`;
expCode = expCode.replace(expDateOld, expDateNew);

fs.writeFileSync(expFile, expCode, 'utf8');


// 3. Update ProjectCard.tsx
const projFile = path.resolve('./components/feed/ProjectCard.tsx');
let projCode = fs.readFileSync(projFile, 'utf8');

// Padding
projCode = projCode.replace(
  /className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-zinc-800 hover:bg-zinc-900\/20 transition-colors group relative overflow-hidden rounded-none"/,
  'className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-zinc-800 hover:bg-zinc-900/20 transition-colors group relative overflow-hidden rounded-none"'
);

fs.writeFileSync(projFile, projCode, 'utf8');


// 4. Update StackSection.tsx
const stackFile = path.resolve('./components/feed/StackSection.tsx');
let stackCode = fs.readFileSync(stackFile, 'utf8');

// Padding & items-center
stackCode = stackCode.replace(
  /className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-zinc-800 hover:bg-zinc-900\/20 transition-colors group relative rounded-none"/,
  'className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b border-zinc-800 hover:bg-zinc-900/20 transition-colors group relative rounded-none items-center"'
);

// Ensure items-center on right column flex wrap
stackCode = stackCode.replace(
  /<div className="flex flex-wrap gap-2">/,
  '<div className="flex flex-wrap items-center gap-3">'
);

fs.writeFileSync(stackFile, stackCode, 'utf8');


// 5. Update Proof Strip in page.tsx to also use px-4 md:px-6 instead of just p-6
pageCode = fs.readFileSync(pageFile, 'utf8');
pageCode = pageCode.replace(
  /<div className="p-6 border-b border-zinc-800 md:border-b-0 md:border-r">/,
  '<div className="px-4 md:px-6 py-6 border-b border-zinc-800 md:border-b-0 md:border-r">'
);
pageCode = pageCode.replace(
  /<div className="p-6">/,
  '<div className="px-4 md:px-6 py-6">'
);
fs.writeFileSync(pageFile, pageCode, 'utf8');

console.log("Rewrite Step 9 done.");
