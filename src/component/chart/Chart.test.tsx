
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from './Chart';
import { useLoadDivisionList } from '../../api/query';

jest.mock('../../api/query', () => ({
    useLoadDivisionList: jest.fn(() => ({ isLoading: false, data: [] })),
}));

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(() => ({ mutate: jest.fn() })),
    useQueryClient: jest.fn(() => ({ invalidateQueries: jest.fn() })),
}));

const mockUseLoadDivisionList = jest.mocked(useLoadDivisionList);
const mockData: Division[] = [{ id: 1, name: 'Marketing', level: 2, parentTrack: [1], childTrack: [] }];

describe('Chart', () => {
    it('should render the loading state', () => {
        // @ts-ignore
        mockUseLoadDivisionList.mockReturnValue({ isLoading: true, data: [] });
        render(<Chart />);
        expect(screen.getByRole('heading', { name: /Division List/i })).toBeInTheDocument();
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
});