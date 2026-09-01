const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Remove useTheme
code = code.replace(/import \{ useTheme \} from "next-themes";\r?\n/, '');

// 2. Remove theme, setTheme
code = code.replace(/const \{ theme, setTheme \} = useTheme\(\);\r?\n/, '');

// 3. Remove mounted
code = code.replace(/const \[mounted, setMounted\] = useState<boolean>\(false\);\r?\n/, '');
code = code.replace(/setMounted\(true\);\r?\n/, '');

// 4. Remove scaleX
code = code.replace(/const scaleX = useSpring\([\s\S]*?\}\);\r?\n/, '');
code = code.replace(/import \{ useScroll, useSpring \} from "framer-motion";/, 'import { useScroll } from "framer-motion";');

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 6 done.");
