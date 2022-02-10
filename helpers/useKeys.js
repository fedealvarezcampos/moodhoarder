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

const useNavKey = (itemKey, setKey, length) => {
	useEffect(() => {
		const f = e => {
			if (e.code === 'ArrowLeft' && itemKey !== 0) {
				setKey(itemKey - 1);
			}
			if (e.code === 'ArrowRight' && length > itemKey + 1) {
				setKey(itemKey + 1);
			}
		};
		window.addEventListener('keydown', f);
		return () => window.removeEventListener('keydown', f);
	}, [itemKey, setKey, length]);

	return itemKey;
};

export { useClosingKey, useNavKey };
