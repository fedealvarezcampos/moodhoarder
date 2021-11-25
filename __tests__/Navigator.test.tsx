import { render } from '@testing-library/react';
import Navigator from '../components/Navigator';
import SessionContext from '../context/SessionContext';

describe('<Navigator />', () => {
    let component: any;

    beforeEach(() => {
        component = render(
            <SessionContext>
                <Navigator setModal={jest.fn()} />
            </SessionContext>
        );
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('navContainer'); // passes

        component.debug();
    });
});
