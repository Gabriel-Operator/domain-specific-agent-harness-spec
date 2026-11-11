# Agent Package Spec

**A Git format for the work an AI agent or team needs to do.**

Package instructions, playbooks, data definitions, approvals, and evals together. Review changes in Git, pin linked definitions, and import the package into a compatible runtime. Accounts, records, and run history belong to the workspace.

[Read the draft](https://gabriel-operator.github.io/persona-spec/) · [Specification](src/content/docs/specification.mdx) · [Examples](src/content/docs/examples.mdx) · [Terms and standards](src/content/docs/standards.mdx)

> **Status: draft 0.1.** The format comes from running Gabriel Operator installations and can still change.

## Package, agent, workspace

| Term | What it means |
| --- | --- |
| **Agent package** | The versioned folder that describes a job. Gabriel Operator calls it a *persona*. |
| **Agent** | A worker that uses instructions and tools. A package can define a team of agents. |
| **Workspace** | One installation's accounts, records, permissions, and run history. |

The root [`SKILL.md`](https://agentskills.io/specification) follows Agent Skills. The package adds declarative definitions and a registry of pinned resources. A skills client can read the instructions; a compatible runtime handles installation and execution.

Existing paths and identifiers such as `assets/persona-evals.json` and `teams[].bots` still apply.

## What ships in a package

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

The format comes from [Gabriel Operator](https://github.com/Gabriel-Operator). The [Portable Persona Runtime](https://github.com/Gabriel-Operator/portable-persona-runtime) is a self-hosted implementation. Check the runtime's capability report for the steps it can execute, especially offline.

For a coding agent, start with:

```text
Read https://gabriel-operator.github.io/persona-spec/llms.txt before writing or reviewing an agent package.
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
