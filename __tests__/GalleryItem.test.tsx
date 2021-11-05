import { render } from '@testing-library/react';
import GalleryItem from '../components/GalleryItem';

test('renders', () => {
    const boardId = '123';

    const img = {
        filePath: '/string',
        preview: '/string',
    };

    const component = render(<GalleryItem boardID={boardId} itemKey={123} img={img} />);

    console.log(component);
});
