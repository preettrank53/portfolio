"use client";

import React from "react";
import type { DevLogItem } from "@/types/portfolio";
import { LogoUploader } from "./LogoUploader";
import { ScreenshotEditor } from "./ScreenshotEditor";

interface AdminEditorFormProps {
  editForm: Partial<DevLogItem>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setEditForm: React.Dispatch<React.SetStateAction<any>>;
  activeTab: string;
  isAddingNew: boolean;
  tagsInput: string;
  setTagsInput: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  confirmDeleteId?: string | null;
  setConfirmDeleteId?: (id: string | null) => void;
  title?: string;
}

export function AdminEditorForm({
  editForm,
  setEditForm,
  activeTab,
  isAddingNew,
  tagsInput,
  setTagsInput,
  onSave,
  onCancel,
  onDelete,
  confirmDeleteId,
  setConfirmDeleteId,
  title
}: AdminEditorFormProps) {
  const handleUpdateTool = (index: number, field: string, value: string) => {
    if (!editForm) return;
    const updatedTools = [...(editForm.tools || [])];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    setEditForm({ ...editForm, tools: updatedTools });
  };

  const handleRemoveTool = (index: number) => {
    if (!editForm) return;
    const updatedTools = (editForm.tools || []).filter((_, i) => i !== index);
    setEditForm({ ...editForm, tools: updatedTools });
  };

  const handleAddTool = () => {
    if (!editForm) return;
    const updatedTools = [...(editForm.tools || []), { name: "", iconName: "TextFallback", color: "#FFFFFF" }];
    setEditForm({ ...editForm, tools: updatedTools });
  };

  return (
    <div className={`py-0 border-b-0 ${isAddingNew ? "md:py-8" : "md:py-10"} md:border-b md:border-charcoal`}>
      <div className={`fixed inset-0 w-full h-[100dvh] z-[100] bg-canvas overflow-y-auto p-5 pb-28 md:relative md:inset-auto md:w-auto md:h-auto md:bg-transparent md:p-6 md:pb-6 flex flex-col gap-4 border border-charcoal bg-darkiron/20`}>
        <span className="block font-mono text-[10px] text-purewhite tracking-wider border-b border-charcoal pb-2">
          {title || (isAddingNew ? "DEPLOY NEW ENTRY" : `EDIT ENTRY: ${editForm.title}`)}
        </span>
        
        {activeTab === "experience" && (
          <LogoUploader 
            logoUrl={editForm.logoUrl}
            onChange={url => setEditForm({ ...editForm, logoUrl: url })}
          />
        )}

        {activeTab === "stack" ? (
          <>
            <div>
              <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
              <input 
                type="text" 
                placeholder="PROGRAMMING & DATABASES"
                value={editForm.title || ""} 
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION</label>
              <textarea 
                placeholder="Core languages and relational datastores."
                value={editForm.description || ""} 
                onChange={e => setEditForm({ ...editForm, description: e.target.value, body: e.target.value })}
                className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-20 focus:outline-none focus:border-accent font-sans resize-y"
              />
            </div>

            <div className="border border-charcoal p-4 bg-canvas/30">
              <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">
                TOOLS & ICONS
              </span>
              <div className="flex flex-col gap-2">
                {(editForm.tools || []).map((tool, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-3 items-center border border-charcoal p-3 bg-canvas/10 mb-2">
                    <div className="flex-1 w-full">
                      <label className="block font-mono text-[8px] text-ash mb-0.5">TOOL NAME</label>
                      <input
                        type="text"
                        placeholder="E.g., PYTHON"
                        value={tool.name || ""}
                        onChange={e => handleUpdateTool(idx, "name", e.target.value.toUpperCase())}
                        className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-sans"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="block font-mono text-[8px] text-ash mb-0.5">ICON CLASS (OR TextFallback)</label>
                      <input
                        type="text"
                        placeholder="E.g., SiPython"
                        value={tool.iconName || ""}
                        onChange={e => handleUpdateTool(idx, "iconName", e.target.value)}
                        className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                      />
                    </div>
                    <div className="w-full md:w-32 flex gap-1 items-end">
                      <div className="flex-1">
                        <label className="block font-mono text-[8px] text-ash mb-0.5">COLOR (HEX)</label>
                        <input
                          type="text"
                          placeholder="#FFFFFF"
                          value={tool.color || ""}
                          onChange={e => handleUpdateTool(idx, "color", e.target.value)}
                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none font-mono"
                        />
                      </div>
                      <input
                        type="color"
                        value={tool.color && tool.color.startsWith("#") ? tool.color : "#FFFFFF"}
                        onChange={e => handleUpdateTool(idx, "color", e.target.value.toUpperCase())}
                        className="w-12 h-[48px] border border-charcoal cursor-pointer bg-transparent p-0 rounded-none shrink-0"
                      />
                    </div>
                    <div className="w-full md:w-auto self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(idx)}
                        className="w-full md:w-auto px-4 py-3 border border-charcoal hover:border-red-500 hover:text-red-500 font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
                      >
                        [X]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddTool}
                className="mt-3 w-full py-3.5 border border-dashed border-charcoal hover:border-accent hover:text-accent font-mono text-xs text-ash transition-colors rounded-none min-h-[48px] flex items-center justify-center"
              >
                [+ ADD TOOL]
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-mono text-[9px] text-ash mb-1">TITLE</label>
                <input 
                  type="text" 
                  placeholder={activeTab === "experience" ? "Open Source Contributor" : "PROJECT ALPHA V2"}
                  value={editForm.title || ""} 
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block font-mono text-[9px] text-ash mb-1">DATE</label>
                <input 
                  type="text" 
                  placeholder={activeTab === "experience" ? "Jun 2026 - Aug 2026" : "JUL 2025"}
                  value={editForm.date || ""} 
                  onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="block font-mono text-[9px] text-ash mb-1">TAGS (COMMA SEPARATED)</label>
                <input 
                  type="text" 
                  placeholder={activeTab === "experience" ? "git, github" : "rust, wasm, compiler"}
                  value={tagsInput} 
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            {activeTab === "experience" ? (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">COMPANY</label>
                    <input 
                      type="text" 
                      placeholder="Elite Coders"
                      value={editForm.company || ""} 
                      onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">JOB TYPE</label>
                    <input 
                      type="text" 
                      placeholder="Apprenticeship"
                      value={editForm.type || ""} 
                      onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">DURATION</label>
                    <input 
                      type="text" 
                      placeholder="3 mos"
                      value={editForm.duration || ""} 
                      onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">LOCATION</label>
                    <input 
                      type="text" 
                      placeholder="Bengaluru, Karnataka, India"
                      value={editForm.location || ""} 
                      onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-ash mb-1">DESCRIPTION (ONE BULLET PER LINE)</label>
                  <textarea 
                    placeholder="Selected as a Contributor...&#10;Contributing to production-grade software..."
                    value={Array.isArray(editForm.description) ? editForm.description.join("\n") : (editForm.description || "")} 
                    onChange={e => {
                      const lines = e.target.value.split("\n");
                      setEditForm({ ...editForm, description: lines });
                    }}
                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">CATEGORY</label>
                    <input 
                      type="text" 
                      placeholder="@SYSTEMS"
                      value={editForm.category || ""} 
                      onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                  <div className="flex items-end pb-1.5">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="newIsPinned"
                        checked={!!editForm.isPinned}
                        onChange={e => setEditForm({ ...editForm, isPinned: e.target.checked })}
                        className="accent-accent"
                      />
                      <label htmlFor="newIsPinned" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                        🚩 PINNED FLAGSHIP
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-ash mb-1">BODY TEXT</label>
                  <textarea 
                    placeholder="Describe what you built, the problem it solves, and what you learned..."
                    value={editForm.body || ""} 
                    onChange={e => setEditForm({ ...editForm, body: e.target.value })}
                    className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none h-28 focus:outline-none focus:border-accent font-sans resize-y"
                  />
                </div>

                <div className="border border-charcoal p-4 bg-canvas/50">
                  <div className="flex items-center gap-2 mb-3">
                    <input 
                      type="checkbox" 
                      id="newIncludeSnippet"
                      checked={!!(editForm.codeSnippet && editForm.codeSnippet.content)}
                      onChange={e => {
                        if (e.target.checked) {
                          setEditForm({
                            ...editForm,
                            codeSnippet: { title: "", lang: "", content: "" }
                          });
                        } else {
                          setEditForm({
                            ...editForm,
                            codeSnippet: null
                          });
                        }
                      }}
                      className="accent-accent"
                    />
                    <label htmlFor="newIncludeSnippet" className="font-mono text-[9px] text-ash cursor-pointer uppercase select-none">
                      EXPOSE EMBEDDED CODE SNIPPET
                    </label>
                  </div>

                  {editForm.codeSnippet && (
                    <div className="flex flex-col gap-3 pl-4 border-l border-charcoal/55 mt-2">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block font-mono text-[8px] text-ash mb-1">FILE NAME</label>
                          <input 
                            type="text" 
                            placeholder="File name (e.g. main.rs)"
                            value={editForm.codeSnippet.title || ""} 
                            onChange={e => {
                              if (!editForm || !editForm.codeSnippet) return;
                              setEditForm({ 
                                ...editForm, 
                                codeSnippet: {
                                  ...editForm.codeSnippet,
                                  title: e.target.value
                                }
                              });
                            }}
                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-sans"
                          />
                        </div>
                        <div className="w-32">
                          <label className="block font-mono text-[8px] text-ash mb-1">LANGUAGE</label>
                          <input 
                            type="text" 
                            placeholder="Language"
                            value={editForm.codeSnippet.lang || ""} 
                            onChange={e => {
                              if (!editForm || !editForm.codeSnippet) return;
                              setEditForm({ 
                                ...editForm, 
                                codeSnippet: {
                                  ...editForm.codeSnippet,
                                  lang: e.target.value.toUpperCase()
                                }
                              });
                            }}
                            className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[8px] text-ash mb-1">CODE CONTENT</label>
                        <textarea 
                          placeholder="Code content"
                          value={editForm.codeSnippet.content || ""} 
                          onChange={e => {
                             if (!editForm || !editForm.codeSnippet) return;
                             setEditForm({ 
                               ...editForm, 
                               codeSnippet: {
                                 ...editForm.codeSnippet,
                                 content: e.target.value
                               }
                             });
                          }}
                          className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite rounded-none h-20 focus:outline-none font-mono resize-y"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">LIVE LINK</label>
                    <input 
                      type="text" 
                      placeholder="https://your-project.vercel.app"
                      value={editForm.liveUrl || ""} 
                      onChange={e => setEditForm({ ...editForm, liveUrl: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-sans"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-mono text-[9px] text-ash mb-1">CODE LINK</label>
                    <input 
                      type="text" 
                      placeholder="https://github.com/you/repo"
                      value={editForm.codeUrl || ""} 
                      onChange={e => setEditForm({ ...editForm, codeUrl: e.target.value })}
                      className="w-full bg-canvas border border-charcoal p-3 min-h-[48px] text-sm text-purewhite placeholder:text-ash/40 rounded-none focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {activeTab !== "stack" && (
          <div className="border-t border-charcoal/30 pt-4 mt-2">
            <span className="block font-mono text-[10px] text-ash uppercase tracking-widest mb-3">SCREENSHOTS</span>
            <ScreenshotEditor
              screenshots={editForm.screenshots ?? []}
              onChange={(shots) => setEditForm({ ...editForm, screenshots: shots })}
            />
          </div>
        )}

        <div className={`fixed bottom-0 left-0 right-0 border-t border-charcoal bg-canvas p-4 flex flex-col sm:flex-row gap-3 items-center w-full z-10 pb-[calc(16px+env(safe-area-inset-bottom))] md:relative md:bottom-auto md:left-auto md:right-auto md:border-t-0 md:bg-transparent md:p-0 md:pb-0 ${!isAddingNew ? 'justify-between' : 'justify-end md:justify-end'}`}>
          {!isAddingNew && onDelete && confirmDeleteId !== undefined && setConfirmDeleteId && (
            <div className="w-full sm:w-auto">
              {confirmDeleteId === editForm.id ? (
                <div className="flex items-center justify-between sm:justify-start gap-2 border border-red-500/50 bg-red-500/10 p-2 w-full sm:w-auto">
                  <span className="font-mono text-[9px] text-red-500 uppercase tracking-wider">DELETE ENTRY?</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onDelete()}
                      className="px-3 py-1.5 bg-red-500 text-canvas font-mono font-bold text-[9px] hover:bg-red-600 transition-colors rounded-none min-h-[36px]"
                    >
                      YES
                    </button>
                    <button 
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-1.5 border border-charcoal font-mono text-[9px] text-ash hover:text-purewhite transition-colors rounded-none min-h-[36px]"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => editForm.id && setConfirmDeleteId(editForm.id)}
                  className="w-full sm:w-auto px-4 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-canvas font-mono text-xs transition-colors rounded-none min-h-[48px]"
                >
                  DELETE ENTRY
                </button>
              )}
            </div>
          )}
          
          <div className={`flex gap-3 w-full sm:w-auto ${isAddingNew ? '' : 'justify-end'}`}>
            <button 
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
            >
              CANCEL
            </button>
            <button 
              onClick={onSave}
              className="flex-1 sm:flex-none px-4 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
            >
              {isAddingNew ? "SAVE NEW ENTRY" : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
