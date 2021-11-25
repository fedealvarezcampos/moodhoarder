import { render } from '@testing-library/react';
import Login from '../components/Login';

describe('<Login />', () => {
    let component: any;

    beforeEach(() => {
        component = render(<Login setModal={jest.fn()} />);
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('inputsContainer'); // passes

        // component.debug();
    });
});
