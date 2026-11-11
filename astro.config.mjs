// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Working title and repository. Change both here when the name is final.
const NAME = 'Persona Spec';
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
			description: 'An open format for packaging a complete AI persona as a portable, version-controlled folder.',
			social: [{ icon: 'github', label: 'GitHub', href: REPOSITORY }],
			editLink: { baseUrl: `${REPOSITORY}/edit/main/` },
			lastUpdated: true,
			sidebar: [
				{ label: 'Overview', link: '/' },
				{ label: 'Specification', slug: 'specification' },
				{ label: 'Examples', slug: 'examples' },
				{ label: 'Other standards', slug: 'standards' },
			],
		}),
	],
});
