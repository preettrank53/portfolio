const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports
const newImports = `import { GitHubActivity } from "@/app/GitHubActivity";
import { SignatureWallEntry } from "@/components/SignatureWallEntry";
import { IdentityPane } from "@/components/identity/IdentityPane";`;
code = code.replace(/import \{ IdentityPane \} from "@\/components\/identity\/IdentityPane";/, newImports);

// 2. Add PrListSkeleton
code = code.replace(/SkillsSkeleton, \r?\n\} from "@\/components\/ui\/page-skeletons";/, 'SkillsSkeleton, \n  PrListSkeleton,\n} from "@/components/ui/page-skeletons";');

// 3. Replace IdentityPane usage and add Proof Strip
const proofStrip = `
        <IdentityPane loading={loading} />

        {/* PROOF STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800">
          
          {/* GitHub Activity */}
          <div className="p-6 border-b border-zinc-800 md:border-b-0 md:border-r">
            <GitHubActivity />
          </div>

          {/* Open Source PRs */}
          <div className="p-6">
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
              RECENT OPEN SOURCE PRs
            </span>
            {!prsError && (prsLoading || prs.length > 0) && (
              prsLoading ? (
                <PrListSkeleton />
              ) : (
                <div className="flex flex-col gap-2">
                  {prs.map(pr => {
                    const repoName = pr.repository_url.replace("https://api.github.com/repos/", "").toUpperCase();
                    return (
                      <a
                        key={pr.id}
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-1 py-2 border-b border-zinc-800/50 last:border-0 hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded"
                      >
                        <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider group-hover:text-zinc-50 transition-colors duration-150">
                          {repoName}
                        </div>
                        <div className="text-xs text-zinc-100 font-sans font-medium line-clamp-1 group-hover:text-white transition-colors duration-150">
                          {pr.title}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
`;

// Replace IdentityPane usage
code = code.replace(/<IdentityPane[\s\S]*?viewCountError=\{viewCountError\}\r?\n\s*\/>/, proofStrip);

// 4. Place "See the Wall" and ViewCount at the bottom, just before <ScrollToTop />
const bottomStrip = `
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-800 p-6 md:p-10 gap-4">
        {!viewCountError && viewCount !== null && (
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span>[👁 TOTAL VISITS: {viewCount}]</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <SignatureWallEntry />
        </div>
      </div>
      <ScrollToTop />`;
code = code.replace(/<ScrollToTop \/>/, bottomStrip);

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 5 done.");
