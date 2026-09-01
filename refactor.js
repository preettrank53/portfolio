const fs = require('fs');

const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Remove framer-motion AnimatePresence and swipeable
code = code.replace(/import \{ motion, AnimatePresence, useScroll, useSpring \} from "framer-motion";/, 'import { motion, useScroll, useSpring } from "framer-motion";');
code = code.replace(/import \{ useSwipeable \} from "react-swipeable";\r?\n/, '');

// 2. Remove TABS array
code = code.replace(/const TABS = \[[\s\S]*?\];\r?\n/, '');

// 3. Replace state declarations
code = code.replace(/const \[activeTab, setActiveTab\] = useState<string>\("experience"\);\r?\n\s*const \[tabData, setTabData\] = useState<DevLogItem\[\]>\(\[\]\);\r?\n/, 'const [editingSection, setEditingSection] = useState<string | null>(null);\n  const [experienceDataState, setExperienceDataState] = useState<DevLogItem[]>([]);\n  const [projectsDataState, setProjectsDataState] = useState<DevLogItem[]>([]);\n  const [stackDataState, setStackDataState] = useState<DevLogItem[]>([]);\n');

// Remove tab states and scroll states
code = code.replace(/const \[isMobileStuck, setIsMobileStuck\] = useState<boolean>\(false\);\r?\n\s*const stickySentinelRef = useRef<HTMLDivElement>\(null\);\r?\n/, '');
code = code.replace(/const \[isTabLoading, setIsTabLoading\] = useState<boolean>\(false\);\r?\n/, '');
code = code.replace(/const \[showIdentity, setShowIdentity\] = useState<boolean>\(false\);\r?\n\s*const \[swipeDirection, setSwipeDirection\] = useState<number>\(1\);\r?\n/, '');

// 4. Remove scroll preservation useEffect and handleTabSwitch (Lines 140 to 204 roughly)
// We'll use a regex that deletes from useEffect(() => { return scrollY.on... down to trackMouse: false });
code = code.replace(/useEffect\(\(\) => \{\r?\n\s*return scrollY\.on\([\s\S]*?trackMouse: false\r?\n\s*}\);\r?\n/g, '');

// Remove Mobile Sticky Observer Fallback
code = code.replace(/\/\/ Mobile Sticky Observer Fallback\r?\n\s*useEffect\(\(\) => \{\r?\n\s*const observer = new IntersectionObserver\([\s\S]*?observer\.disconnect\(\);\r?\n\s*\}, \[\]\);\r?\n/g, '');

// 5. Replace layout classes
// Demolish dual pane CSS
code = code.replace(/<main className="min-h-\[100dvh\] bg-transparent text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-10">/, 
`<main className="min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-16 pb-24 text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-10">`);

code = code.replace(/<div className="max-w-\[1200px\] mx-auto flex flex-col md:flex-row w-full relative z-10 md:h-screen md:overflow-hidden px-6 sm:px-8 md:px-0">/, 
`<div className="w-full relative z-10 flex flex-col">`);

// 6. Rewrite data loading
// Replace the data fetching useEffect for activeTab with one that loads all three
const newDataFetch = `
  useEffect(() => {
    const loadData = async () => {
      try {
        setExperienceDataState(Array.isArray(STATIC_DATA.experience) ? STATIC_DATA.experience : []);
        setProjectsDataState(Array.isArray(STATIC_DATA.projects) ? STATIC_DATA.projects : []);
        setStackDataState(Array.isArray(STATIC_DATA.stack) ? STATIC_DATA.stack : []);
        setLoading(false);
        
        // Fetch appreciations for all items
        const allItems = [...(STATIC_DATA.experience as DevLogItem[]), ...(STATIC_DATA.projects as DevLogItem[])];
        const slugs = allItems.map((d: DevLogItem) => d?.id).filter(Boolean) as string[];
        if (slugs.length > 0) {
          const counts = await getAppreciations(slugs);
          setAppreciations(prev => ({ ...prev, ...(counts || {}) }));
        }
      } catch {
        setLoading(false);
      }
    };
    loadData();
  }, []);
`;
code = code.replace(/\/\/ Fetch data when active tab changes[\s\S]*?loadData\(\);\r?\n\s*\}, \[activeTab\]\);\r?\n/, newDataFetch);

// 7. Simplify saving functions to use the new arrays
code = code.replace(/const res = await saveDevData\(activeTab, updated\);/g, 'const res = await saveDevData(editingSection || "experience", updated);');
code = code.replace(/const res = await saveDevData\(activeTab, updatedList\);/g, 'const res = await saveDevData(editingSection || "experience", updatedList);');

// 8. Find FeedShell usage and replace with simple wrapper
// We will replace the entire <FeedShell ... > to </FeedShell> with <FeedShell> ... </FeedShell>
// Actually let's just strip the props from FeedShell:
code = code.replace(/<FeedShell[\s\S]*?>\r?\n\s*\{\/\* New Entry Button for Admin \*\/\}/, `<FeedShell>\n            {/* New Entry Button for Admin */}`);

fs.writeFileSync(file, code, 'utf8');
console.log("Refactor logic written!");
