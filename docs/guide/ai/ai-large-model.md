---
title: AI大模型
description: 从岗位画像到技术栈与学习路线，系统掌握大模型与智能体应用开发。
author: daily5am
tags: [AI大模型, LLM, Agent, RAG, 多模态]
---

# AI大模型：岗位画像、技术栈与学习路线

> 本文基于多条一线岗位信息与实际落地经验，梳理 AI 大模型（含智能体/多模态）方向的岗位要求、核心技术栈、能力分级与学习路径，帮助你从 0-1-10 进阶。

## 岗位画像与薪资带

- AI 大模型应用/智能体（AI Agent）工程师：30k–60k（14 薪常见），平台/架构岗位可更高。
- 多模态大模型算法专家/工程师：40k–70k（16 薪常见），要求具备模型精调与工程落地能力。
- 智能体平台/研发工程师：25k–45k，强调工程化、平台化、可观测与可靠性。

典型职责（综合提炼）：
- 基于 LLM/VLM 设计与实现智能体（任务规划、工具调用、记忆、RAG）。
- 构建 Agent 工作流与平台（Dify/FastGPT/自研），支持多场景复用与扩展。
- 优化 RAG 与知识检索（FlowRAG/LangChain），治理数据与评测质量。
- 记忆体系与存储（Weaviate/Chroma/Pinecone/Milvus + MemGPT/LangMem/Zep）。
- 多智能体协作与协议集成（LangGraph/AutoGen/CrewAI，MCP/Client-Server）。
- 多模态整合（ASR/TTS/VLM），边端推理与低延迟优化。
- 工程与可靠性：可观测（LangSmith/LangFuse/Arize）、版本与漂移监控、容器化与云。

> 参考来源（BOSS直聘，深圳地区）：
- AI大模型人工智能应用开发工程师：https://www.zhipin.com/web/geek/jobs?query=AI%E5%A4%A7%E6%A8%A1%E5%9E%8B&city=101280600
- 多模态大模型算法专家-AI应用与创新：https://www.zhipin.com/web/geek/jobs?query=AI%E5%A4%A7%E6%A8%A1%E5%9E%8B&city=101280600
- 多模态大模型算法工程师：https://www.zhipin.com/web/geek/jobs?city=101280600&degree=203&query=%E5%A4%A7%E6%A8%A1%E5%9E%8B
- 智能体平台/开发工程师：https://www.zhipin.com/web/geek/jobs?city=101280600&degree=203&query=%E6%99%BA%E8%83%BD%E4%BD%93

## 核心技术栈（体系化）

- 模型与生态：LLM/VLM（GPT、Gemini、Qwen、BERT、Mistral、Ollama、OpenAI API）
- Agent 框架：LangChain、LangGraph、DSPy、CrewAI、AutoGen、LlamaIndex
- RAG 与检索：FlowRAG、LangChain；Prompt 模板、上下文管理、意图识别
- 向量库与记忆：Weaviate、Chroma、Pinecone、Milvus；MemGPT、LangMem、Zep
- 通信与协议：REST、WebSocket、SSE、gRPC；MCP、Client-Server 架构
- DSL 与执行：领域语言建模、代码生成、执行引擎（任务编排）
- 多模态：ASR/TTS、图像/视频理解（VLM）、流式对话与低延迟优化
- 可观测与评测：LangSmith、LangFuse、Arize（数据与推理质量、链路追踪）
- 工程与平台：K8s/Docker、ModelArts、MLflow、数据漂移监控、CI/CD
- 语言与框架：Python、Node.js（TypeScript）、Java/Go（至少精通其一）

## 能力分级路径

### 入门（2–4 周）
- 目标：掌握 LLM 基础、API 调用与最小可用 RAG 应用。
- 知识点：Token/上下文、Embedding、向量检索、基本 Prompt 工程。
- 实践：
  - 项目1：文档问答（OpenAI/文心/Qwen 任一 + Chroma/Weaviate）。
  - 项目2：知识库构建与热更新（增量索引 + 基础评测）。
- 评估：问答准确率、延迟、部署可用性。

### 进阶（4–8 周）
- 目标：上手 Agent 框架与工具调用，搭建可观测的工作流。
- 知识点：LangChain/LangGraph 工作流、Tool/Function Calling、对话状态管理。
- 实践：
  - 项目3：多工具智能助手（搜索/日程/邮件），引入 LangSmith/LangFuse 调试。
  - 项目4：RAG 质量改进（FlowRAG/重排序/片段粒度调整）。
- 评估：链路可观测、工具鲁棒性、上下文窗口利用率。

### 高级（8–12 周）
- 目标：多智能体协作与记忆体系，协议与执行引擎初探。
- 知识点：AutoGen/CrewAI 多智能体、MemGPT/LangMem 长短期记忆、MCP 工具生态。
- 实践：
  - 项目5：多智能体协作的任务编排（规划/执行/验证角色分离）。
  - 项目6：DSL 执行器雏形（面向某一领域的任务语言 + 解释执行）。
- 评估：复杂任务成功率、流程可追踪性、可扩展性与稳定性。

### 专家（12 周 +）
- 目标：多模态融合与端侧优化，打造行业级可靠性与平台化能力。
- 知识点：ASR/TTS/VLM 融合、流式推理、K8s/GPU/边端推理、漂移监控与回归评测。
- 实践：
  - 项目7：实时语音助理（Streaming ASR/TTS + 工具调用 + 记忆）。
  - 项目8：行业智能体平台化（模板化工作流 + 权限/审计 + 评测基线）。
- 评估：SLA（延迟/可用性）、质量基线、灰度与回滚策略。

## 学习路线速查表

1. 基础起步：
   - 读：LLM 基础、Prompt 模式、RAG 原理；
   - 做：最小文档问答 + 可观测采集；
   - 选型：Python/TS 二选一 + LangChain + Chroma。
2. 工作流与工具调用：
   - 读：LangGraph/AutoGen 协作模式；
   - 做：多工具助手 + 质量评测；
   - 选型：LangSmith/LangFuse 上线调试。
3. 记忆与平台：
   - 读：MemGPT/LangMem、MCP 协议；
   - 做：引入长期记忆与工具生态；
   - 选型：Weaviate/Milvus（按规模）+ MCP Client/Server。
4. 多模态与工程化：
   - 读：ASR/TTS/VLM 与流式推理；
   - 做：实时语音/视觉 Agent；
   - 选型：K8s/Docker + 端侧优化（Ollama/量化/蒸馏）。

## 求职与面试要点

- 展示可复现项目：代码仓库 + Demo 视频 + 评测与可观测报告。
- 关注稳定性与成本：缓存/并发/超时/重试/降级；SLA 指标与优化策略。
- 重点经历：RAG 质量治理、多智能体协作、MCP 工具生态、记忆体系、端侧优化。
- 论文/开源：对 LangChain 等生态的 PR、阅读/解构能力与复现能力。

---
以上内容由岗位需求与落地实践归纳，建议结合业务需求进行取舍与先后排序。


