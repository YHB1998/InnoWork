import {
  BUILTIN_QUICK_ANSWER_ID,
  BUILTIN_SMART_REASONING_ID,
} from '@/api/agent'

/** Whether the selected agent id is the builtin quick-answer (RAG) mode. */
export function isQuickAnswerAgentId(agentId: string | null | undefined): boolean {
  return (agentId || BUILTIN_QUICK_ANSWER_ID) === BUILTIN_QUICK_ANSWER_ID
}

/** Whether requests should use the Agent stream pipeline (not quick-answer RAG). */
export function isAgentStreamAgentId(
  agentId: string | null | undefined,
  isAgentEnabled: boolean,
): boolean {
  const id = agentId || BUILTIN_SMART_REASONING_ID
  if (id === BUILTIN_QUICK_ANSWER_ID) return false
  if (id === BUILTIN_SMART_REASONING_ID) return true
  return isAgentEnabled
}

/**
 * Stream mode a selected custom agent's config requires, or null when the id
 * already decides the mode (both builtins) or its config is unavailable.
 *
 * `agent_mode` is editable in the agent editor and is what the backend uses to
 * pick the pipeline, so it has to win over `isAgentEnabled`, which only records
 * the mode at the moment the agent was selected. Without this, changing an
 * agent from quick-answer to smart-reasoning keeps sending /knowledge-chat
 * until the user reselects the agent (#4803).
 */
export function customAgentStreamMode(
  agentId: string | null | undefined,
  config: { agent_mode?: string } | null | undefined,
): boolean | null {
  const id = agentId || BUILTIN_SMART_REASONING_ID
  if (id === BUILTIN_QUICK_ANSWER_ID || id === BUILTIN_SMART_REASONING_ID) return null
  if (!config) return null
  return config.agent_mode === 'smart-reasoning'
}

/** Reconcile builtin agent id with isAgentEnabled after localStorage reload. */
export function reconcileBuiltinAgentMode(settings: {
  selectedAgentId?: string
  isAgentEnabled: boolean
}): boolean {
  const agentId = settings.selectedAgentId || BUILTIN_SMART_REASONING_ID
  if (agentId === BUILTIN_QUICK_ANSWER_ID && settings.isAgentEnabled) {
    settings.isAgentEnabled = false
    return true
  }
  if (agentId === BUILTIN_SMART_REASONING_ID && !settings.isAgentEnabled) {
    settings.isAgentEnabled = true
    return true
  }
  return false
}

/**
 * 解析"对话页面默认智能体"的 fallback 值。
 * 优先级链：
 *   1. 运行时 window.__RUNTIME_CONFIG__.DEFAULT_CUSTOM_AGENT_ID（Docker 可动态改，重启容器生效）
 *   2. 构建时 import.meta.env.VITE_DEFAULT_CUSTOM_AGENT_ID（Vite build 时注入）
 *   3. 内置智能推理 BUILTIN_SMART_REASONING_ID（兜底）
 *
 * 运行时若返回的 agent 在当前空间不可用（被停用或根本不存在），
 * ensureSelectedAgentNotDisabled 会自动纠偏回 BUILTIN_SMART_REASONING_ID，
 * 此处无需关心可用性检查。
 */
export function resolveFallbackAgentId(): string {
  const runtimeConfig = (typeof window !== 'undefined')
    ? (window as Window & { __RUNTIME_CONFIG__?: Record<string, unknown> }).__RUNTIME_CONFIG__
    : undefined
  const runtime = typeof runtimeConfig?.DEFAULT_CUSTOM_AGENT_ID === 'string'
    ? runtimeConfig.DEFAULT_CUSTOM_AGENT_ID.trim()
    : ''
  if (runtime) return runtime
  const build = (import.meta.env.VITE_DEFAULT_CUSTOM_AGENT_ID as string | undefined)?.trim() || ''
  if (build) return build
  return BUILTIN_SMART_REASONING_ID
}
