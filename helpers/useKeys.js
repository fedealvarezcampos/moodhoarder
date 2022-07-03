import { useEffect } from 'react';

const useClosingKey = (key, state = true, setState) => {
	useEffect(() => {
		const f = e => {
			if (e.code === key) {
				setState(false);
			}
		};
		window.addEventListener('keydown', f);
		return () => window.removeEventListener('keydown', f);
	}, [setState, key]);

	return state;
};

const useNavKey = (goPrev, goNext, itemKey, length) => {
	useEffect(() => {
		const f = e => {
			if (e.code === 'ArrowLeft' && itemKey !== 0) {
				goPrev(itemKey);
			}
			if (e.code === 'ArrowRight' && length > itemKey + 1) {
				goNext(itemKey);
			}
		};
		window.addEventListener('keydown', f);
		return () => window.removeEventListener('keydown', f);
	}, [itemKey, length, goPrev, goNext]);

	return itemKey;
};

export { useClosingKey, useNavKey };
