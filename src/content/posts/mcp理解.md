---
title: MCP理解
published: 2026-09-13
description: 如何理解MCP
tags:
  - 学习
category: 学习
image: ./images/firefly1.avif
draft:
author: 田大帅
---
---
tags: [MCP, AI, Agent, 全栈, 学习笔记]
date: 2026-09-13
source: "与 ChatGPT 的对话：讲解MCP"
---

# MCP（Model Context Protocol）学习笔记

## 一句话理解

**MCP（Model Context Protocol，模型上下文协议）是一套让 AI 以统一方式连接外部数据、工具和服务的开放协议。**

它不是 AI 模型、数据库或某个具体 API，而是规定 AI 应该如何发现、理解并调用外部能力。

可以把 MCP 类比为 **AI 世界里的 USB-C**：不同的 AI 应用是“设备”，各种外部系统是“配件”，MCP 提供统一的连接标准。

---

## 一、为什么需要 MCP

LLM 本身主要负责：

- 理解自然语言
- 推理和规划
- 生成文本或代码

但它通常不知道企业内部的实时库存、订单状态、本地文件内容或最新业务数据，也不能天然执行查询、写入和操作。

没有统一协议时，每接入一种外部系统，都可能需要单独开发一套集成方式：

```text
AI → GitHub 专用集成
AI → 数据库专用集成
AI → 文件系统专用集成
AI → 浏览器专用集成
```

这样会造成接口风格不统一、重复开发、工具描述难以复用，以及 AI 难以稳定理解每种系统的调用方式。

MCP 在 AI 与外部系统之间提供统一的沟通方式：

```text
AI 应用 / Agent
      ↓
   MCP Client
      ↓
   MCP Server
      ↓
API、数据库、文件系统、GitHub、浏览器或其他服务
```

因此，AI 应用只需理解 MCP 的通用规则；外部服务则通过 MCP Server 暴露自己的能力。

---

## 二、MCP 的基本架构：Host → Client → Server

MCP 主要包含三个角色。

| 角色 | 作用 | 在“金榜电器”示例中的对应物 |
| --- | --- | --- |
| Host | 承载 AI、会话和用户交互的应用 | Codex 或一个 AI 客服应用 |
| Client | Host 内部负责连接 MCP Server 的组件 | Codex 内部的 MCP 连接器 |
| Server | 按 MCP 规范对外提供工具、资源和提示的程序 | 金榜电器库存 MCP Server |
| 外部系统 | Server 实际访问的数据或业务能力 | 商品 API、MySQL、订单系统 |

典型调用链如下：

```text
用户
 ↓
MCP Host（例如 Codex）
 ↓
MCP Client
 ↓
MCP Server
 ↓
库存 API / 后端 / 数据库
```

### MCP Server 不等于传统云服务器

MCP Server 是“提供 MCP 能力的程序”，不一定部署在远程云服务器上。它可以是：

- 本机运行的小进程
- 远程部署的服务
- 连接 REST API 的适配层
- 访问本地文件或数据库的程序

例如，一个 `filesystem-mcp` 可以负责读取文件、列出目录和搜索内容；一个家电业务 MCP Server 可以负责查询商品、库存和售后记录。

---

## 三、MCP Server 提供的三类能力

### 1. Tools：让 AI 执行动作

Tools 是 AI 可以主动调用的函数或操作，例如：

```text
get_product()
get_inventory()
search_orders()
create_repair_ticket()
read_file()
run_query()
```

工具通常需要定义名称、用途、输入参数和返回结果。AI 会根据用户意图选择合适的工具。

### 2. Resources：让 AI 读取上下文

Resources 是可被读取的外部信息，例如：

- 文件内容
- 项目文档
- 数据库记录
- Git 历史
- 商品资料

Resources 重点是“提供信息”，不一定代表执行一个改变状态的动作。

### 3. Prompts：提供预定义提示或工作流

Prompts 是服务器提供的提示模板或工作流，例如：

- 代码审查
- 数据库分析
- 项目报告生成
- 售后问题诊断

它们可以帮助用户和 AI 以统一方式启动某类任务。

### 三者的快速区分

```text
Tools      = 做事
Resources  = 读资料
Prompts    = 按模板开始工作
```

---

## 四、贯穿示例：金榜电器库存查询

假设金榜电器有一个库存系统，用户对 AI 说：

> 帮我查一下仓库里还有没有海尔 526L 冰箱。

AI 模型本身并不知道实时库存，因此需要调用金榜电器 MCP Server 提供的工具：

```text
get_inventory(product_name, brand, capacity)
```

完整流程可以表示为：

```text
用户提出问题
  ↓
AI 理解“查询海尔 526L 冰箱库存”
  ↓
AI 发现并选择 get_inventory
  ↓
MCP Client 按协议发起调用
  ↓
金榜电器 MCP Server 校验参数
  ↓
Server 调用库存 API 或查询 MySQL
  ↓
返回结构化结果，例如 { stock: 7 }
  ↓
AI 组织自然语言回答
  ↓
目前还有 7 台。
```

一个面向家电业务的 MCP Server 还可以提供：

```text
get_product          查询商品详情
get_inventory        查询实时库存
search_orders        查询订单
get_customer         查询客户信息
create_repair_ticket 创建售后工单
```

这里最关键的分工是：

- AI 负责理解问题、规划步骤和选择工具
- MCP Client 负责连接和通信
- MCP Server 负责暴露能力、校验请求和访问业务系统
- API、后端和数据库负责提供真实业务数据

因此，AI 的回答是否准确，最终仍取决于库存系统的数据是否真实、及时，以及 Server 是否正确实现了查询逻辑。

---

## 五、MCP 与 API 的区别

两者不是互相替代的关系。

### API 解决什么问题

API 是某个系统对外提供功能的接口，例如：

```http
GET /api/inventory/123
```

它主要面向程序与程序之间的调用，规定请求地址、参数、认证方式和返回格式。

### MCP 解决什么问题

MCP 主要解决 AI 如何：

- 发现有哪些能力可用
- 理解每个能力的用途和参数
- 按统一协议发起调用
- 获取结构化结果并继续推理

### 两者的关系

很多 MCP Server 内部仍然会调用原有 REST API：

```text
AI
 ↓
MCP
 ↓
MCP Server
 ↓
REST API
 ↓
后端
 ↓
数据库
```

可以这样记：

> API 是业务系统提供的能力接口；MCP 是面向 AI 的统一接入与描述协议。

MCP 更像是给现有 API 加了一层 AI 友好的标准适配器。

---

## 六、MCP 与 Agent 的关系

MCP 和 Agent 是相关但不同的概念。

### Agent 是什么

Agent 通常指能够围绕目标进行多步工作循环的 AI 系统。它可能会：

1. 理解用户目标
2. 制定计划
3. 选择和调用工具
4. 读取结果
5. 根据结果继续行动或给出结论

### MCP 在 Agent 中的位置

MCP 不是 Agent 本身，而是 Agent 连接外部世界的一种标准方式。

```text
Agent = 理解 + 推理 + 规划 + 行动循环
MCP   = 让行动循环可以统一连接工具和数据
```

只有 LLM 时，系统主要是：

```text
理解 + 推理 + 生成
```

接入 MCP 后，Agent 可以进一步：

```text
理解
+ 推理
+ 获取实时数据
+ 调用工具
+ 执行操作
```

所以 MCP 为 Agent 提供了标准化的“手和眼”：Resources 帮它获取信息，Tools 帮它执行动作，Prompts 帮它启动特定工作流。

但是否称为 Agent，还要看系统是否具备目标驱动、多步规划和行动能力；接入一个 MCP Tool 的普通聊天机器人不一定就是完整 Agent。

---

## 七、从全栈角度建立整体认知

传统互联网应用通常是：

```text
用户 → 前端 → HTTP API → 后端 → 数据库
```

加入 AI / Agent 和 MCP 后，可以变成：

```text
用户 → AI / Agent → MCP Client → MCP Server → API / 后端 → 数据库
```

也可以连接非数据库系统：

```text
MCP Server → GitHub
MCP Server → 文件系统
MCP Server → 浏览器
MCP Server → Docker
MCP Server → 云服务
```

对全栈开发者来说，MCP 最值得理解的地方是：它通常不会推翻现有后端，而是在既有业务能力之上增加一套适合 AI 使用的标准入口。

---

## 八、常见混淆点

### MCP 不是模型

MCP 不负责生成答案，也不替代 GPT、Claude 等模型。

### MCP 不是数据库

MCP 只规定如何连接和暴露能力，真实数据仍然存放在数据库、API 或文件系统中。

### MCP Server 不是一定要远程部署

本地小程序也可以是 MCP Server。

### MCP 不会自动保证数据正确

它只能规范调用方式，不能替代权限控制、数据校验、日志、错误处理和业务规则。

### MCP 不等于 Agent

MCP 是连接标准，Agent 是具备目标和行动循环的 AI 系统。

---

## 九、复习脑图式总结

```text
MCP：Model Context Protocol
│
├─ 定义
│  └─ AI 连接外部数据、工具和服务的统一开放协议
│
├─ 为什么需要
│  ├─ LLM 不知道实时业务数据
│  ├─ LLM 不能天然执行外部操作
│  └─ 避免每种系统都开发一套专用 AI 集成
│
├─ 架构
│  ├─ Host：承载 AI 的应用，如 Codex
│  ├─ Client：Host 内的协议连接组件
│  └─ Server：暴露能力并连接真实外部系统
│
├─ Server 能力
│  ├─ Tools：执行操作
│  ├─ Resources：读取上下文
│  └─ Prompts：预定义模板或工作流
│
├─ 与 API 的关系
│  ├─ API：业务系统的功能接口
│  ├─ MCP：AI 发现、理解和调用能力的协议
│  └─ MCP Server 内部可以继续调用 REST API
│
├─ 与 Agent 的关系
│  ├─ Agent：理解、规划、调用工具、循环行动
│  └─ MCP：为 Agent 提供标准化的工具和数据连接
│
└─ 金榜电器示例
   └─ 用户 → AI → get_inventory → MCP Server → 库存 API / MySQL → 返回库存
```

## 十、建议记住的最终模型

```text
用户提出目标
   ↓
AI / Agent 负责理解与规划
   ↓
MCP Client 负责连接
   ↓
MCP Server 暴露 Tools、Resources、Prompts
   ↓
API、后端、数据库或其他服务提供真实能力
   ↓
结果返回给 AI，AI 继续推理并回答用户
```

**最简记忆：MCP 让 AI 能以统一方式“看见外部信息、调用外部工具、完成外部任务”。**

---

## 十一、下一步学习方向

按循序渐进的顺序，可以继续学习：

1. MCP Server 的基本组成和工具定义
2. 用一个简单的 `get_inventory` 实现库存查询
3. MCP 与 REST API 的适配方式
4. `stdio` 与 HTTP 等通信方式
5. JSON-RPC 消息和参数校验
6. 权限、错误处理、日志和敏感操作确认

