#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(new URL("../../..", import.meta.url).pathname);
const contentDir = join(root, "src/content/incantations");
const referencePath = join(root, "skills/prompts-for-mortals/references/incantations.md");

function readWebsiteIds() {
  return readdirSync(contentDir)
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const body = readFileSync(join(contentDir, file), "utf8");
      const match = body.match(/^id:\s*["']?([a-z0-9-]+)["']?\s*$/m);
      if (!match) throw new Error(`Missing frontmatter id in ${file}`);
      return match[1];
    })
    .sort();
}

function readReferenceIds() {
  const body = readFileSync(referencePath, "utf8");
  return [...body.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|/gm)]
    .map(match => match[1])
    .sort();
}

const websiteIds = readWebsiteIds();
const referenceIds = readReferenceIds();
const missingFromReference = websiteIds.filter(id => !referenceIds.includes(id));
const missingFromWebsite = referenceIds.filter(id => !websiteIds.includes(id));

if (missingFromReference.length || missingFromWebsite.length) {
  if (missingFromReference.length) {
    console.error(`Missing from skill reference: ${missingFromReference.join(", ")}`);
  }
  if (missingFromWebsite.length) {
    console.error(`Missing from website incantations: ${missingFromWebsite.join(", ")}`);
  }
  process.exit(1);
}

console.log(`Incantation sync OK: ${websiteIds.length} starters represented.`);
