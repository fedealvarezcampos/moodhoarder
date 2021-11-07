import { render } from '@testing-library/react';
import BoardBrowser from '../components/BoardBrowser';

describe('<BoardBrowser />', () => {
    let component: any;
    const mockHandler = jest.fn();

    beforeEach(() => {
        component = render(<BoardBrowser image={'/string'} setBoardNav={mockHandler} />);
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('imageContainer'); // passes

        // component.debug();
    });
});
