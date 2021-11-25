import { render } from '@testing-library/react';
import ThemeSwitch from '../components/ThemeSwitch';

describe('<ThemeSwitch />', () => {
    let component: any;

    beforeEach(() => {
        component = render(<ThemeSwitch />);
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('themeButton'); // passes

        component.debug();
    });
});
