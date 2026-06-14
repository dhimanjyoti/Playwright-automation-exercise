// Import Node.js built-in modules required for the script
const fs = require('fs'); // 'fs' (File System) allows us to read, create, and write files.
const path = require('path'); // 'path' helps us easily build folder paths that work on both Mac and Windows.

// --- CONFIGURATION ---
// Define exactly where our Page Objects and API Controllers live and where we want to save the final manifest file.
// __dirname represents the folder this script currently lives in (the /scripts folder).
const SCAN_DIRS = [
  path.join(__dirname, '../src/pages'),
  path.join(__dirname, '../src/api')
]; 
const MANIFEST_PATH = path.join(__dirname, '../.claude/pom-manifest.md');

/**
 * Recursive function to look inside a folder, find all files, and look inside any sub-folders.
 * @param {string} dirPath - The directory to search in.
 * @param {Array} arrayOfFiles - The running list of found files (used internally for recursion).
 * @returns {Array} - A complete list of paths to every single .js file found.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  // Read everything inside the current directory (files AND folders)
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    // Build the full system path for the current file/folder
    const fullPath = path.join(dirPath, file);
    
    // If this item is a folder, run this function again to look inside it (Recursion!)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } 
    // If it is a JavaScript file, add it to our final list
    else if (fullPath.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
}

/**
 * Scans the files, extracts data, and writes the markdown file.
 */
function generateManifest() {
  // Start building the text that will be saved into the Markdown file
  let manifestContent = '# Framework Manifest (Context Diet for Claude)\n\n';
  manifestContent += '> **AI INSTRUCTION:** Read this file to understand available Page Objects and API Controllers. DO NOT scan the `src/` directory directly to save context tokens.\n\n';

  // Loop over every configured directory path
  SCAN_DIRS.forEach(dirPath => {
    // Safety check: Does the current folder actually exist? If not, skip to the next one.
    if (!fs.existsSync(dirPath)) {
      console.warn(`Warning: Directory not found at ${dirPath}, skipping...`);
      return;
    }

    // Get our list of every .js file inside the current directory
    const files = getAllFiles(dirPath);
    
    // Loop over every single .js file we found in this directory
    files.forEach(file => {
      // Read the actual code inside the file
      const content = fs.readFileSync(file, 'utf8');
      
      // Create a clean, readable file path for the markdown (e.g., "src/pages/LoginPage.js")
      // .replace(/\\/g, '/') ensures Windows backslashes become standard forward slashes
      const relativePath = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');

      // --- STEP 1: FIND THE CLASS NAME ---
      // Use Regex to find "class SomethingPage" or "class SomethingController" inside the file
      const classMatch = content.match(/class\s+([A-Za-z0-9_]+)/);
      
      // If this file doesn't have a class (like a utility or config file), skip it entirely
      if (!classMatch) return; 

      // Extract just the name (e.g., "LoginPage")
      const className = classMatch[1]; 
      
      // Add the class name and file path to our markdown text
      manifestContent += `## ${className}\n`;
      manifestContent += `**File:** \`${relativePath}\`\n\n`;
      manifestContent += `**Methods:**\n`;

      // --- STEP 2: FIND THE METHODS ---
      // This complex Regex looks for typical Javascript method signatures.
      // It captures: "async methodName(args) {" OR "get methodName() {"
      const methodRegex = /^\s*(?:async\s+)?(?:get\s+)?([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/gm;
      let match;
      
      // Javascript control words that look like methods to Regex, but aren't. We must ignore these.
      const ignoreList = ['if', 'catch', 'switch', 'for', 'while', 'constructor', 'super'];
      let hasMethods = false; // Tracker to see if we actually found any valid methods

      // Loop through every regex match found in the file's code
      while ((match = methodRegex.exec(content)) !== null) {
        const methodName = match[1]; // e.g., "submitLogin"
        // e.g., "email, password" (clears the extra spaces)
        const args = match[2].trim().replace(/\s+/g, ' '); 
        
        // If the word isn't in our ignore list, format it and add it to the markdown
        if (!ignoreList.includes(methodName)) {
          manifestContent += `- \`${methodName}(${args})\`\n`;
          hasMethods = true;
        }
      }

      // If the file was just an empty class with no methods, note that in the file
      if (!hasMethods) {
        manifestContent += `- *(No custom methods detected)*\n`;
      }
      
      // Add a visual separator line before processing the next file
      manifestContent += '\n---\n\n';
    });
  });

  // --- STEP 3: SAVE THE FILE ---
  // Ensure the `.claude/` folder actually exists before we try to save a file inside it
  const claudeDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(claudeDir)) {
    // recursive: true creates parent folders if needed
    fs.mkdirSync(claudeDir, { recursive: true }); 
  }

  // Write all the text we built into the final .md file
  fs.writeFileSync(MANIFEST_PATH, manifestContent);
  console.log(`Unified Framework Manifest generated successfully at: ${MANIFEST_PATH}`);
}

// Trigger the main function to run the script
generateManifest();