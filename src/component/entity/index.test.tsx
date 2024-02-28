import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Entity from './';
import { useGetEntityList } from '../../api/query';

jest.mock('../../api/query', () => ({
    useGetEntityList: jest.fn(() => ({ isLoading: false, data: [] })),
    useGetEntity: jest.fn(() => ({ isLoading: false, data: null })),
}));

const useGetEntityListMock = jest.mocked(useGetEntityList);

describe('Entity', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the loading state', () => {
        // @ts-ignore
        useGetEntityListMock.mockReturnValueOnce({ isLoading: true, data: [] });
        render(<Entity />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should render the entity list with badges', () => {
        const mockData = [
            { id: 1, name: 'Entity 1', type: 'USER', level: 2, division: 3 },
            { id: 2, name: 'Entity 2', type: 'GROUP', level: 3, division: 5 },
        ];
        // @ts-ignore
        useGetEntityListMock.mockReturnValueOnce({ isLoading: false, data: mockData });
        render(<Entity />);

        expect(screen.getByText('Entity List')).toBeInTheDocument();
        expect(screen.getAllByTestId('list-badge')).toHaveLength(2);
        expect(screen.getByText('Entity 1')).toBeInTheDocument();
        expect(screen.getByText('Entity 2')).toBeInTheDocument();
    });

    it('should not render the entity slider initially', () => {
        render(<Entity />);
        expect(screen.queryByText('Entity Detail')).not.toBeInTheDocument();
    });
});