export const resumeData = {
  header: {
    title: "LILANHUI TIMES",
    subtitle: "前端架构与AI工程化前沿探索",
    edition: "2026版",
    price: "无价",
    location: "中国 · 深圳"
  },
  hero: {
    headline: "突破边界：从底层架构到AI赋能的全栈之路",
    subheadline: "深耕大厂核心业务，聚焦 D2C (Design to Code)、低代码搭建与大模型工程化落地。",
    content: "在技术日新月异的今天，真正的工程师不仅需要扎实的底层功底，更需具备前瞻性的视野。作为腾讯的技术骨干，该开发者主导了从低代码逻辑编排到AI驱动代码生成平台的多次重大技术演进。通过对 Figma AST 的深度解析、自研状态机引擎以及融合大模型（LLM）的智能标注与推理，极大提升了团队的研发效能。不仅在技术攻坚上屡获突破（作为第一发明人拥有3项发明专利，产出35余篇技术文档），更在推动技术普及与科技向善中荣获公司级『可持续社会价值奖』与『提效之星』等殊荣。",
    author: "特约技术评论员"
  },
  education: [
    {
      school: "西安电子科技大学",
      degree: "硕士/电子与通信工程",
      date: "2019.09-2022.07"
    },
    {
      school: "西安电子科技大学",
      degree: "学士/电子信息工程",
      date: "2015.09-2019.07"
    }
  ],
  skills: [
    { category: "前端与工程化", items: "HTML/CSS/JS/TS, React/Vue全家桶，Webpack/Vite等构建工具深度优化，熟练运用设计模式" },
    { category: "AI工程应用", items: "深入理解 LLM/Agent/Prompt Engineering，丰富的D2C开发经验，Figma AST结构与API运用" },
    { category: "后端与服务端", items: "丰富的 Node.js 开发经验，熟练主导基于 NestJS/Express/Fastify 的服务端架构与开发" },
    { category: "跨端与客户端", items: "Figma插件、Chrome插件、微信小程序的独立开发与上架经验" }
  ],
  experience: [
    {
      role: "前端开发工程师",
      company: "腾讯 (Tencent)",
      date: "2022.06 - 至今",
      description: [
        "核心职责：主导设计稿解析、智能标注、逻辑编排多个核心模块开发，覆盖从技术预研、方案设计到推动落地全流程。",
        "团队贡献：作为技术负责人，先后带领多人跨职能团队，完成设计稿解析、智能标注、低代码逻辑编排等核心模块研发；沉淀技术文档35余篇，作为第一发明人共3项发明专利，有效提升团队整体技术水平。",
        "绩效与荣誉：因在推动研发效能提升方面的突出贡献，获得2025H1 OUTSTANDING 绩效、2024Q3 提效之星荣誉；业余常参加公司志愿活动，向青少年、老年人科普AI，2025年度荣获可持续社会价值奖。"
      ],
    }
  ],
  projects: [
    {
      name: "AI驱动代码生成平台",
      tech: "SSE 流式交互, LLM, Node.js (Fastify/NestJS), AST",
      role: "视觉链路负责人 / 全栈开发 (2024.06-2026.03)",
      description: [
        "为实现设计到研发流程的颠覆性提效，搭建的「视觉解析、逻辑推理、代码生成」链路的自动化平台。",
        "• 流式AI前端交互：设计并实现基于SSE的流式响应引擎与增量渲染机制，将用户感知响应时间降低70%。实现多模态输入（文本/Figma/链接等），基于哈希与URL双重校验实现去重；封装轮询调度器与状态防抖避免竞态，减少30-40%冗余请求。",
        "• 重构稿智能标注：自研评测标注系统，通过DOM归一化、Prompt调优将识别准确率从30%提升至88%；基于SoM与页面截图合并对LLM调优，实现页面分组与语义识别准确率提升至95%。基于React+Fastify开发系统，提升问题发现效率100%。",
        "• Figma设计稿解析：基于工厂模式构建AST解析内核（还原度98%），结合Winston与Promise并行将解析时长从10分优化至5秒内。精准解析自动布局并结合TailwindCSS生成响应式代码，非标设计稿智能修复还原度达87%。",
        "• 视觉检查插件：开发Figma插件保障平台输入质量。调用NestJS开发的D2C接口，通过iframe内嵌即时预览重构代码；利用DOM监听与rAF优化，实现自由拖拽调整窗口大小。"
      ],
      link: "#"
    },
    {
      name: "营销活动模版低代码平台",
      tech: "DSL 解析, AST, Commander CLI, 自定义状态机引擎",
      role: "逻辑编排负责人 / 全栈开发 (2022.09-2024.06)",
      description: [
        "为营销活动提供通用低代码模版中台，大幅提升产品、运营快速配置上线活动效率。",
        "• 逻辑编排引擎：基于工厂模式与访问者模式，实现将X6 Schema图结构转化为自研逻辑编排DSL。基于完整生命周期理念设计的DSL执行引擎，支持条件判断（AND/OR/NOT）、循环与并行等多类型状态机节点。基于Commander开发CLI工具，无缝打通Git代码操作与tsc编译，实现CI/CD自动化。",
        "• 全链路出码引擎：构建多命令CLI与Chalk分级日志，提升编译执行效率30%。落地「DSL解析-组件编译-HTML出码-COS上传-CDN发布」全链路，批量并发将单页面部署耗时从10分降至1分钟。自研本地缓存框架支持断点续跑（减少80%耗时），设计带错误追踪链的自定义异常体系，使流水线问题定位效率提升60%。"
      ],
      link: "#"
    },
    {
      name: "AI Chat Reader Chrome插件",
      tech: "Chrome Extension API, 策略模式, SSE 流式输出, fetch 拦截",
      role: "开源项目 / 独立开发 (2026.03)",
      description: [
        "用于快速浏览和导出与AI对话记录的Chrome浏览器插件，极大提升查看对话速度，减少Token浪费。",
        "• 策略模式架构：采用策略模式设计，统一接口定义，支持多 AI 网站适配，新增网站只需实现接口并注册，扩展性极强。",
        "• 无感数据获取：通过注入脚本拦截 fetch 请求，复用原始认证信息自动加载全部分页数据，实现无感获取完整对话。",
        "• 流式生成与润色：AI文档润色采用先划分章节、再逐章润色的策略。采用 SSE 流式输出实时预览生成过程，兼容任意OpenAI标准接口。"
      ],
      link: "https://chromewebstore.google.com/detail/ai-chat-reader/aiekieiegcfiblfemjcohaiemhkpienb",
      github: "https://github.com/lilililanhui/ai-chat-reader"
    }
  ],
  contact: {
    name: "lilililanhui",
    email: "lilililanhui@gmail.com",
    wechat: "ISTJ优化指南",
    github: "github.com/lilililanhui",
    linkedin: "linkedin.com/in/lilililanhui",
    twitter: "@lilanhui"
  }
};
