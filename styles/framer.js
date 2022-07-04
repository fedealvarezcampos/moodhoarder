export const stagger = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
};

export const boardItemAnimation = {
	initial: { y: 60, opacity: 0 },
	animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};
