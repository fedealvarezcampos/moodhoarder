import { render } from '@testing-library/react';
import GalleryItem from '../components/GalleryItem';

describe('<GalleryItem />', () => {
	let component: any;

	beforeEach(() => {
		const boardID = '12345';

		const img = {
			filePath: '/string',
			preview: '/string',
		};

		component = render(<GalleryItem boardID={boardID} itemKey={123} img={img} />);
	});

	test('renders component', () => {
		// expect(component.container).toContainHTML('cacharroContainer'); // fails
		expect(component.container).toContainHTML('imageContainer'); // passes

		// component.debug();
	});
});
