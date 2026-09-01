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

code = code.replace(/const \[isMobileStuck, setIsMobileStuck\] = useState<boolean>\(false\);\r?\n\s*const stickySentinelRef = useRef<HTMLDivElement>\(null\);\r?\n/, '');
code = code.replace(/const \[isTabLoading, setIsTabLoading\] = useState<boolean>\(false\);\r?\n/, '');
code = code.replace(/const \[showIdentity, setShowIdentity\] = useState<boolean>\(false\);\r?\n\s*const \[swipeDirection, setSwipeDirection\] = useState<number>\(1\);\r?\n/, '');

// 4. Remove scroll preservation useEffect and handleTabSwitch
code = code.replace(/useEffect\(\(\) => \{\r?\n\s*return scrollY\.on\([\s\S]*?trackMouse: false\r?\n\s*}\);\r?\n/g, '');

// Remove Mobile Sticky Observer Fallback
code = code.replace(/\/\/ Mobile Sticky Observer Fallback\r?\n\s*useEffect\(\(\) => \{\r?\n\s*const observer = new IntersectionObserver\([\s\S]*?observer\.disconnect\(\);\r?\n\s*\}, \[\]\);\r?\n/g, '');

// 5. Replace layout classes
code = code.replace(/<main className="min-h-\[100dvh\] bg-transparent text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-10">/, 
`<main className="min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-16 pb-24 text-purewhite selection:bg-purewhite selection:text-canvas transition-colors duration-500 relative z-10">`);

code = code.replace(/<div className="max-w-\[1200px\] mx-auto flex flex-col md:flex-row w-full relative z-10 md:h-screen md:overflow-hidden px-6 sm:px-8 md:px-0">/, 
`<div className="w-full relative z-10 flex flex-col">`);

// 6. Rewrite data loading
const newDataFetch = `
  useEffect(() => {
    const loadData = async () => {
      try {
        setExperienceDataState(Array.isArray(STATIC_DATA.experience) ? STATIC_DATA.experience as DevLogItem[] : []);
        setProjectsDataState(Array.isArray(STATIC_DATA.projects) ? STATIC_DATA.projects as DevLogItem[] : []);
        setStackDataState(Array.isArray(STATIC_DATA.stack) ? STATIC_DATA.stack as DevLogItem[] : []);
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

// 7. Simplify saving functions
code = code.replace(/const res = await saveDevData\(activeTab, updated\);/g, 'const res = await saveDevData(editingSection || "experience", updated);');
code = code.replace(/const res = await saveDevData\(activeTab, updatedList\);/g, 'const res = await saveDevData(editingSection || "experience", updatedList);');

// 8. Replace activeTab in handleStartNewEntry
code = code.replace(/\(activeTab === "experience" \? \{/, '(editingSection === "experience" ? {');
code = code.replace(/activeTab === "stack" \? \{/, 'editingSection === "stack" ? {');
code = code.replace(/id: \`\$\{activeTab\.slice\(0, 4\)\}-\$\{Date\.now\(\)\}\`,/, 'id: `${(editingSection || "experience").slice(0, 4)}-${Date.now()}`,');

code = code.replace(/if \(activeTab === "experience" && Array\.isArray\(finalForm\.description\)\) \{/, 'if (editingSection === "experience" && Array.isArray(finalForm.description)) {');
code = code.replace(/if \(activeTab === "projects"\) \{/, 'if (editingSection === "projects") {');

// 9. Rewrite FeedShell block completely
// We locate <ErrorBoundary title="LOGBOOK FEED"> to the closing </ErrorBoundary> before </div>\n      <ScrollToTop />
const startTag = '<ErrorBoundary title="LOGBOOK FEED">';
const endTagStr = '      </ErrorBoundary>\n      </div>\n\n      <ScrollToTop />';
const startIndex = code.indexOf(startTag);
const endIndex = code.indexOf(endTagStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newFeedShell = `<ErrorBoundary title="LOGBOOK FEED">
        <FeedShell>
            
            {/* New Entry Button for Admin */}
            {adminMode && !isAddingNew && !editingId && (
              <div className="pt-6 flex gap-2">
                <button 
                  onClick={() => { setEditingSection("experience"); setIsAddingNew(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] uppercase tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD EXPERIENCE</span>
                </button>
                <button 
                  onClick={() => { setEditingSection("projects"); setIsAddingNew(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] uppercase tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD PROJECT</span>
                </button>
                <button 
                  onClick={() => { setEditingSection("stack"); setIsAddingNew(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-dashed border-charcoal text-ash hover:text-accent hover:border-accent transition-colors duration-150 font-mono text-[10px] uppercase tracking-widest rounded-none min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD SKILL</span>
                </button>
              </div>
            )}

            {isAddingNew && editForm && (
              <AdminEditorForm
                editForm={editForm}
                setEditForm={setEditForm}
                activeTab={editingSection || "experience"}
                isAddingNew={true}
                tagsInput={tagsInput}
                setTagsInput={setTagsInput}
                onSave={handleSaveNewEntry}
                onCancel={() => setIsAddingNew(false)}
              />
            )}

            {loading ? (
              <div className="flex flex-col py-8 px-6 sm:px-8 md:px-0 w-full">
                <ExperienceCardSkeleton />
                <ProjectCardSkeleton />
                <SkillsSkeleton />
              </div>
            ) : (
              <div className="flex flex-col gap-12 mt-12">
                
                {/* EXPERIENCE SECTION */}
                <div className="flex flex-col">
                  <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b border-charcoal pb-4 mb-8">EXPERIENCE</h2>
                  {experienceDataState.map((post, index) => {
                    const isEditing = editingId === post.id;
                    const hasUserAppreciated = userAppreciated[post.id] || false;
                    const appCount = appreciations[post.id] ?? 0;

                    if (isEditing && editForm) {
                      return (
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab="experience"
                          isAddingNew={false}
                          tagsInput={tagsInput}
                          setTagsInput={setTagsInput}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          onDelete={() => handleDeleteEntry(post.id)}
                          confirmDeleteId={confirmDeleteId}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      );
                    }

                    return (
                      <ExperienceCard
                        key={post.id}
                        post={post}
                        index={index}
                        adminMode={adminMode}
                        hasUserAppreciated={hasUserAppreciated}
                        appCount={appCount}
                        handleTogglePin={handleTogglePin}
                        handleStartEdit={(item) => { setEditingSection("experience"); handleStartEdit(item); }}
                        handleAppreciate={handleAppreciate}
                        setScreenshotList={setScreenshotList}
                        setScreenshotIndex={setScreenshotIndex}
                        setSelectedScreenshot={setSelectedScreenshot}
                      />
                    );
                  })}
                </div>

                {/* PROJECTS SECTION */}
                <div className="flex flex-col">
                  <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b border-charcoal pb-4 mb-8 mt-12">PROJECTS</h2>
                  {projectsDataState.map((post, index) => {
                    const isEditing = editingId === post.id;
                    const hasUserAppreciated = userAppreciated[post.id] || false;
                    const appCount = appreciations[post.id] ?? 0;

                    if (isEditing && editForm) {
                      return (
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab="projects"
                          isAddingNew={false}
                          tagsInput={tagsInput}
                          setTagsInput={setTagsInput}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          onDelete={() => handleDeleteEntry(post.id)}
                          confirmDeleteId={confirmDeleteId}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      );
                    }

                    const isExpanded = expandedCards[post.id] || false;
                    const bodyText = post.body || "";
                    const shouldTruncate = bodyText.split("\\n").length > 4 || bodyText.length > 300;

                    return (
                      <ProjectCard
                        key={post.id}
                        post={post}
                        index={index}
                        adminMode={adminMode}
                        hasUserAppreciated={hasUserAppreciated}
                        appCount={appCount}
                        isExpanded={isExpanded}
                        shouldTruncate={shouldTruncate}
                        setExpandedCards={setExpandedCards}
                        handleTogglePin={handleTogglePin}
                        handleStartEdit={(item) => { setEditingSection("projects"); handleStartEdit(item); }}
                        handleAppreciate={handleAppreciate}
                        setScreenshotList={setScreenshotList}
                        setScreenshotIndex={setScreenshotIndex}
                        setSelectedScreenshot={setSelectedScreenshot}
                      />
                    );
                  })}
                </div>

                {/* SKILLS SECTION */}
                <div className="flex flex-col">
                  <h2 className="font-mono text-xl font-bold uppercase tracking-widest border-b border-charcoal pb-4 mb-8 mt-12">SKILLS</h2>
                  {stackDataState.map((post, index) => {
                    const isEditing = editingId === post.id;

                    if (isEditing && editForm) {
                      return (
                        <AdminEditorForm
                          key={post.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          activeTab="stack"
                          isAddingNew={false}
                          tagsInput={tagsInput}
                          setTagsInput={setTagsInput}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          onDelete={() => handleDeleteEntry(post.id)}
                          confirmDeleteId={confirmDeleteId}
                          setConfirmDeleteId={setConfirmDeleteId}
                        />
                      );
                    }

                    return (
                      <StackSection
                        key={post.id}
                        post={post}
                        index={index}
                        adminMode={adminMode}
                        handleStartEdit={(item) => { setEditingSection("stack"); handleStartEdit(item); }}
                      />
                    );
                  })}
                </div>

              </div>
            )}
        </FeedShell>
      </ErrorBoundary>
`;
  code = code.slice(0, startIndex) + newFeedShell + code.slice(endIndex + '      </ErrorBoundary>\n'.length);
}

// 10. Replace tab update on Command Palette
code = code.replace(/onSelectTab=\{\(tab\) => \{ setActiveTab\(tab\); setIsAddingNew\(false\); setEditingId\(null\); \}\}/, 
  'onSelectTab={(tab) => { setEditingSection(tab); setIsAddingNew(false); setEditingId(null); }}');

// 11. Replace tabData save in JSON export
code = code.replace(/JSON\.stringify\(tabData, null, 2\)/, 
  'JSON.stringify(editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState, null, 2)');
code = code.replace(/download", \`\$\{activeTab\}\.json\`/g, 
  'download", `${editingSection || "export"}.json`');
code = code.replace(/EXPORT \{activeTab\.toUpperCase\(\)\} JSON/g, 
  'EXPORT {editingSection ? editingSection.toUpperCase() : "DATA"} JSON');

// 12. In handleSaveEdit and handleSaveNewEntry, we map over updated
code = code.replace(/const updated = tabData.map/, 
  'const updated = (editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState).map');
code = code.replace(/setTabData\(updated\);/g, 
  'if (editingSection === "experience") setExperienceDataState(updated);\n    else if (editingSection === "projects") setProjectsDataState(updated);\n    else setStackDataState(updated);');

code = code.replace(/const updated = \[finalForm, \.\.\.tabData\]\.map/, 
  'const targetList = editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState;\n    const updated = [finalForm, ...targetList].map');

code = code.replace(/const updatedList = tabData\.filter/, 
  'const targetList = editingSection === "experience" ? experienceDataState : editingSection === "projects" ? projectsDataState : stackDataState;\n    const updatedList = targetList.filter');
code = code.replace(/setTabData\(updatedList\);/g, 
  'if (editingSection === "experience") setExperienceDataState(updatedList);\n    else if (editingSection === "projects") setProjectsDataState(updatedList);\n    else setStackDataState(updatedList);');

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 2 done.");
