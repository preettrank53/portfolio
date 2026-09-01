const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Remove scrollYProgress line
code = code.replace(/const \{ scrollYProgress \} = useScroll\(\);\r?\n/, '');

// 2. Remove useScroll import
code = code.replace(/import \{ useScroll \} from "framer-motion";\r?\n/, '');

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 7 done.");
