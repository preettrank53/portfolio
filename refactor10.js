const fs = require('fs');
const path = require('path');

// 1. IdentityPane.tsx
let idFile = path.resolve('./components/identity/IdentityPane.tsx');
let idCode = fs.readFileSync(idFile, 'utf8');

idCode = idCode.replace(/<div className="absolute -left-32 top-1\/2 -translate-y-1\/2 hidden lg:flex flex-col items-end pointer-events-none opacity-70 rotate-\[-4deg\]">[\s\S]*?<\/div>/, '');
idCode = idCode.replace(/<span className="hidden md:block font-handwritten text-zinc-500 text-sm mb-2 opacity-60">connect<\/span>/, '');
fs.writeFileSync(idFile, idCode, 'utf8');

// 2. SignatureWallEntry.tsx
let sigFile = path.resolve('./components/SignatureWallEntry.tsx');
let sigCode = fs.readFileSync(sigFile, 'utf8');

sigCode = sigCode.replace(/<div className="absolute -top-12 -right-12 hidden md:flex flex-col items-start pointer-events-none opacity-70 rotate-\[6deg\]">[\s\S]*?<\/div>/, '');
fs.writeFileSync(sigFile, sigCode, 'utf8');

// 3. app/wall/page.tsx
let wallFile = path.resolve('./app/wall/page.tsx');
let wallCode = fs.readFileSync(wallFile, 'utf8');

wallCode = wallCode.replace(/\{\/\* Annotation: text-only below button \*\/\}[\s\S]*?<\/div>\r?\n\s*<\/div>/, '</div>');
fs.writeFileSync(wallFile, wallCode, 'utf8');

console.log("Removed handwritten annotations.");
