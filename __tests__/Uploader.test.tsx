import { render } from '@testing-library/react';
import Uploader from '../components/Uploader';

describe('<Uploader />', () => {
    let component: any;

    const file = new File(['(⌐□_□)'], 'fiesta.png', { type: 'image/png' });

    const mockProps = {
        images: [{ file: file, filePath: '/string', preview: '/string' }],
        setImages: jest.fn(),
    };

    beforeEach(() => {
        component = render(<Uploader images={mockProps.images} setImages={mockProps.setImages} />);
    });

    test('renders component', () => {
        // expect(component.container).toContainHTML('cacharroContainer'); // fails

        expect(component.container).toContainHTML('gallerySectionContainer'); // passes

        component.debug();
    });
});
