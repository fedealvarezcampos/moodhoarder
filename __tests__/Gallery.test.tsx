import { render } from '@testing-library/react';
import Gallery from '../components/Gallery';

describe('<Gallery />', () => {
    let component: any;

    const file = new File(['(⌐□_□)'], 'fiesta.png', { type: 'image/png' });

    const mockObject = {
        items: [{ file: file, filePath: '/string', preview: '/string' }],
        setItems: jest.fn(),
    };

    beforeEach(() => {
        component = render(<Gallery items={mockObject.items} setItems={mockObject.setItems} />);
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('galleryContainer'); // passes

        // component.debug();
    });
});
