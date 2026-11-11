# Persona Runtime Spec

**A runtime contract for agents and teams that run on an existing harness.**

A **persona** is a versioned Git definition of a role or team, including its instructions, playbooks, data definitions, approval requirements, and evals. The **runtime** verifies those definitions, binds workspace resources, and coordinates work with an **agent harness**. The harness runs the agent loop and coordinates model calls and tool use.

[Read the draft](https://gabriel-operator.github.io/persona-spec/) · [Specification](src/content/docs/specification.mdx) · [Examples](src/content/docs/examples.mdx) · [Terms and standards](src/content/docs/standards.mdx)

> **Status: draft 0.1.** The format comes from running Gabriel Operator installations and can still change.

## Persona, runtime, harness

| Term | What it means |
| --- | --- |
| **Persona** | The Git definition of a role or team and the work it can do. |
| **Runtime** | Loads and verifies a persona, connects workspace resources, and coordinates execution. |
| **Harness** | Runs the agent loop and coordinates model calls and tool use. |
| **Agent** | A worker that uses instructions and tools. A persona can define a team of agents. |
| **Workspace** | One installation's accounts, records, permissions, and run history. |

The root [`SKILL.md`](https://agentskills.io/specification) follows Agent Skills. A persona adds declarative definitions and a registry of pinned resources. This draft covers persona import and runtime behavior, including reporting which steps can run. How a runtime connects to its harness depends on the implementation.

Existing paths and identifiers such as `assets/persona-evals.json` and `teams[].bots` still apply.

## What a persona contains

```text
persona-lane/
├── SKILL.md
├── assets/
│   ├── chat-app.json
│   ├── ontology.json
│   ├── persona-evals.json
│   ├── studio-teams.json
│   └── data-feeds/
├── references/
│   ├── registry.json
│   ├── lists/
│   ├── pipelines/
│   └── workflows/
└── skills/
```

The draft marks features **Extracted** (used in Gabriel today), **Proposed** (new in this draft), or **Planned** (still to be specified). The core format and registry are extracted. Runtime binding and presence are proposed; JSON Schemas and full team orchestration rules are planned.

## Read the docs

| Page | Start here for |
| --- | --- |
| [Specification](src/content/docs/specification.mdx) | Folder layout, stable keys, registry, definition files, and runtime rules |
| [Apps and connectors](src/content/docs/apps.mdx) | Connector operations, shared records, app packages, and live sync |
| [Examples](src/content/docs/examples.mdx) | A tour of the Lane team and its prospect workflow |
| [Terms and standards](src/content/docs/standards.mdx) | Vocabulary and how Agent Skills, MCP, A2A, and Standard Agents fit |

The format comes from [Gabriel Operator](https://github.com/Gabriel-Operator). The [Portable Persona Runtime installer](https://github.com/Gabriel-Operator/portable-persona-runtime) deploys published personas to a self-hosted runtime appliance. Check the runtime's capability report for the steps it can execute, especially offline.

For a coding agent, start with:

```text
Read https://gabriel-operator.github.io/persona-spec/llms.txt before authoring a persona or implementing a runtime.
```

## Develop locally

Requires Node.js 22.23 or later.

```sh
npm ci
npm run dev -- --background
npm run build
```

The site uses Astro and Starlight. Pages live in `src/content/docs/`, diagrams in `src/components/`, and styles in `src/styles/`. The build writes `dist/`; the GitHub Pages workflow sets `SITE_BASE=/persona-spec`. [`public/llms.txt`](public/llms.txt) indexes the source for coding agents.

See [Contributing](CONTRIBUTING.md) to report an issue or propose a change. Released under the [Apache License 2.0](LICENSE).
