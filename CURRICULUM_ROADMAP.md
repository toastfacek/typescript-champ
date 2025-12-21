# TypeScript Champ: Complete Curriculum Roadmap

## Vision: From Zero to AI Agent Developer

Take learners from no programming experience to building production AI agents using the **Vercel AI SDK** and **Claude Agent SDK**.

---

## Curriculum Overview

| Phase | Modules | Lessons | Focus |
|-------|---------|---------|-------|
| **Foundation** | 1-4 | 15 | TypeScript fundamentals |
| **Intermediate** | 5-8 | 16 | Async, APIs, Node.js |
| **AI Basics** | 9-11 | 12 | LLM concepts, first API calls |
| **Agent Building** | 12-15 | 16 | Tools, agents, patterns |
| **Capstone** | 16 | 4 | Build complete agents |

**Total: 16 Modules, 63 Lessons**

---

## Phase 1: TypeScript Foundations (Modules 1-4)

### Module 1: Getting Started ✅ (Exists)
> *Your first steps with TypeScript*

| # | Lesson | XP | Status |
|---|--------|-----|--------|
| 01 | Hello, TypeScript! | 50 | ✅ Done |
| 02 | Basic Types | 60 | ✅ Done |
| 03 | Type Inference | 50 | ✅ Done |

### Module 2: Working with Functions
> *Create reusable, typed functions*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 04 | Function Basics | 60 | Function declarations, return types |
| 05 | Parameters & Defaults | 60 | Required vs optional, default values |
| 06 | Arrow Functions | 50 | Arrow syntax, implicit returns |
| 07 | Function Types | 70 | Type signatures, callbacks |

### Module 3: Objects & Interfaces
> *Structure your data with types*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 08 | Object Types | 60 | Inline object types, nested objects |
| 09 | Interfaces | 70 | Interface declarations, extending |
| 10 | Optional & Readonly | 60 | Optional properties, readonly modifier |
| 11 | Type vs Interface | 50 | When to use which |

### Module 4: Arrays & Collections
> *Work with lists and complex data*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 12 | Typed Arrays | 60 | Array<T>, T[] syntax |
| 13 | Array Methods | 70 | map, filter, reduce with types |
| 14 | Tuples | 50 | Fixed-length typed arrays |
| 15 | Records & Maps | 60 | Record<K,V>, Map types |

---

## Phase 2: Intermediate TypeScript (Modules 5-8)

### Module 5: Advanced Types
> *Unlock TypeScript's power*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 16 | Union Types | 70 | `string \| number`, narrowing |
| 17 | Literal Types | 60 | `"success" \| "error"` patterns |
| 18 | Type Guards | 80 | typeof, instanceof, custom guards |
| 19 | Discriminated Unions | 80 | Tagged unions, exhaustive checks |

### Module 6: Generics
> *Write flexible, reusable code*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 20 | Generic Functions | 80 | `function identity<T>(x: T): T` |
| 21 | Generic Interfaces | 70 | `interface Box<T> { value: T }` |
| 22 | Constraints | 80 | `extends` keyword, bounded types |
| 23 | Utility Types | 70 | Partial, Required, Pick, Omit |

### Module 7: Async TypeScript
> *Handle asynchronous operations*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 24 | Callbacks & Types | 60 | Typing callback functions |
| 25 | Promises | 80 | `Promise<T>`, .then/.catch |
| 26 | Async/Await | 90 | async functions, await keyword |
| 27 | Error Handling | 80 | try/catch, typed errors |

### Module 8: Node.js & npm
> *Build backend applications*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 28 | Node.js Basics | 70 | Running TS in Node, ts-node |
| 29 | npm & Packages | 60 | Installing dependencies, package.json |
| 30 | ES Modules | 70 | import/export, module resolution |
| 31 | Environment Variables | 60 | process.env, dotenv, secrets |

---

## Phase 3: AI Foundations (Modules 9-11)

### Module 9: HTTP & APIs
> *Communicate with the outside world*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 32 | Fetch API | 80 | fetch(), Response types |
| 33 | JSON & Types | 70 | Parsing JSON, type assertions |
| 34 | API Error Handling | 80 | HTTP status codes, retry logic |
| 35 | Typed API Clients | 90 | Creating reusable API wrappers |

### Module 10: LLM Concepts
> *Understand how AI models work*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 36 | What are LLMs? | 50 | Tokens, context, completion |
| 37 | Messages & Roles | 60 | system, user, assistant messages |
| 38 | Prompting Basics | 70 | Clear instructions, examples |
| 39 | Streaming Responses | 80 | Why streaming, async iterators |

### Module 11: Your First AI Call
> *Connect to Claude and GPT*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 40 | Anthropic SDK Setup | 70 | Installing @anthropic-ai/sdk |
| 41 | First Claude Call | 90 | messages.create(), response parsing |
| 42 | Streaming with Claude | 90 | Stream responses, display progressively |
| 43 | OpenAI Comparison | 70 | OpenAI SDK, model differences |

---

## Phase 4: Agent Building (Modules 12-15)

### Module 12: Vercel AI SDK Basics
> *The unified AI toolkit*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 44 | AI SDK Setup | 80 | Installing ai, provider setup |
| 45 | generateText() | 90 | One-shot text generation |
| 46 | streamText() | 100 | Streaming responses, UI updates |
| 47 | generateObject() | 100 | Structured JSON output with Zod |

### Module 13: Tools & Function Calling
> *Give AI the ability to act*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 48 | What are Tools? | 70 | Tool concept, when to use |
| 49 | Defining Tools | 100 | tool() function, Zod schemas |
| 50 | Tool Execution | 100 | execute functions, return values |
| 51 | Multi-Tool Agents | 110 | Multiple tools, tool choice |

### Module 14: Agent Loops
> *Build autonomous agents*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 52 | The Agent Loop | 100 | Observe → Think → Act → Repeat |
| 53 | stopWhen Conditions | 90 | stepCountIs(), custom conditions |
| 54 | Conversation History | 100 | ModelMessage[], context management |
| 55 | Manual Agent Loops | 110 | Full control with generateText |

### Module 15: Claude Agent SDK
> *Build with Anthropic's agent framework*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 56 | SDK Setup | 80 | @anthropic-ai/claude-agent-sdk |
| 57 | Sessions | 100 | createSession(), send/receive |
| 58 | Multi-turn Conversations | 100 | Context persistence, follow-ups |
| 59 | Session Resume | 110 | Saving/resuming conversations |

---

## Phase 5: Capstone Projects (Module 16)

### Module 16: Build Real Agents
> *Put it all together*

| # | Lesson | XP | Concepts |
|---|--------|-----|----------|
| 60 | Research Agent | 150 | Web search tool, synthesis |
| 61 | Code Assistant | 150 | File tools, code generation |
| 62 | Multi-Agent System | 200 | Orchestrator-worker pattern |
| 63 | Your Own Agent | 200 | Guided capstone project |

---

## Detailed Lesson Specs

### Lesson 48: What are Tools?
```yaml
id: 48-what-are-tools
title: What are Tools?
xp: 70
estimated_minutes: 10
difficulty: intermediate

learning_objectives:
  - Understand what AI tools are
  - Know when to use tools vs prompting
  - Recognize common tool patterns

steps:
  - type: instruction
    title: "Tools: Giving AI Superpowers"
    content: |
      LLMs are great at text, but they can't:
      - Search the web
      - Read files
      - Call APIs
      - Execute code

      **Tools** let you give AI these abilities!

  - type: instruction
    title: "How Tools Work"
    code_example: |
      // 1. You define a tool
      const weatherTool = tool({
        description: "Get current weather",
        parameters: z.object({
          city: z.string()
        }),
        execute: async ({ city }) => {
          return { temp: 72, condition: "sunny" }
        }
      })

      // 2. AI decides when to use it
      // 3. Your code executes the tool
      // 4. AI gets the result

  - type: quiz
    question: "When should you use a tool?"
    options:
      - "When the AI needs real-time data"  # correct
      - "When you want faster responses"
      - "When the prompt is too long"
      - "When the AI makes mistakes"
```

### Lesson 49: Defining Tools
```yaml
id: 49-defining-tools
title: Defining Tools with Zod
xp: 100
estimated_minutes: 15
difficulty: intermediate

steps:
  - type: instruction
    title: "The tool() Function"
    content: |
      Every tool needs three things:
      1. **description** - Tells AI when to use it
      2. **parameters** - What inputs it accepts (Zod schema)
      3. **execute** - The function that runs

  - type: code-exercise
    title: "Create a Calculator Tool"
    instructions: |
      Create a tool that adds two numbers.
      Use the `tool()` function with a Zod schema.
    starter_code: |
      import { tool } from 'ai'
      import { z } from 'zod'

      const addTool = tool({
        description: // describe what this tool does
        parameters: z.object({
          // define a and b as numbers
        }),
        execute: async ({ a, b }) => {
          // return the sum
        }
      })
    solution_code: |
      import { tool } from 'ai'
      import { z } from 'zod'

      const addTool = tool({
        description: "Add two numbers together",
        parameters: z.object({
          a: z.number().describe("First number"),
          b: z.number().describe("Second number")
        }),
        execute: async ({ a, b }) => {
          return { result: a + b }
        }
      })
    test_cases:
      - description: "Tool has description"
      - description: "Parameters use Zod schema"
      - description: "Execute returns correct sum"
```

### Lesson 57: Claude Agent SDK Sessions
```yaml
id: 57-claude-sdk-sessions
title: Working with Sessions
xp: 100
estimated_minutes: 15
difficulty: intermediate

steps:
  - type: instruction
    title: "The V2 Session API"
    content: |
      The Claude Agent SDK v2 simplifies conversations:

      - `createSession()` - Start a new conversation
      - `session.send()` - Send a message
      - `session.receive()` - Get the response

      No more generator coordination!

  - type: code-exercise
    title: "Create Your First Session"
    instructions: |
      Create a session, send "Hello!", and log the response.
    starter_code: |
      import { unstable_v2_createSession } from '@anthropic-ai/claude-agent-sdk'

      // Create a session

      // Send a message

      // Receive and log the response
    solution_code: |
      import { unstable_v2_createSession } from '@anthropic-ai/claude-agent-sdk'

      await using session = unstable_v2_createSession({
        model: 'claude-sonnet-4-5-20250929'
      })

      await session.send('Hello!')

      for await (const msg of session.receive()) {
        if (msg.type === 'assistant') {
          const text = msg.message.content
            .filter(block => block.type === 'text')
            .map(block => block.text)
            .join('')
          console.log(text)
        }
      }
```

---

## Learning Path Visualization

```
                    PHASE 1: FOUNDATIONS
                    ┌─────────────────┐
                    │  Module 1-4     │
                    │  TypeScript     │
                    │  Basics         │
                    └────────┬────────┘
                             │
                    PHASE 2: INTERMEDIATE
                    ┌────────▼────────┐
                    │  Module 5-8     │
                    │  Advanced TS    │
                    │  Async, Node    │
                    └────────┬────────┘
                             │
                    PHASE 3: AI BASICS
                    ┌────────▼────────┐
                    │  Module 9-11    │
                    │  HTTP, LLMs     │
                    │  First AI Call  │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐       ┌──────────▼──────────┐
    │   Module 12-14    │       │    Module 15        │
    │   Vercel AI SDK   │       │  Claude Agent SDK   │
    │   Tools, Agents   │       │  Sessions, Resume   │
    └─────────┬─────────┘       └──────────┬──────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼────────┐
                    │   Module 16     │
                    │   CAPSTONE      │
                    │   Build Agents  │
                    └─────────────────┘
```

---

## Key Skills by Milestone

### After Module 4 (Foundations Complete)
- [ ] Declare variables with types
- [ ] Write typed functions
- [ ] Create interfaces
- [ ] Work with arrays and objects

### After Module 8 (Intermediate Complete)
- [ ] Use union types and generics
- [ ] Write async/await code
- [ ] Work with npm packages
- [ ] Handle environment variables

### After Module 11 (AI Basics Complete)
- [ ] Make HTTP requests
- [ ] Parse JSON responses
- [ ] Understand LLM concepts
- [ ] Call Claude/GPT APIs

### After Module 15 (Agent Building Complete)
- [ ] Use Vercel AI SDK (generateText, streamText, tools)
- [ ] Define and execute tools
- [ ] Build agent loops
- [ ] Manage sessions with Claude Agent SDK

### After Module 16 (Capstone Complete)
- [ ] Build research agents
- [ ] Create code assistants
- [ ] Implement multi-agent systems
- [ ] Design custom agents

---

## Implementation Priority

### Sprint 1: Complete Foundations
- [ ] Lessons 04-07 (Functions)
- [ ] Lessons 08-11 (Objects)
- [ ] Lessons 12-15 (Arrays)

### Sprint 2: Intermediate TypeScript
- [ ] Lessons 16-19 (Advanced Types)
- [ ] Lessons 20-23 (Generics)
- [ ] Lessons 24-27 (Async)
- [ ] Lessons 28-31 (Node.js)

### Sprint 3: AI Foundations
- [ ] Lessons 32-35 (HTTP/APIs)
- [ ] Lessons 36-39 (LLM Concepts)
- [ ] Lessons 40-43 (First AI Call)

### Sprint 4: Agent Development
- [ ] Lessons 44-47 (AI SDK Basics)
- [ ] Lessons 48-51 (Tools)
- [ ] Lessons 52-55 (Agent Loops)
- [ ] Lessons 56-59 (Claude Agent SDK)

### Sprint 5: Capstone
- [ ] Lessons 60-63 (Build Real Agents)

---

## Technical Requirements

### New Dependencies Needed
```json
{
  "dependencies": {
    "ai": "^4.0.0",
    "@ai-sdk/anthropic": "^1.0.0",
    "@ai-sdk/openai": "^1.0.0",
    "@anthropic-ai/claude-agent-sdk": "^1.0.0",
    "zod": "^3.22.0"
  }
}
```

### New Exercise Types Needed
1. **Multi-file Exercise** - For module/import lessons
2. **API Simulation** - Mock API calls in browser
3. **Agent Playground** - Test agent loops with simulated tools

### Infrastructure Updates
- [ ] Add Zod for schema validation in exercises
- [ ] Create mock AI responses for lessons
- [ ] Build agent loop visualizer component
- [ ] Add tool execution sandbox

---

## Content Notes

### Vercel AI SDK Focus Areas
- `generateText()` / `streamText()` - Core text generation
- `generateObject()` - Structured output with Zod
- `tool()` - Defining tools with schemas
- `stepCountIs()` - Agent loop control
- Multi-turn conversations with `ModelMessage[]`

### Claude Agent SDK Focus Areas
- `unstable_v2_createSession()` - Session management
- `session.send()` / `session.receive()` - Message flow
- `unstable_v2_resumeSession()` - Persistence
- `await using` - Resource cleanup (TS 5.2+)

### Agent Patterns to Teach
1. **Simple Tool Use** - Single tool, one-shot
2. **Multi-Step Agent** - Loop until done
3. **Evaluator Pattern** - Generate, evaluate, improve
4. **Orchestrator-Worker** - Coordinate multiple agents
5. **Research Agent** - Search, synthesize, answer
