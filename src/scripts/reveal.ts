// Marks each `[data-reveal]` element once it scrolls into view. The styles do the rest.
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
	);
	targets.forEach((target) => observer.observe(target));
} else {
	targets.forEach((target) => target.classList.add('is-in'));
}
