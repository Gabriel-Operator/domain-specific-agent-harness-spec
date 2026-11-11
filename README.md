# Persona Spec

[![Website](https://img.shields.io/badge/website-persona--spec-0d9488)](https://gabriel-operator.github.io/persona-spec/)
[![Status: draft 0.1](https://img.shields.io/badge/status-draft%200.1-b45309)](https://gabriel-operator.github.io/persona-spec/specification/)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

An open format for packaging a whole AI role as a portable, version-controlled folder.

## What is a persona?

A persona is a complete AI role packaged as a folder: who it is, what it knows about its domain, the work it can carry out, what it must ask a person before doing, and how you check that it still works.

At its core, a persona is a folder with a `SKILL.md` file and a set of declarative definition files. There is no code to compile and no build step.

```
persona-lane/
├── SKILL.md                  # Required: name, description and instructions
├── assets/
│   ├── chat-app.json         # The app people use: pages, actions, data points
│   ├── ontology.json         # The domain model: entities and relationships
│   ├── persona-evals.json    # Requirements and the tests that verify them
│   ├── studio-teams.json     # Optional: teams, their bots, playbooks, lists and apps
│   └── data-feeds/           # Sources the persona may read
├── references/
│   ├── registry.json         # Required: every linked definition, with a fingerprint and revision
│   ├── lists/                # Record collections
│   ├── pipelines/            # State machines over records
│   └── workflows/            # Playbooks: the multi-step work the persona carries out
└── skills/                   # Optional: more Agent Skills the persona brings
```

A persona folder is an [Agent Skill](https://agentskills.io). Any skills-compatible agent can already discover a persona and read its instructions. This specification adds what a skill does not describe: the definition files, how they are identified and verified, and what a runtime must do with them.

## Why a persona format?

A prompt and a list of tools describe an assistant. They do not describe a role someone can hand real work to, review like any other change, and move between runtimes. A persona format packages the rest:

- **A whole role, not only a prompt.** The domain model, the records, the playbooks, the guardrails and the tests travel together.
- **Declarative, not code.** Definitions are JSON and Markdown. Anyone can read a change in a pull request, and any runtime can load one without executing the author's code.
- **Bound at run time.** A definition never names a model account, a credential or a person. The workspace that runs the persona supplies those, so one persona works for many teams and on many models.
- **Approval is part of the format.** A persona declares which effects need a person's decision first. A runtime that cannot enforce that holds the step.
- **Tested before release.** Requirements point to what implements them and to the cases that verify them.

## How does a persona work?

A persona goes from a Git repository to a running workspace in three steps:

1. **Author.** Definitions live in Git. Each linked definition has a stable resource key, and publishing records its fingerprint and revision in the registry.
2. **Import.** A runtime reads the registry, checks each fingerprint and creates the lists, pipelines and workflows the persona declares.
3. **Bind and run.** The workspace chooses the model, connects accounts and assigns people. The runtime reports which steps it can execute and blocks anything it cannot do safely, never replacing it with something else.

A persona can carry teams of agents, the connectors their playbooks may call, and the apps people use to follow the work. A runtime keeps all three in step on the same data: when an agent or a person changes a record, every open view of it updates.

## What the specification covers

| Part | Status |
| --- | --- |
| Folder structure, `SKILL.md`, the definitions-only rule, resource keys, the registry | Extracted |
| Definition files: ontology, lists, pipelines, workflows, data feeds, evals, chat app | Extracted; JSON Schemas planned |
| Runtime capability report: what a runtime can run, and blocking the rest | Extracted |
| Teams, connector requirements, connector steps, lists, pipelines and apps | Extracted |
| Custom app packages and their installations into teams | Extracted |
| Live sync: the resumable event stream that keeps every view current | Extracted |
| Binding the model, accounts and people at run time | Proposed |
| Presence and following | Proposed |
| Playbook steps in full, governance, signals and routines, access, surfaces | Planned |

**Extracted** describes files as personas use them today. **Proposed** is new in this draft. **Planned** is not written yet.

## Where do personas run?

- **[Gabriel Operator](https://github.com/Gabriel-Operator).** The hosted runtime where these personas were first built. Its Playbook Studio is where a team of people and agents works on a persona: [see it tab by tab](https://gabriel-operator.github.io/persona-spec/examples/).
- **[Portable Persona Runtime](https://github.com/Gabriel-Operator/portable-persona-runtime).** A self-hosted appliance that runs a persona's skills, knowledge and workflows on your own hardware.
- **Embedded offline runtime.** Runs the supported subset on a desktop or phone, and reports every step it cannot run offline.

A runtime does not need to support every part of a persona. It must say which parts it supports.

## Getting started

- **[Website](https://gabriel-operator.github.io/persona-spec/)**: the overview, with diagrams.
- **[Specification](https://gabriel-operator.github.io/persona-spec/specification/)**: the format, section by section.
- **[Apps and connectors](https://gabriel-operator.github.io/persona-spec/apps/)**: teams, connectors, apps, live sync and presence.
- **[Examples](https://gabriel-operator.github.io/persona-spec/examples/)**: Playbook Studio tab by tab, and one prospect taken from research to onboarding.
- **[Other standards](https://gabriel-operator.github.io/persona-spec/standards/)**: how the format relates to Agent Skills, the Model Context Protocol and the Standard Agent Specification.

### Give the specification to a coding agent

Paste this into Claude Code, Codex, Cursor or any other coding agent:

```
Read https://gabriel-operator.github.io/persona-spec/llms.txt and the pages it lists before you write or review a persona.
```

## Repository layout

| Path | Contents |
| --- | --- |
| `src/content/docs/` | The specification and every page of the website, as MDX |
| `src/components/` | The diagrams, the scroll story and the Studio tour |
| `src/styles/site.css` | The palette and the styles of every diagram |
| `public/llms.txt` | An index of the pages for coding agents |
| `astro.config.mjs` | Site name, navigation and repository link |
| `.github/workflows/deploy.yml` | Builds the site and publishes it to GitHub Pages on every push to `main` |

The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Run the site locally

Requires Node.js 22.23 or later.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes the static site to dist/
```

The site works at the root of a domain or under a path. GitHub Pages serves it under `/persona-spec`, set by `SITE_BASE` in the deploy workflow.

## Open development

The Persona Spec is extracted from personas that already run on Gabriel Operator and is developed in the open. The format can still change: every section of the specification is labelled with how settled it is.

Proposals, questions and corrections are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to take part.

## License

[Apache License 2.0](LICENSE).
