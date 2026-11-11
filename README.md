# Persona Spec

An open format for packaging a complete AI persona as a portable, version-controlled folder: its instructions, domain model, lists, playbooks, approval rules and tests.

A persona folder is an [Agent Skill](https://agentskills.io). This specification adds the declarative definition files a skill does not describe, how they are identified and verified, and what a runtime must do with them.

**Status:** draft 0.1. The format can still change.

**Website:** https://gabriel-operator.github.io/persona-spec/

## Repository layout

| Path | Contents |
| --- | --- |
| `src/content/docs/` | The specification and the website pages |
| `src/components/` | The diagrams and the scroll story on the home page |
| `src/styles/site.css` | The palette and the styles of every diagram |
| `public/llms.txt` | An index of the pages for coding agents |
| `astro.config.mjs` | Site name, navigation and repository link |
| `public/` | Static files |

## Read the specification

- [Overview](src/content/docs/index.mdx)
- [Specification](src/content/docs/specification.mdx)
- [Apps and connectors](src/content/docs/apps.mdx)
- [Examples](src/content/docs/examples.mdx)
- [Other standards](src/content/docs/standards.mdx)

## Run the site locally

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Contributing

Open an issue to report a problem or propose a change. A proposal should say what a persona author or a runtime would do differently.

## Licence

[Apache License 2.0](LICENSE).
