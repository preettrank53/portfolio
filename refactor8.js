const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

const oldFooter = `<div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-800 p-6 md:p-10 gap-4">
        {!viewCountError && viewCount !== null && (
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span>[👁 TOTAL VISITS: {viewCount}]</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <SignatureWallEntry />
        </div>
      </div>`;

const newFooter = `<SignatureWallEntry />
      
      {/* Engineer's Metadata Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
        <div className="border-r border-zinc-800 border-b md:border-b-0 p-6 flex flex-col gap-2">
          <span className="text-zinc-600 uppercase">CRAFTED BY</span>
          <span className="text-zinc-300">@PREETTRANK</span>
        </div>
        <div className="border-zinc-800 md:border-r border-b md:border-b-0 p-6 flex flex-col gap-2">
          <span className="text-zinc-600 uppercase">BUILT WITH</span>
          <span className="text-zinc-300">Next.js 14, Tailwind, Upstash</span>
        </div>
        <div className="border-r border-zinc-800 p-6 flex flex-col gap-2">
          <span className="text-zinc-600 uppercase">LICENSE</span>
          <a href="https://github.com/preettrank53" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-50 transition-colors">
            MIT License
          </a>
        </div>
        <div className="p-6 flex flex-col gap-2">
          <span className="text-zinc-600 uppercase">METRICS</span>
          <span className="text-zinc-300">
            {!viewCountError && viewCount !== null ? \`\${viewCount} Total Visits\` : "Loading..."}
          </span>
        </div>
      </div>

      {/* The Bottom Cap */}
      <div className="p-4 text-center text-zinc-700 text-xs font-mono">
        © {new Date().getFullYear()} Preet Rank. All systems operational.
      </div>`;

// Replace it exactly
code = code.replace(oldFooter, newFooter);

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 8 done.");
