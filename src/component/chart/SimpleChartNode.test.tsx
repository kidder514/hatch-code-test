import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SimpleChartNode from './SimpleChartNode';
import { isEmpty } from '../../util/object';

jest.mock('../../util/object', () => ({
    isEmpty: jest.fn(),
}));
const mockIsEmpty = jest.mocked(isEmpty);

describe('SimpleChartNode', () => {
    const mockData: DivisionNode = {
        id: 2,
        name: 'Marketing',
        level: 2,
        parentTrack: [1],
        childTrack: [3],
        children: {
            3: {
                id: 3,
                name: 'Sales',
                level: 3,
                parentTrack: [2],
                childTrack: [],
                children: {}
            },
        }
    };

    it('should render the node title', () => {
        render(<SimpleChartNode data={mockData} />);
        expect(screen.getByText('Marketing')).toBeInTheDocument();
    });

    it('should not render children when empty', () => {
        mockIsEmpty.mockReturnValue(true);
        render(<SimpleChartNode data={mockData} />);

        expect(screen.queryByTestId('node-child-id')).toBeNull();
    });

    it('should render children recursively', () => {
        mockIsEmpty.mockReturnValueOnce(false).mockReturnValue(true);
        render(<SimpleChartNode data={mockData} />);

        expect(screen.getByText('Marketing')).toBeInTheDocument();
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });
});