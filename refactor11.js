const fs = require('fs');
const path = require('path');

// 1. page.tsx
const pageFile = path.resolve('./app/page.tsx');
let pageCode = fs.readFileSync(pageFile, 'utf8');

// The duplicate import is:
/*
import { AdminEditorForm } from "@/components/admin/AdminEditorForm";
import { AdminEditorForm } from "@/components/admin/AdminEditorForm";
*/
pageCode = pageCode.replace(/import \{ AdminEditorForm \} from "@\/components\/admin\/AdminEditorForm";\r?\nimport \{ AdminEditorForm \} from "@\/components\/admin\/AdminEditorForm";/, 'import { AdminEditorForm } from "@/components/admin/AdminEditorForm";');

fs.writeFileSync(pageFile, pageCode, 'utf8');

// 2. IdentityPane.tsx
const idFile = path.resolve('./components/identity/IdentityPane.tsx');
let idCode = fs.readFileSync(idFile, 'utf8');

const idImportOld = 'import { SidebarSkeleton } from "@/components/ui/page-skeletons";';
const idImportNew = 'import { SidebarSkeleton } from "@/components/ui/page-skeletons";\nimport { PRLogo } from "@/components/identity/PRLogo";';
idCode = idCode.replace(idImportOld, idImportNew);

const idHeaderOld = `<h1 className="font-sans font-extrabold tracking-tighter uppercase text-zinc-50 whitespace-nowrap text-3xl md:text-3xl">
                  PREET RANK
                </h1>`;
const idHeaderNew = `<div className="flex items-center gap-4">
                  <PRLogo className="w-10 h-auto text-zinc-50" />
                  <h1 className="font-sans font-extrabold tracking-tighter uppercase text-zinc-50 whitespace-nowrap text-3xl md:text-3xl">
                    PREET RANK
                  </h1>
                </div>`;
idCode = idCode.replace(idHeaderOld, idHeaderNew);

fs.writeFileSync(idFile, idCode, 'utf8');

console.log("Rewrite Step 11 done.");
