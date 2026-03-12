// Mock 响应数据 - 等后端开发完成后替换为真实 API
const mockResponses: Record<string, string> = {
  "介绍一下自己": `我是 lilililanhui，一名充满热情的前端 & AI 工程师！🚀

我专注于前端开发和 AI 应用，热爱探索新技术，致力于打造优雅且实用的产品体验。

平时喜欢研究各种有趣的技术，把复杂的想法变成现实。如果你对我的项目或技术栈感兴趣，欢迎继续问我！`,

  "做过哪些项目？": `我参与过多个有趣的项目，这里举几个例子：

📱 **AI 应用开发** - 结合大语言模型开发智能应用，提升用户体验

🎨 **前端工程实践** - 负责多个 Web 应用的前端架构设计和开发

🔧 **效率工具** - 开发过一些提升工作效率的小工具

如果你想了解某个具体项目的细节，可以告诉我！`,

  "专业技能有哪些？": `我的专业技能主要包括：

**前端与工程化**
- 熟悉HTML/CSS/JS/TS，React/Vue全家桶及响应式开发。
- 深入理解 Webpack/Vite等构建工具，有从零搭建工程化体系及进行深度性能优化的实践经验。
- 熟练掌握常见设计模式，并能在项目中灵活应用以提升代码质量。

**AI工程应用**
- 有 AI 应用开发经验，深入理解 LLM/Agent/Prompt Engineering 等核心概念。
- 有丰富的 D2C（设计到代码）开发经验，熟悉Figma AST数据结构，熟练运用Figma API进行开发。

**后端与服务端**
- 具备丰富的 Node.js 服务端开发经验，主导过基于NestJS/Express/Fastify的项目架构与开发。

**跨端与客户端开发**
有Figma插件、Chrome插件、微信小程序的独立开发与上架经验。

我始终保持学习，不断拓展技术边界！`,

  "如何联系你？": `你可以通过以下方式联系我：

📧 **邮箱** - 点击页面上的邮箱图标即可

💬 **微信公众号** - 鼠标悬停在微信图标上可以看到二维码

🐙 **GitHub** - 点击 GitHub 图标查看我的开源项目

期待与你交流！`,
};

// 模拟网络延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 简单的关键词匹配
function findBestMatch(query: string): string {
  const lowerQuery = query.toLowerCase();

  // 关键词映射
  const keywordMap: Record<string, string[]> = {
    "介绍一下自己": ["介绍", "自己", "你是谁", "who", "about"],
    "做过哪些项目？": ["项目", "做过", "作品", "project", "work"],
    "专业技能有哪些？": ["专业技能","技术", "技术栈", "会什么", "tech", "stack", "skill"],
    "如何联系你？": ["联系", "contact", "邮箱", "微信", "github"],
  };

  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((kw) => lowerQuery.includes(kw))) {
      return mockResponses[key];
    }
  }

  // 默认回复
  return `感谢你的提问！🤔

这是一个很好的问题。目前我是 Mock 模式，只能回答一些预设的问题。

你可以试试问我：
• 介绍一下自己
• 做过哪些项目？
• 专业技能有哪些？
• 如何联系你？

等后端服务上线后，我就能回答更多问题啦！`;
}

/**
 * 发送消息到聊天服务
 * TODO: 后端开发完成后，替换为真实 API 调用
 */
export async function sendMessage(message: string): Promise<string> {
  // 模拟网络请求延迟
  await delay(800 + Math.random() * 700);

  // 返回 Mock 响应
  return findBestMatch(message);
}

/**
 * 真实 API 调用（预留）
 * 等后端开发完成后取消注释并使用
 */
// export async function sendMessageReal(message: string): Promise<string> {
//   const API_URL = 'https://your-backend-api.com/chat';
//   
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ message }),
//   });
//   
//   if (!response.ok) {
//     throw new Error('Chat API request failed');
//   }
//   
//   const data = await response.json();
//   return data.reply;
// }
