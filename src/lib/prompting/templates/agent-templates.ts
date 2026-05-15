/**
 * @stsgs/prompting -- 12 Agent Role Templates (API)
 * Public functions for querying agent role definitions.
 * Data lives in ./agent-templates-data.ts
 */

import type { AgentRole, IntentType } from '../core/types'
import { agentRoles } from './agent-templates-data'

// ─── Public API ──────────────────────────────────────────────

/** Get all agent roles. */
export function getAgentRoles(): AgentRole[] {
  return agentRoles
}

/** Get a specific agent role by ID. */
export function getAgentRole(id: string): AgentRole | undefined {
  return agentRoles.find(r => r.id === id)
}

/** Find the best agent role for a given intent type. */
export function getBestAgentForIntent(intent: IntentType): AgentRole {
  const ranked = agentRoles
    .map(role => ({
      role,
      score: role.bestFor.includes(intent) ? role.bestFor.filter(f => f === intent).length * 10 + 5 : 0,
    }))
    .sort((a, b) => b.score - a.score)

  return ranked[0]?.role ?? agentRoles[0]
}

/** Get the system prompt for a specific role ID. */
export function getRoleSystemPrompt(roleId: string): string | undefined {
  return agentRoles.find(r => r.id === roleId)?.systemPrompt
}

export { agentRoles }
