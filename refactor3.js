const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// Normalize line endings to \n temporarily for indexOf
const normalizedCode = code.replace(/\r\n/g, '\n');

const startTag = '<ErrorBoundary title="LOGBOOK FEED">';
const endTagStr = '      </ErrorBoundary>\n      </div>\n\n      <ScrollToTop />';
const startIndex = normalizedCode.indexOf(startTag);
const endIndex = normalizedCode.indexOf(endTagStr);

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
  code = normalizedCode.slice(0, startIndex) + newFeedShell + normalizedCode.slice(endIndex + '      </ErrorBoundary>\n'.length);
}

// Convert back to original line endings if needed, but \n is fine
fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 3 done.");
