export type Locale = "en" | "zh";

export type Copy = {
  nav: string[];
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    body: string;
    enter: string;
    manifesto: string;
  };
  chapters: Array<{
    kicker: string;
    title: string;
    body: string;
  }>;
  protocol: Array<{ title: string; body: string }>;
  nodes: Array<{ label: string; type: string; detail: string }>;
  ecosystem: {
    title: string;
    body: string;
    network: string[];
    intelligence: string[];
    shared: string[];
    reality: string[];
  };
  roles: Array<{ title: string; body: string }>;
  trust: string[];
  horizon: string[];
  footer: string;
};

export const copy: Record<Locale, Copy> = {
  en: {
    nav: ["Condition", "Protocol", "Network", "Ecosystem", "Participation", "Horizon"],
    hero: {
      eyebrow: "WAOC / CONNECTED INTELLIGENCE",
      line1: "Connection",
      line2: "becomes",
      line3: "coordination.",
      body: "WAOC is the living coordination network where people, AI agents, organizations, knowledge and missions connect to create verifiable real-world value.",
      enter: "Enter the network",
      manifesto: "Read the manifesto"
    },
    chapters: [
      {
        kicker: "01 / THE CONDITION",
        title: "Intelligence is expanding. Coordination is not.",
        body: "People, knowledge, organizations and AI systems are multiplying faster than the trust, memory and protocols needed to connect them. Fragmentation creates friction. Connection creates possibility."
      },
      {
        kicker: "02 / THE PROTOCOL",
        title: "A network needs more than access. It needs a repeatable way to coordinate.",
        body: "WAOC turns signals into shared understanding, missions, action, evidence, memory and durable reputation."
      },
      {
        kicker: "03 / THE LIVING NETWORK",
        title: "Every participant changes the shape of the network.",
        body: "Explore the relationships between people, AI agents, missions, knowledge, organizations, proof, memory and reputation."
      },
      {
        kicker: "04 / THE ECOSYSTEM",
        title: "The network and the intelligence infrastructure are different by design.",
        body: "WAOC builds participation, mission and trust. OneAI Labs builds models, capability, agents and execution. Shared memory, proof and identity connect both sides."
      },
      {
        kicker: "05 / PARTICIPATION",
        title: "You are not joining an audience. You are entering a network.",
        body: "Different roles create different forms of value, but every meaningful contribution should be visible, verifiable and remembered."
      },
      {
        kicker: "06 / THE HORIZON",
        title: "The future belongs to connected intelligence.",
        body: "Not isolated models. Not disconnected organizations. Intelligence that can connect, remember, coordinate and contribute across the real world."
      }
    ],
    protocol: [
      { title: "Signal", body: "Detect a need, opportunity or unresolved condition." },
      { title: "Knowledge", body: "Turn signals into shared understanding and context." },
      { title: "Mission", body: "Convert intent into a scoped, accountable objective." },
      { title: "Action", body: "Coordinate people and agents around execution." },
      { title: "Proof", body: "Capture verifiable evidence of outcomes." },
      { title: "Memory", body: "Preserve decisions, evidence and learning." },
      { title: "Reputation", body: "Build a durable identity from verified contribution." },
      { title: "Opportunity", body: "Create new missions, access and connections." }
    ],
    nodes: [
      { label: "People", type: "human", detail: "Builders, creators, researchers and community participants." },
      { label: "AI Agents", type: "ai", detail: "Intelligent participants that plan, assist and act within governed boundaries." },
      { label: "Missions", type: "mission", detail: "Shared objectives that turn intent into coordinated execution." },
      { label: "Knowledge", type: "knowledge", detail: "Context, research and learning available to the network." },
      { label: "Organizations", type: "org", detail: "Teams and institutions that contribute resources and real-world problems." },
      { label: "Proof", type: "proof", detail: "Evidence that makes outcomes inspectable and accountable." },
      { label: "Memory", type: "memory", detail: "The continuity layer for decisions, relationships and learning." },
      { label: "Reputation", type: "reputation", detail: "Trust accumulated through verified contribution, not attention." }
    ],
    ecosystem: {
      title: "WAOC builds the network. OneAI Labs builds the intelligence infrastructure.",
      body: "Together they form one ecosystem with clear responsibilities and a shared memory, proof and identity layer.",
      network: ["WAOC Community", "OneMission", "Participation", "Trust"],
      intelligence: ["OneAI Core", "OneForge", "TheOne", "OneClaw"],
      shared: ["OneField", "Proof", "Identity", "Reputation"],
      reality: ["Creative AI", "Enterprise AI", "Construction", "Research", "Physical AI"]
    },
    roles: [
      { title: "Builder", body: "Shape products, missions and the operating network itself." },
      { title: "Developer", body: "Build agents, APIs and connected intelligence workflows." },
      { title: "Researcher", body: "Advance the theory and practice of coordination and AI." },
      { title: "Creator", body: "Turn ideas, culture and stories into shared meaning." },
      { title: "Organization", body: "Bring real problems, resources and mission opportunities." },
      { title: "Partner", body: "Connect markets, technology, capital, education or industry." }
    ],
    trust: ["Contribution", "Evidence", "Verification", "Memory", "Reputation", "Access"],
    horizon: ["Human collaboration", "Human + AI coordination", "Agent networks", "Intelligent organizations", "Human-agent-robot missions", "Connected intelligence"],
    footer: "The future is not built by isolated intelligence. It is built by connection."
  },
  zh: {
    nav: ["现状", "协议", "网络", "生态", "参与", "未来"],
    hero: {
      eyebrow: "WAOC / 连接智能",
      line1: "让连接",
      line2: "成为",
      line3: "协同。",
      body: "WAOC 是一个持续运行的协作网络，让人类、AI Agent、组织、知识与使命相互连接，并创造可验证的现实价值。",
      enter: "进入网络",
      manifesto: "阅读连接宣言"
    },
    chapters: [
      {
        kicker: "01 / 现状",
        title: "智能正在扩张，协同能力却没有同步增长。",
        body: "人、知识、组织与 AI 系统的增长速度，已经超过信任、记忆与协作协议的建设速度。碎片化制造摩擦，连接创造可能。"
      },
      {
        kicker: "02 / 协作协议",
        title: "一个网络需要的不只是入口，而是一套可重复的协作方式。",
        body: "WAOC 将信号转化为共同理解、使命、行动、证明、记忆和长期声誉。"
      },
      {
        kicker: "03 / 活体网络",
        title: "每一个参与者，都会改变网络的形状。",
        body: "探索人、AI Agent、使命、知识、组织、证明、记忆与声誉之间的关系。"
      },
      {
        kicker: "04 / 生态",
        title: "协作网络与智能基础设施，被有意设计为不同层。",
        body: "WAOC 负责参与、使命与信任；OneAI Labs 负责模型、能力、Agent 与执行；共享记忆、证明与身份连接两侧。"
      },
      {
        kicker: "05 / 参与",
        title: "你不是加入观众席，而是进入一个网络。",
        body: "不同角色创造不同形式的价值，但每一项有意义的贡献都应当可见、可验证并被长期记住。"
      },
      {
        kicker: "06 / 未来",
        title: "未来属于连接智能。",
        body: "不是孤立的模型，也不是彼此割裂的组织，而是能够在现实世界中连接、记忆、协同并持续贡献的智能。"
      }
    ],
    protocol: [
      { title: "信号", body: "发现需求、机会或尚未解决的现实问题。" },
      { title: "知识", body: "将信号转化为共同理解与上下文。" },
      { title: "使命", body: "将意图转化为有边界、可负责的目标。" },
      { title: "行动", body: "协调人类与 Agent 共同执行。" },
      { title: "证明", body: "记录可验证的结果证据。" },
      { title: "记忆", body: "保存决策、证据与经验。" },
      { title: "声誉", body: "从经过验证的贡献中形成长期可信身份。" },
      { title: "机会", body: "产生新的使命、访问权限与连接。" }
    ],
    nodes: [
      { label: "人", type: "human", detail: "建设者、创作者、研究者与社区参与者。" },
      { label: "AI Agent", type: "ai", detail: "在治理边界内规划、辅助并执行的智能参与者。" },
      { label: "使命", type: "mission", detail: "把意图转化为协同行动的共同目标。" },
      { label: "知识", type: "knowledge", detail: "网络可共享的上下文、研究与学习成果。" },
      { label: "组织", type: "org", detail: "提供资源、团队与现实问题的机构。" },
      { label: "证明", type: "proof", detail: "让结果可以被检查、验证与追责的证据。" },
      { label: "记忆", type: "memory", detail: "保存决策、关系与学习的连续性层。" },
      { label: "声誉", type: "reputation", detail: "由可验证贡献积累的信任，而不是注意力。" }
    ],
    ecosystem: {
      title: "WAOC 构建协作网络，OneAI Labs 构建智能基础设施。",
      body: "二者以清晰职责和共享的记忆、证明与身份层，共同形成一个完整生态。",
      network: ["WAOC 社区", "OneMission", "参与网络", "信任"],
      intelligence: ["OneAI Core", "OneForge", "TheOne", "OneClaw"],
      shared: ["OneField", "证明", "身份", "声誉"],
      reality: ["创意 AI", "企业 AI", "建筑", "研究", "物理 AI"]
    },
    roles: [
      { title: "建设者", body: "参与产品、使命与协作网络本身的建设。" },
      { title: "开发者", body: "构建 Agent、API 与连接智能工作流。" },
      { title: "研究者", body: "推进协同网络与 AI 的理论和实践。" },
      { title: "创作者", body: "把思想、文化与故事转化为共享意义。" },
      { title: "组织", body: "带来真实问题、资源与使命机会。" },
      { title: "合作伙伴", body: "连接市场、技术、资本、教育或行业资源。" }
    ],
    trust: ["贡献", "证据", "验证", "记忆", "声誉", "访问"],
    horizon: ["人类协作", "人机协同", "Agent 网络", "智能组织", "人类—Agent—机器人使命", "连接智能"],
    footer: "未来不是由孤立智能构建，而是由连接构建。"
  }
};
