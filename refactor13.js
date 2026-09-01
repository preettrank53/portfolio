const fs = require('fs');
const path = require('path');

function toProperCase(str) {
  if (!str) return str;
  const acronyms = ["API", "AI", "ML", "UI", "DSA", "OOPS", "CNNS", "RNNS", "RAG", "MCP", "KNN", "USAJOBS"];
  if (acronyms.includes(str.toUpperCase())) {
     if(str.toUpperCase() === "CNNS") return "CNNs";
     if(str.toUpperCase() === "RNNS") return "RNNs";
     if(str.toUpperCase() === "KNN") return "kNN";
     if(str.toUpperCase() === "OOPS") return "OOPs";
     if(str.toUpperCase() === "USAJOBS") return "USAJobs";
     return str.toUpperCase();
  }
  
  return str.replace(
    /\w\S*/g,
    function(txt) {
      if (acronyms.includes(txt.toUpperCase())) {
         if(txt.toUpperCase() === "CNNS") return "CNNs";
         if(txt.toUpperCase() === "RNNS") return "RNNs";
         if(txt.toUpperCase() === "KNN") return "kNN";
         if(txt.toUpperCase() === "OOPS") return "OOPs";
         return txt.toUpperCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// 1. experience.json
const expFile = path.resolve('./data/experience.json');
let expData = JSON.parse(fs.readFileSync(expFile, 'utf8'));
expData.forEach(item => {
  if (item.tags) {
    item.tags = item.tags.map(toProperCase);
  }
});
fs.writeFileSync(expFile, JSON.stringify(expData, null, 2), 'utf8');

// 2. projects.json
const projFile = path.resolve('./data/projects.json');
let projData = JSON.parse(fs.readFileSync(projFile, 'utf8'));
projData.forEach(item => {
  if (item.tags) {
    item.tags = item.tags.map(toProperCase);
  }
  if (item.category === "@AI-ML") {
    // keep as is
  } else if (item.category) {
    item.category = toProperCase(item.category);
  }
});
fs.writeFileSync(projFile, JSON.stringify(projData, null, 2), 'utf8');

// 3. stack.json
const stackFile = path.resolve('./data/stack.json');
let stackData = JSON.parse(fs.readFileSync(stackFile, 'utf8'));
stackData.forEach(item => {
  if (item.title) {
    item.title = toProperCase(item.title);
  }
  if (item.tools) {
    item.tools.forEach(tool => {
      if (tool.name) {
        tool.name = toProperCase(tool.name);
      }
    });
  }
});
fs.writeFileSync(stackFile, JSON.stringify(stackData, null, 2), 'utf8');

console.log("Rewrite Step 13 done.");
