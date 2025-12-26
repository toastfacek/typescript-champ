# Python Curriculum: Zero to AI Agent

## Vision
Take learners from Python basics to building production-ready AI agents using the **official OpenAI/Anthropic SDKs** and **Pydantic**. This track mirrors the TypeScript curriculum but uses Python-native tooling.

---

## Phase 1: Python Foundations (Modules 1-4)
*Goal: Master core Python syntax and data structures.*

### Module 01: Basics ✅
- Hello Python
- Variables & Types
- Basic IO

### Module 02: Control Flow ✅
- If/Else
- Loops (for/while)
- Logic

### Module 03: Functions ✅
- Def & Return
- Arguments (*args, **kwargs)
- Lambda functions

### Module 04: Strings ✅
- F-strings
- Methods
- Slicing

---

## Phase 2: Intermediate Python (Modules 5-10)
*Goal: Write robust, modular Python code.*

### Module 05: Lists & Tuples ✅
- List comprehensions
- Tuple unpacking
- Mutability

### Module 06: Dictionaries & Sets ✅
- Key/Value pairs
- Hashability
- Set operations

### Module 07: File Handling ✅
- Context managers (`with` open)
- Reading/Writing text
- JSON handling

### Module 08: Error Handling ✅
- Try/Except/Finally
- Custom Exceptions
- Tracebacks

### Module 09: OOP Basics ✅
- Classes & Instances
- Attributes & Methods
- Inheritance

### Module 10: Modules & Packages ✅
- Imports
- `__init__.py`
- Virtual Environments (`venv`)

---

## Phase 3: AI Foundations (Modules 11-13)
*Goal: Connect to LLMs and understand the API.*

### Module 11: HTTP & APIs
> *Communicate with the web*
- **11.1 Requests & API Basics**: Using `httpx` or `requests`.
- **11.2 JSON & Pydantic**: Parsing API responses into typed objects.
- **11.3 Async IO**: Introduction to `asyncio` and `await` for IO-bound tasks.
- **11.4 Environment Variables**: Using `.env` and `python-dotenv`.

### Module 12: LLM Concepts
> *Theory behind the models*
- **12.1 How LLMs Work**: Tokens, context windows, probability.
- **12.2 Roles & Messages**: System, User, Assistant.
- **12.3 Prompt Engineering**: Zero-shot, Few-shot, Chain-of-thought.
- **12.4 Temperature & Top-P**: Controlling creativity.

### Module 13: Your First AI Call
> *Using the SDKs*
- **13.1 SDK Setup**: Installing `openai` / `anthropic` and API keys.
- **13.2 Chat Completions**: Sending a message and getting a response.
- **13.3 Streaming Responses**: Handling real-time output chunks.
- **13.4 Switching Models**: Comparing GPT-4o vs Claude 3.5 Sonnet.

---

## Phase 4: Agent Building (Modules 14-16)
*Goal: Build autonomous agents that can use tools.*

### Module 14: Structured Outputs & Tools
> *From text to actions*
- **14.1 Structured Data**: Using Pydantic to enforce output schemas (`response_format` / `tools`).
- **14.2 Defining Functions**: Writing Python functions to be used as tools.
- **14.3 Tool Calling**: Handling the model's desire to call a function.
- **14.4 Executing Tools**: Running the function and returning the result.

### Module 15: Agent Loops
> *Closing the loop*
- **15.1 The ReAct Loop**: Observation -> Thought -> Action -> Observation.
- **15.2 Memory Management**: Managing message history list (appending/pruning).
- **15.3 System Prompts for Agents**: Defining persona and capabilities.
- **15.4 Debugging Agents**: Tracing execution flow.

### Module 16: Capstone Projects
> *Build the real thing*
- **16.1 Research Assistant**: An agent that searches the web (Tavily/SerpAPI) and summarizes.
- **16.2 Code Assistant**: An agent that can read/write files and check syntax.
- **16.3 CLI Assistant**: A terminal-based helper tool.
- **16.4 Final Project**: Build your own custom agent.

---

## Technical Stack
- **Runtime**: Python 3.10+
- **HTTP**: `httpx` (async support)
- **Validation**: `pydantic`
- **AI SDKs**: `openai`, `anthropic`
- **Env**: `python-dotenv`
- **Testing**: `pytest`
