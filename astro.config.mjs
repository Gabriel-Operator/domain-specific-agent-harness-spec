// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const NAME = 'Domain-Specific Agent Harness Spec';
const REPOSITORY = 'https://github.com/Gabriel-Operator/persona-spec';

// GitHub Pages serves the site under /persona-spec. Hosts that serve it at the root (Vercel, a custom domain) leave
// SITE_BASE unset. Links between pages are relative so they work either way.
const SITE_URL = process.env.SITE_URL || undefined;
const SITE_BASE = process.env.SITE_BASE || undefined;

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	base: SITE_BASE,
	integrations: [
		starlight({
			title: NAME,
			description: 'An open specification for defining a domain, turning team goals into playbooks, and running them with an agent harness.',
			social: [{ icon: 'github', label: 'GitHub', href: REPOSITORY }],
			editLink: { baseUrl: `${REPOSITORY}/edit/main/` },
			lastUpdated: true,
			expressiveCode: {
				shiki: false,
				styleOverrides: {
					codeBackground: 'var(--ap-surface)',
					codeForeground: 'var(--ap-ink)',
				},
			},
			customCss: ['./src/styles/site.css', './src/styles/docs.css'],
			components: {
				Header: './src/components/SpecHeader.astro',
				Hero: './src/components/PackageHero.astro',
				PageTitle: './src/components/SpecPageTitle.astro',
				SiteTitle: './src/components/SpecSiteTitle.astro',
				ThemeSelect: './src/components/ThemeToggle.astro',
			},
			// Lets the styles hide animated parts before they scroll into view, and only when scripts run.
			head: [{ tag: 'script', content: "document.documentElement.classList.add('ps-js')" }],
			sidebar: [
				{ label: 'Overview', link: '/', attrs: { 'data-primary-nav': '' } },
				{
					label: 'Reference',
					items: [
						{ label: 'Specification', slug: 'specification', attrs: { 'data-primary-nav': '' } },
						{ label: 'Apps and connectors', slug: 'apps', attrs: { 'data-primary-nav': '' } },
					],
				},
				{
					label: 'Concepts',
					items: [
						{ label: 'Topics', slug: 'concepts', attrs: { 'data-primary-nav': '' } },
						{ label: 'Personas and workspaces', slug: 'concepts/personas-and-workspaces' },
						{ label: 'Teams, goals, and playbooks', slug: 'concepts/teams-and-goals' },
						{ label: 'Connectors and approvals', slug: 'concepts/connectors-and-approvals' },
						{ label: 'Records, pipelines, and apps', slug: 'concepts/records-and-apps' },
						{ label: 'Runs and collaboration', slug: 'concepts/runs-and-collaboration' },
						{ label: 'Signals, evidence, and evals', slug: 'concepts/signals-and-evals' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Examples', slug: 'examples', attrs: { 'data-primary-nav': '' } },
						{ label: 'Skill catalogue', slug: 'skills' },
						{ label: 'Terms and standards', slug: 'standards', attrs: { 'data-primary-nav': '' } },
					],
				},
			],
		}),
	],
});
