#!/usr/bin/env node

import { readdir, writeFile, mkdir, readFile, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function calculateReadingTime(content) {
  // Remove frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/m, '');
  
  // Count words (simple approach)
  const words = contentWithoutFrontmatter
    .replace(/[^\w\s]/g, ' ') // Replace non-word chars with spaces
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  const wordCount = words.length;
  
  // Average reading speed is about 200-250 words per minute
  // We'll use 225 words per minute as a middle ground
  const wordsPerMinute = 225;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, body: content };
  }
  
  const [, frontmatter, body] = match;
  const metadata = {};
  
  // Simple YAML parser for frontmatter
  const lines = frontmatter.trim().split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      
      // Remove quotes
      if (typeof value === 'string') {
        value = value.replace(/^"|"$/g, '');

        // Parse arrays (simple format: ["item1", "item2"])
        if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch {
            // If JSON parsing fails, treat as string
          }
        }

        // Parse booleans
        if (typeof value === 'string' && value === 'true') value = true;
        if (typeof value === 'string' && value === 'false') value = false;
      }
      metadata[key.trim()] = value;
    }
  }
  
  return { metadata, body };
}

function updateFrontmatter(content, newReadTime) {
  const { metadata, body } = parseFrontmatter(content);
  
  // Update the readTime and updated date
  metadata.readTime = newReadTime;
  metadata.updated = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Reconstruct the frontmatter
  let frontmatter = '---\n';
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      frontmatter += `${key}: ${JSON.stringify(value)}\n`;
    } else if (typeof value === 'string') {
      frontmatter += `${key}: "${value}"\n`;
    } else {
      frontmatter += `${key}: ${value}\n`;
    }
  }
  frontmatter += '---\n\n';
  
  return frontmatter + body;
}

async function processMarkdownFile(sourceFile, outputFile) {
  try {
    const content = await readFile(sourceFile, 'utf-8');
    const readTime = calculateReadingTime(content);
    const updatedContent = updateFrontmatter(content, readTime);
    
    // Write the updated content to output
    await writeFile(outputFile, updatedContent, 'utf-8');
    
    console.log(`  Updated ${sourceFile} with reading time: ${readTime}`);
    return true;
  } catch (error) {
    console.error(`  Error processing ${sourceFile}:`, error);
    // Fallback: just copy the file
    await copyFile(sourceFile, outputFile);
    return false;
  }
}

async function generateIndex(sourceDir, outputDir) {
  try {
    const files = await readdir(sourceDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });
    
    // Process each markdown file and copy with updated reading time
    for (const file of markdownFiles) {
      const sourceFile = join(sourceDir, file);
      const outputFile = join(outputDir, file);
      await processMarkdownFile(sourceFile, outputFile);
    }
    
    // Write index.json
    const indexPath = join(outputDir, 'index.json');
    await writeFile(indexPath, JSON.stringify(markdownFiles, null, 2));
    
    console.log(`Generated index for ${sourceDir}: ${markdownFiles.length} files`);
    console.log(`  Files: ${markdownFiles.join(', ')}`);
    
    return markdownFiles;
  } catch (error) {
    console.error(`Error generating index for ${sourceDir}:`, error);
    return [];
  }
}

async function main() {
  console.log('Generating content indices...');
  
  const dataDir = join(projectRoot, 'data');
  const staticDir = join(projectRoot, 'static', 'data');
  
  // Generate indices for both source and static directories
  await generateIndex(join(dataDir, 'blogs'), join(staticDir, 'blogs'));
  await generateIndex(join(dataDir, 'projects'), join(staticDir, 'projects'));
  await generateIndex(join(dataDir, 'games'), join(staticDir, 'games'));
  
  console.log('Done!');
}

main().catch(console.error);