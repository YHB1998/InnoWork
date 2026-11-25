// 运行时配置（本地开发默认值，Docker 环境会被 entrypoint 脚本覆盖）
window.__RUNTIME_CONFIG__ = {
  MAX_FILE_SIZE_MB: 50,
  MAX_SKILL_BUNDLE_SIZE_MB: 256,
  // Optional: serve embed on a dedicated origin, e.g. 'https://embed.example.com'
  EMBED_BASE_URL: '',
  // Optional: default UI locale for first-time visitors (zh-CN | zh-TW | en-US | ru-RU | ko-KR | ja-JP)
  DEFAULT_LOCALE: '',
  // Optional: brand custom default agent id. 留空则回退内置「智能推理」。
  // Docker 部署时在 .env 里设 DEFAULT_CUSTOM_AGENT_ID=你的agentID 即可，重启前端容器生效。
  DEFAULT_CUSTOM_AGENT_ID: '',
};
