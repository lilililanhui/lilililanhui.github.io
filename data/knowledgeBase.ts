import { resumeData } from './resume';

// 知识库类型定义
export interface KnowledgeBase {
  personal: {
    name: string;
    title: string;
    location: string;
    introduction: string;
  };
  skills: Array<{
    category: string;
    items: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    date: string;
  }>;
  workExperience: Array<{
    role: string;
    company: string;
    date: string;
    description: string[];
  }>;
  projects: Array<{
    name: string;
    tech: string;
    role: string;
    description: string[];
    link?: string;
    github?: string;
  }>;
  contact: {
    email: string;
    wechat: string;
    github: string;
  };
  // 文章库（后续扩展）
  articles: Array<{
    title: string;
    summary: string;
    link?: string;
    date?: string;
    tags?: string[];
  }>;
  // 常见问答（后续扩展）
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

// 从 resumeData 构建知识库
export const knowledgeBase: KnowledgeBase = {
  personal: {
    name: resumeData.contact.name,
    title: '前端开发工程师 & AI工程师',
    location: resumeData.header.location,
    introduction: resumeData.hero.content,
  },
  skills: resumeData.skills,
  education: resumeData.education,
  workExperience: resumeData.experience,
  projects: resumeData.projects,
  contact: {
    email: resumeData.contact.email,
    wechat: resumeData.contact.wechat,
    github: resumeData.contact.github,
  },
  // 文章库 - 后续可在此添加公众号文章摘要
  articles: [
    // 示例格式：
    // {
    //   title: '文章标题',
    //   summary: '文章摘要...',
    //   link: 'https://mp.weixin.qq.com/...',
    //   date: '2025-01-01',
    //   tags: ['前端', 'AI']
    // }
  ],
  // 常见问答 - 后续可添加更多 FAQ
  faq: [
    // 示例格式：
    // {
    //   question: '你擅长什么技术？',
    //   answer: '我擅长前端开发、AI应用开发...'
    // }
  ],
};

/**
 * 将知识库转化为文本上下文，用于注入 System Prompt
 */
export function buildKnowledgeContext(): string {
  const kb = knowledgeBase;
  
  const sections: string[] = [];
  
  // 个人信息
  sections.push(`## 个人信息
- 姓名：${kb.personal.name}
- 职位：${kb.personal.title}
- 地点：${kb.personal.location}
- 简介：${kb.personal.introduction}`);

  // 专业技能
  sections.push(`## 专业技能
${kb.skills.map(s => `- **${s.category}**：${s.items}`).join('\n')}`);

  // 教育背景
  sections.push(`## 教育背景
${kb.education.map(e => `- ${e.school}，${e.degree}（${e.date}）`).join('\n')}`);

  // 工作经历
  sections.push(`## 工作经历
${kb.workExperience.map(w => `### ${w.role} @ ${w.company}（${w.date}）
${w.description.map(d => `- ${d}`).join('\n')}`).join('\n\n')}`);

  // 项目经历
  sections.push(`## 项目经历
${kb.projects.map(p => `### ${p.name}
- 技术栈：${p.tech}
- 角色：${p.role}
${p.description.map(d => `- ${d}`).join('\n')}
${p.github ? `- GitHub：${p.github}` : ''}
${p.link && p.link !== '#' ? `- 链接：${p.link}` : ''}`).join('\n\n')}`);

  // 联系方式
  sections.push(`## 联系方式
- 邮箱：${kb.contact.email}
- 微信公众号：${kb.contact.wechat}
- GitHub：${kb.contact.github}`);

  // 文章（如果有）
  if (kb.articles.length > 0) {
    sections.push(`## 发表文章
${kb.articles.map(a => `- **${a.title}**：${a.summary}${a.link ? `（链接：${a.link}）` : ''}`).join('\n')}`);
  }

  // FAQ（如果有）
  if (kb.faq.length > 0) {
    sections.push(`## 常见问答
${kb.faq.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`);
  }

  return sections.join('\n\n');
}
