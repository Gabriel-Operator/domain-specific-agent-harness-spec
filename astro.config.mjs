// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const NAME = 'Agent Package Spec';
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
			description: 'An open format for packaging the definitions an AI agent or team needs to do a job.',
			social: [{ icon: 'github', label: 'GitHub', href: REPOSITORY }],
			editLink: { baseUrl: `${REPOSITORY}/edit/main/` },
			lastUpdated: true,
			customCss: ['./src/styles/site.css', './src/styles/docs.css'],
			components: {
				Header: './src/components/SpecHeader.astro',
				Hero: './src/components/PackageHero.astro',
				PageTitle: './src/components/SpecPageTitle.astro',
				SiteTitle: './src/components/SpecSiteTitle.astro',
			},
			// Lets the styles hide animated parts before they scroll into view, and only when scripts run.
			head: [{ tag: 'script', content: "document.documentElement.classList.add('ps-js')" }],
			sidebar: [
				{ label: 'Overview', link: '/' },
				{
					label: 'Reference',
					items: [
						{ label: 'Specification', slug: 'specification' },
						{ label: 'Apps and connectors', slug: 'apps' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Examples', slug: 'examples' },
						{ label: 'Terms and standards', slug: 'standards' },
					],
				},
			],
		}),
	],
});
