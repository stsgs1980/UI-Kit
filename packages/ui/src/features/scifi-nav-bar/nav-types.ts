// ─── Navigation Types & Helpers ───────────────────────────────

/** A single navigable section within a group. */
export interface NavSection {
  id: string
  label: string
}

/** A navigation group containing related sections. */
export interface NavGroup {
  id: string
  label: string
  shortLabel?: string
  sections: NavSection[]
}

/** Props shared between desktop and mobile nav variants. */
export interface NavBaseProps {
  /** Brand name shown in the logo area */
  brand: string
  /** Navigation groups with sections */
  groups: NavGroup[]
  /** Accent color. @default '#00e5ff' */
  accentColor?: string
  /** Currently active section ID */
  activeSection?: string
  /** Callback when a section is clicked */
  onNavigate?: (sectionId: string) => void
}

// ─── Helpers ──────────────────────────────────────────────────

/** Get all section IDs flattened from all groups. */
export function getAllSectionIds(groups: NavGroup[]): string[] {
  return groups.flatMap((g) => g.sections.map((s) => s.id))
}

/** Find the group ID that contains a given section. */
export function getGroupForSection(groups: NavGroup[], sectionId: string): string | undefined {
  return groups.find((g) => g.sections.some((s) => s.id === sectionId))?.id
}

/** Get the display label for a group (shortLabel or full label). */
export function getGroupLabel(group: NavGroup): string {
  return group.shortLabel ?? group.label
}

/** Collect all unique group IDs for IntersectionObserver tracking. */
export function collectTrackableIds(groups: NavGroup[]): string[] {
  return groups.flatMap((g) => g.sections.map((s) => s.id))
}
