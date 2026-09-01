const fs = require('fs');
const path = require('path');
const file = path.resolve('./app/page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Fix imports
code = code.replace(/import React, \{ useState, useEffect, useRef \} from "react";/, 'import React, { useState, useEffect } from "react";');
code = code.replace(/import \{ motion, useScroll, useSpring \} from "framer-motion";/, 'import { useScroll, useSpring } from "framer-motion";');

// 2. Fix scrollY
code = code.replace(/const \{ scrollYProgress, scrollY \} = useScroll\(\);/, 'const { scrollYProgress } = useScroll();');

// 3. Fix handleStartNewEntry
const oldHandleStart = `const handleStartNewEntry = () => {
    setIsAddingNew(true);
    setEditForm({
      id: \`\${(editingSection || "experience").slice(0, 4)}-\${Date.now()}\`,
      isPinned: false,
      date: "",
      category: "",
      title: "",
      body: "",
      tags: [],
      screenshots: [],
      codeSnippet: null,
      liveUrl: "",
      codeUrl: "",
      ...(editingSection === "experience" ? {
        company: "",
        type: "",
        duration: "",
        location: "",
        logoUrl: "",
        description: []
      } : editingSection === "stack" ? {
        description: "",
        tools: []
      } : {})
    });
    setTagsInput("");
    setConfirmDeleteId(null);
  };`;
  
const newHandleStart = `const handleStartNewEntry = (section: string) => {
    setEditingSection(section);
    setIsAddingNew(true);
    setEditForm({
      id: \`\${section.slice(0, 4)}-\${Date.now()}\`,
      isPinned: false,
      date: "",
      category: "",
      title: "",
      body: "",
      tags: [],
      screenshots: [],
      codeSnippet: null,
      liveUrl: "",
      codeUrl: "",
      ...(section === "experience" ? {
        company: "",
        type: "",
        duration: "",
        location: "",
        logoUrl: "",
        description: []
      } : section === "stack" ? {
        description: "",
        tools: []
      } : {})
    });
    setTagsInput("");
    setConfirmDeleteId(null);
  };`;

// Using split/join to replace because regex might be tricky with newlines
code = code.split(oldHandleStart).join(newHandleStart);

// 4. Update the buttons to use handleStartNewEntry
code = code.replace(/onClick=\{.*?setEditingSection\("experience"\); setIsAddingNew\(true\);.*?\}\}/, 'onClick={() => handleStartNewEntry("experience")}');
code = code.replace(/onClick=\{.*?setEditingSection\("projects"\); setIsAddingNew\(true\);.*?\}\}/, 'onClick={() => handleStartNewEntry("projects")}');
code = code.replace(/onClick=\{.*?setEditingSection\("stack"\); setIsAddingNew\(true\);.*?\}\}/, 'onClick={() => handleStartNewEntry("stack")}');

fs.writeFileSync(file, code, 'utf8');
console.log("Rewrite Step 4 done.");
