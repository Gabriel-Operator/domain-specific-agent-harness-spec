# Contributing to the Persona Spec

Thank you for your interest in the Persona Spec. This guide explains how to take part and where each kind of feedback belongs.

## Kinds of contribution

### Corrections and documentation

Typo fixes, clearer wording, better examples and fixes to the diagrams are welcome as pull requests. Every page of the website lives in `src/content/docs/`, and the diagrams live in `src/components/`.

### Problems with the specification

Found something in the specification that is wrong, contradictory or impossible to implement? [Open an issue](https://github.com/Gabriel-Operator/persona-spec/issues). Say which section, what you expected and what you found.

### Proposals

A proposal changes the format: a new field, a new definition file, a new rule for runtimes. Open an issue that starts with `Proposal:` and describe:

1. **The problem.** What a persona author or a runtime could not do, with a real case you ran into.
2. **The change.** What the definition files or the runtime rules would say instead.
3. **The cost.** What every runtime would have to support as a result.

The bar for additions is high. It is much easier to add something to a specification than to remove it, and every addition is something each runtime has to implement. When in doubt, leave it out.

Proposed changes enter the specification labelled **Proposed**. They become **Extracted** once a running persona uses them.

### Runtimes

If you build a runtime that reads persona folders, open an issue with its name, a link to it and the parts of the specification it supports. A runtime must be available to other people to be listed.

## Making a change

1. Fork the repository and create a branch.
2. Run the site locally with `npm install` and `npm run dev`, and check your change in both the light and dark themes.
3. Run `npm run build`. It must finish without errors.
4. Open a pull request that says what changed and why.

### Writing style

- Write plainly. Use short sentences and the words a developer would use.
- Use MUST, MUST NOT, SHOULD and MAY only for rules, as defined in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).
- Label every section of the specification as **Extracted**, **Proposed** or **Planned**.
- Base examples on real persona files where possible, and say when a figure is an illustration.

## License

By contributing, you agree that your contributions are licensed under the [Apache License 2.0](LICENSE).
