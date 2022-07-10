import { act, render } from '@testing-library/react';
import Navigator from '../components/Header';
import SessionContext from '../context/SessionContext';

describe('<Navigator />', () => {
	let component: any;

	beforeEach(async () => {
		const promise = Promise.resolve();
		const handleSetModal = jest.fn(() => promise);

		component = render(
			<SessionContext>
				<Navigator setModal={handleSetModal} />
			</SessionContext>
		);

		await act(() => promise);
	});

	test('renders component', async () => {
		// expect(component.container).toContainHTML('cacharroContainer'); // fails

		expect(component.container).toContainHTML('navContainer'); // passes

		// component.debug();
	});
});
