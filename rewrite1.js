const fs = require('fs');
const path = require('path');
const p = path.resolve('d:/Projects/portfolio/portfolio/app/page.tsx');
let content = fs.readFileSync(p, 'utf8');

// 1. Remove useSwipeable & AnimatePresence
content = content.replace(/import \{ motion, AnimatePresence, useScroll, useSpring \} from "framer-motion";/, 'import { motion, useScroll, useSpring } from "framer-motion";');
content = content.replace(/import \{ useSwipeable \} from "react-swipeable";\r?\n/, '');

// 2. Remove tabs constant
content = content.replace(/const TABS = \[\s*\{ id: "experience", label: "EXPERIENCE" \},\s*\{ id: "stack", label: "SKILLS" \},\s*\{ id: "projects", label: "PROJECTS" \}\s*\];\r?\n\r?\n/, '');

// 3. Update state declarations
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState<string>\("experience"\);\s*const \[tabData, setTabData\] = useState<DevLogItem\[\]>\(\[\]\);/,
  const [experienceDataState, setExperienceDataState] = useState<DevLogItem[]>([]);
  const [projectsDataState, setProjectsDataState] = useState<DevLogItem[]>([]);
  const [stackDataState, setStackDataState] = useState<DevLogItem[]>([]);
  const [addingNewSection, setAddingNewSection] = useState<string | null>(null);
);

// 4. Remove tab logic states
content = content.replace(/const \[isTabLoading, setIsTabLoading\] = useState<boolean>\(false\);\r?\n/, '');
content = content.replace(/const \[showIdentity, setShowIdentity\] = useState<boolean>\(false\);\s*const \[swipeDirection, setSwipeDirection\] = useState<number>\(1\);\r?\n/, '');

// 5. Remove useEffects for sticky, swipeable, etc (lines 140 - 240)
// This is tricky using regex, we can match block by block
content = content.replace(/useEffect\(\(\) => \{\r?\n\s*return scrollY\.on\('change'[\s\S]*?\}, \[scrollY\]\);\r?\n/g, '');
content = content.replace(/const tabLoadingTimeoutRef[\s\S]*?trackMouse: false\r?\n\s*}\);\r?\n/g, '');
content = content.replace(/useEffect\(\(\) => \{\r?\n\s*const observer = new IntersectionObserver\([\s\S]*?observer\.disconnect\(\);\r?\n\s*\}, \[\]\);\r?\n/g, '');

// Also remove isMobileStuck and feed body refs
content = content.replace(/const \[isMobileStuck, setIsMobileStuck\] = useState<boolean>\(false\);\s*const stickySentinelRef = useRef<HTMLDivElement>\(null\);\r?\n/g, '');


fs.writeFileSync(p, content, 'utf8');
console.log("Rewrite Step 1 done.");
