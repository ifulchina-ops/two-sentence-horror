// Two-Sentence Horror — make.fun entry (program/v1, Node 22).
// Writes exactly one horror story of exactly two sentences to /output/entry.txt.
// The story is a fixed, hand-written text: deterministic by design, with no
// I/O besides the single output write, no network, no randomness, no model call.
//
// Craft notes (judge brief: second sentence must turn the first; horror implied,
// not explained; precise and concrete; original, not a familiar twist):
//   - Sentence 1 sets a domestic, almost sweet scene: a pet parrot picks up a name.
//   - Sentence 2 reveals the girl has been dead three years and no one in the
//     house has spoken her name since her funeral — so the bird must be hearing
//     it from something in the house. The dread is never named; the reader
//     supplies it. No gore, no mirror, no "it was me all along".
import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "Our parrot learned to say my daughter's name last week, and it has not stopped repeating it since. " +
  "My daughter died three years ago, and no one in this house has spoken her name since her funeral.";

function sentenceCount(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0).length;
}

const story = STORY.trim();
if (story.length < 1 || story.length > 400) {
  throw new Error(`story must be 1-400 characters, got ${story.length}`);
}
if (sentenceCount(story) !== 2) {
  throw new Error(`story must be exactly two sentences, got ${sentenceCount(story)}`);
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", story, "utf8");
console.log(`wrote /output/entry.txt (${story.length} chars, 2 sentences)`);
