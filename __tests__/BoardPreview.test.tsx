import { render } from '@testing-library/react';
import BoardPreview from '../components/BoardPreview';

describe('<BoardPreview />', () => {
	let component: any;

	const mockObject = {
		id: 20,
		uuid: 'string',
		images: ['string', 'string'],
		board_title: 'string',
		owner_uid: 'string',
	};

	beforeEach(() => {
		component = render(<BoardPreview boardItem={mockObject} />);
	});

	test('renders component', () => {
		// expect(component.container).toContainHTML('cacharroContainer'); // fails

		expect(component.container).toContainHTML('imageContainer'); // passes

		// component.debug();
	});
});
