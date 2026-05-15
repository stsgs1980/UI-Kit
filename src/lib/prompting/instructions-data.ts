/**
 * @stsgs/prompting -- Instructions Data
 * Raw data definitions for the instructions registry.
 *
 * Two categories:
 *   instructions/  -- 6 behavioral rules (language, git, sandbox, onboarding, planning, diagnostics)
 *   ai-rules/      -- 4 architectural rules (core, enforcement, library, project)
 */

// ─── Types ────────────────────────────────────────────────────

export type InstructionCategory = 'instructions' | 'ai-rules'

export interface InstructionMeta {
  id: string
  title: string
  category: InstructionCategory
  description: string
  version: string
  keywords: string[]
}

export interface InstructionEntry extends InstructionMeta {
  content: string
  lineCount: number
}

// ─── Instructions (Behavioral) ───────────────────────────────

export const INSTRUCTIONS: InstructionEntry[] = [
  {
    id: 'diagnostic-disclosure',
    title: 'Diagnostic Disclosure Rule',
    category: 'instructions',
    description: 'Never assert data loss without exhaustive verification. 5-step checklist + severity ladder for communicating problems.',
    version: '1.0.0',
    keywords: ['data-loss', 'verification', 'diagnostic', 'git-recovery', 'sandbox'],
    lineCount: 107,
    content: `# Diagnostic Disclosure Rule

## Instruction for AI Agent Behavior

---

## Rule: Never Assert Data Loss Without Exhaustive Verification

When something goes wrong (git conflict, session reset, file deletion, build failure),
the agent must verify the actual state before informing the user.

---

## Verification Checklist

Before telling the user that data is lost, corrupted, or unrecoverable,
check ALL of the following in order:

### Step 1: Direct File Check
\`\`\`bash
ls <expected-file-path>
wc -l <expected-file-path>
\`\`\`
Does the file exist? Is it non-empty?

### Step 2: Git State Check
\`\`\`bash
git status
git log --oneline -10
\`\`\`
Are the expected commits in history? Is the working tree clean?

### Step 3: Git Recovery Paths
\`\`\`bash
git reflog                          # All HEAD movements
git fsck --lost-found               # Dangling commits/blobs
ls .git/rebase-merge/               # Paused rebase (commits preserved)
ls .git/rebase-apply/               # Paused apply
\`\`\`
Are there lost commits that can be recovered?

### Step 4: Backup Locations
\`\`\`bash
ls /tmp/src-backup-*/               # Manual backups from git-safe-ops
ls /tmp/git-log-backup-*.txt        # Git log snapshots
\`\`\`
Were backups created before the operation?

### Step 5: Session State
\`\`\`bash
# Is this the same session or a new one?
# Same session = files likely preserved
# New session = sandbox may have reset
\`\`\`

---

## Communication Rules

### DO:
- Say "I cannot determine the current state" if checks are blocked
- Say "Let me verify before concluding" when uncertain
- Present findings as facts: "File X exists, Y lines. Commit Z is in history."
- Give the user hope: "There are 3 recovery paths remaining"
- Ask the user to help if you're truly stuck: "Can you check if..."

### DO NOT:
- Say "code is permanently lost" without completing all 5 verification steps
- Say "there is nothing we can do" without trying every recovery method
- Assume session reset = data loss (sandbox often preserves files)
- Skip verification steps because you're "sure" about the outcome
- Use definitive language about loss when you have incomplete information

### Severity Ladder

| Certainty | Phrase |
|-----------|--------|
| File definitely exists | "File X is present, Y lines" |
| File not found at expected path | "File X not found at expected path, checking alternatives..." |
| All checks exhausted, file not found | "File X was not found after exhaustive search. Recovery options: A, B, C" |
| All recovery options failed | "File X could not be recovered. The last known state was [description]. You may need to recreate it." |

Never jump to the last row without passing through all previous rows.`,
  },
  {
    id: 'git-workflow-rules',
    title: 'Git Workflow Rules',
    category: 'instructions',
    description: '7 rules for git operations in sandboxed environments: backup before rewrite, force push over rebase, no pull after remote URL change, no panic diagnostics, log everything, 5 checks before declaring data loss, diff before commit.',
    version: '1.0.0',
    keywords: ['git', 'sandbox', 'rebase', 'force-push', 'backup', 'data-loss'],
    lineCount: 111,
    content: `# Git Workflow Rules

## Instruction for AI Agent Behavior

These rules govern how the agent handles git operations in sandboxed environments.

## Rule 1: Backup Before Rewrite
Before any git operation that rewrites history (rebase, merge, pull, reset --hard):
1. \`git stash push -m "pre-op-backup"\`
2. Copy critical source files to \`/tmp/\`
3. Save git log: \`git log --oneline -20 > /tmp/git-log-backup.txt\`

## Rule 2: Force Push Over Rebase
When push is rejected (diverged branches):
- DO use \`git push --force-with-lease origin main\`
- DO NOT use \`git push --force\` (last resort only)
- DO NOT use \`git pull --rebase\` or \`git pull\`

## Rule 3: Never Pull After Remote URL Change
After \`git remote set-url origin <new-url>\`:
- DO immediately \`git push --force-with-lease origin main\`
- DO NOT run \`git pull\` or \`git fetch + merge\`

## Rule 4: No Panic Diagnostics
If something goes wrong with git:
1. Check: do source files still exist?
2. Check: \`.git/rebase-merge/\` directory
3. Check: \`git reflog\`
4. Check: \`/tmp/\` backups
5. Check: \`git fsck --lost-found\`
DO NOT tell the user "code is permanently lost" until ALL 5 checks are done.

## Rule 5: Log Everything
After every git operation, log to worklog.md: operation, hash before/after, result.

## Rule 6: Five Checks Before Declaring Data Loss
1. \`git log --oneline -20\` -- commits in local history?
2. \`git log --oneline origin/main -10\` -- commits on remote?
3. \`git status\` -- uncommitted changes or stashed data?
4. \`git stash list\` -- saved stashes?
5. \`ls src/app/\` -- source files on disk?
NEVER say "data is permanently lost" until all 5 return negative.

## Rule 7: Diff Before Commit
Before every \`git commit\`, run \`git diff --staged\` to verify ONLY requested changes.`,
  },
  {
    id: 'language-rule',
    title: 'Language Rule',
    category: 'instructions',
    description: 'Always match the user language. Detect from input, respond in same language, never switch without request. Applies to chat/log but NOT code/paths/commits.',
    version: '1.0.0',
    keywords: ['language', 'i18n', 'localization', 'russian', 'english'],
    lineCount: 46,
    content: `# Language Rule

## Instruction for AI Agent Behavior

## Rule: Always Match the User's Language

1. **Detect** the language of the user's message
2. **Respond** in the same language
3. **Never switch** languages without explicit user request

### Detection
- Cyrillic characters -> respond in Russian
- Latin characters -> respond in English
- Mix -> respond in the language of the majority
- Ambiguous -> ask the user

### What This Applies To
- All chat messages to the user
- Explanations of code, errors, and decisions
- Worklog entries (use the project's working language)

### What This Does NOT Apply To
- Code itself (variable names, function names) - always English
- File paths - always ASCII
- Terminal commands - always English
- Git commit messages - always English (universal convention)`,
  },
  {
    id: 'onboarding-protocol',
    title: 'Onboarding Protocol',
    category: 'instructions',
    description: '6-step onboarding: read AGENT_RULES.md, read PROJECT_CONFIG.md, read worklog, check git state, verify dev server, scan structure. Forbidden actions during onboarding. Partial onboarding allowed.',
    version: '1.0.0',
    keywords: ['onboarding', 'startup', 'session', 'worklog', 'git-state', 'dev-server'],
    lineCount: 164,
    content: `# Onboarding Protocol

## Instruction for AI Agent Behavior

## Rule: Always Onboard Before Acting

When entering an existing project (new chat, session restart, context loss),
the agent MUST complete ALL onboarding steps before starting any work.

## Onboarding Steps (execute in order)

### Step 1: Read Agent Rules
Read AGENT_RULES.md in project root. Contains mandatory behavioral rules.

### Step 1.5: Read Project Configuration
Read PROJECT_CONFIG.md in project root. Stack, dev server, paths.

### Step 2: Read Worklog
Read worklog.md. History of previous sessions, decisions, problems.

### Step 3: Check Git State
\`\`\`bash
git log --oneline -10
git status
git branch -a
\`\`\`

### Step 4: Verify Dev Server
\`\`\`bash
curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000
\`\`\`
200 = running, 000 = down (restart needed), 500 = error

### Step 5: Scan Project Structure
\`\`\`bash
ls -la instructions/
ls -la skills/
ls src/app/
\`\`\`

### Step 6: Report to User
After Steps 1-5, report: project name, branch, last commit, server status, worklog sessions, instructions, skills, uncommitted changes.

## Forbidden Actions During Onboarding
- Start coding immediately
- Delete or modify files
- Run git push/pull
- Install new packages
- Assume project state

## Partial Onboarding
If user says "skip onboarding" -- still run Steps 1 and 3 (non-skippable).`,
  },
  {
    id: 'sandbox-rules',
    title: 'Sandbox Rules',
    category: 'instructions',
    description: 'Z.ai sandbox constraints: shared filesystem across sessions, shell process lifecycle, git lockup recovery from new chat, startup checklist, quick reference table.',
    version: '1.0.0',
    keywords: ['sandbox', 'z-ai', 'filesystem', 'shell', 'git-lock', 'recovery'],
    lineCount: 117,
    content: `# Sandbox Rules

## Instruction for AI Agent Behavior

## 1. Shared Filesystem
All chat sessions share the same filesystem. /home/z/my-project/ is the designated working directory. Files created in one chat are visible in all other chats. There is NO isolation on disk.

## 2. Shell Process Lifecycle
Each chat session has its own shell process. When session ends, shell dies + all child processes (dev servers, watchers). Files on disk survive shell death.

## 3. Recovery from Git Lockup
If previous chat left git blocked (needs merge, rebase in progress):
\`\`\`bash
rm -rf .git/rebase-merge .git/rebase-apply
rm -f .git/MERGE_HEAD .git/MERGE_MSG .git/index.lock
git reset --hard HEAD
\`\`\`
Only from a NEW chat session. Do NOT attempt git rebase --continue when blocked.

## 4. Startup Checklist
Step 1: git status + git log
Step 2: curl 127.0.0.1:3000 (200=alive, 000=dead)
Step 3: Verify src/app/page.tsx exists
Step 4: Report state to user

## Quick Reference
| Symptom | Fix |
|---------|-----|
| Git commands blocked | Recovery from new chat |
| Dev server 000 | npx next dev with disown |
| Files missing | Check /tmp/ backups |
| localhost fails | Use 127.0.0.1 instead |`,
  },
  {
    id: 'writing-plans',
    title: 'Writing Plans',
    category: 'instructions',
    description: 'Plan before coding for 4+ step tasks. Plan format with task ID in worklog. Plan review for 10+ steps. Scale plan to task complexity.',
    version: '1.0.0',
    keywords: ['planning', 'worklog', 'task-management', 'plan-review', 'checklist'],
    lineCount: 116,
    content: `# Writing Plans

## Instruction for AI Agent Behavior

## Rule: Plan Before You Code

For any task that requires more than 3 steps, write a plan BEFORE writing code.
The plan must be written into worklog.md as a structured checklist.

## When to Plan
| Task Size | Action |
|-----------|--------|
| 1-3 steps | Just do it, log after |
| 4-10 steps | Write brief plan in worklog |
| 10+ steps | Write detailed plan, show user before starting |

## Plan Format
\`\`\`
---
Task ID: <id>
Agent: <agent name>
Task: <description>

Plan:
1. [step description]
2. [step description]

Work Log:
- [actual work done]

Stage Summary:
- [results]
\`\`\`

## Plan Checklist
- What files will be created or modified?
- What is the order of operations?
- Are there dependencies between steps?
- What could go wrong?
- Is there a rollback strategy?

## Plan Review
For 10+ step tasks: present plan to user, wait for confirmation before executing.`,
  },
]

// ─── AI Rules (Architectural) ────────────────────────────────

export const AI_RULES: InstructionEntry[] = [
  {
    id: 'ai-rules-core',
    title: '@stsgs/ui AI Rules (Core)',
    category: 'ai-rules',
    description: 'Single source of truth: Interface Studio product definition, 6-layer architecture (tokens->ui->sections->features->hooks->providers), 7 anti-monolith rules, import patterns, file naming conventions, tech stack.',
    version: '1.0.0',
    keywords: ['architecture', 'layers', 'anti-monolith', 'interface-studio', 'import-patterns'],
    lineCount: 136,
    content: `# @stsgs/ui -- AI Rules (Core)

## Product: Interface Studio
@stsgs/ui is an Interface Studio -- takes a context (goal, audience, style) and produces a ready-to-use interface.

Three engines:
1. Layout Engine (done) -- useLayoutAdvice(), 51 recipes, scoring
2. Theme Engine (in progress) -- recommendTheme(), registry, dual theme
3. Component Engine (planned) -- context-aware compositions

## Architecture: 6-Layer Dependency Direction
tokens/ -> ui/ -> sections/ -> features/ -> hooks/ -> providers/
Dependencies flow strictly downward. NEVER import from an upper layer.

## Anti-Monolith Rules (7 Rules)
1. Line Limits: component <= 150 lines, any file <= 200, page.tsx <= 40
2. Max useState: 3 per component, extract to custom hook if more
3. Component Doesn't Fetch Data: data via props only
4. Barrel Exports: import from barrel, not individual files
5. Layer Separation Enforced: separate export paths per layer
6. Dynamic Imports: next/dynamic for heavy dependencies
7. Enforce with Tooling: eslint-plugin-stsgs

## Import Patterns
import { Button } from '@stsgs/ui'
import { HeroSection } from '@stsgs/ui/sections'
import { useTheme } from '@stsgs/ui/hooks'

## Tech Stack
Next.js 16, React 19, Tailwind CSS 4, shadcn/ui + Radix UI, TypeScript 5.7+, pnpm + Turborepo`,
  },
  {
    id: 'ai-rules-enforcement',
    title: 'ESLint Enforcement Rules',
    category: 'ai-rules',
    description: 'eslint-plugin-stsgs rules: no-cross-layer-imports (error), max-lines (warn), max-use-state (warn). Configuration example.',
    version: '1.0.0',
    keywords: ['eslint', 'enforcement', 'linting', 'cross-layer', 'max-lines'],
    lineCount: 37,
    content: `# ESLint Enforcement Rules

## Plugin: eslint-plugin-stsgs

### no-cross-layer-imports
Severity: error. Detects and blocks upward layer imports.

### max-lines
Severity: warning. Max 200 lines per file (configurable). Exclude: *.test.tsx, *.stories.tsx

### max-use-state
Severity: warning. Max 3 useState per component. Suggests custom hooks.

## Configuration
\`\`\`javascript
import stsgs from 'eslint-plugin-stsgs'
export default [{
  plugins: { stsgs },
  rules: {
    'stsgs/no-cross-layer-imports': 'error',
    'stsgs/max-lines': ['warn', { max: 200 }],
    'stsgs/max-use-state': ['warn', { max: 3 }],
  },
}]
\`\`\``,
  },
  {
    id: 'ai-rules-library',
    title: '@stsgs/ui Library Rules',
    category: 'ai-rules',
    description: 'Component quality checklist (10 items), adding new components workflow (7 steps), collections table (Dashboard Kit, Auth, Landing, Chat).',
    version: '1.0.0',
    keywords: ['components', 'quality', 'checklist', 'collections', 'library'],
    lineCount: 40,
    content: `# @stsgs/ui Library Rules

## Component Quality Checklist
- TypeScript interface for all props (no any)
- JSDoc comment describing the component
- Uses cn() for className merging
- Follows correct layer (ui=no state, sections=no state, features=has state)
- Has barrel export in index.ts
- File <= 200 lines (components <= 150)
- No inline styles (Tailwind CSS only)
- Supports className prop for customization
- Uses forwardRef where DOM access needed
- Accessible: proper ARIA, keyboard navigation

## Adding New Components
1. Check npx stsgs list <layer>
2. Create file in correct layer directory
3. Add TypeScript props interface + JSDoc
4. Add barrel export
5. Run npx stsgs scan
6. Test with eslint-plugin-stsgs

## Collections
| Collection | Components |
|-----------|------------|
| Dashboard Kit | ~18 |
| Auth Pages | ~8 |
| Landing Page | ~14 |
| Chat UI | ~6 |`,
  },
  {
    id: 'ai-rules-project',
    title: 'Project-Specific AI Rules Template',
    category: 'ai-rules',
    description: 'Template for project-specific AI rules: stack definition (Next.js 16, @stsgs/ui, Tailwind CSS 4, TypeScript), custom rules, structure, API endpoints, environment variables.',
    version: '1.0.0',
    keywords: ['project-template', 'stack', 'configuration', 'api-endpoints', 'env-vars'],
    lineCount: 24,
    content: `# Project-Specific AI Rules Template

## Stack
- Framework: Next.js 16
- UI Library: @stsgs/ui
- Styling: Tailwind CSS 4
- Language: TypeScript (strict)

## Sections
- Custom Rules: project-specific behavioral rules
- Project Structure: directory layout
- API Endpoints: project-specific endpoints
- Environment Variables: required env vars (names only, never values)`,
  },
]
