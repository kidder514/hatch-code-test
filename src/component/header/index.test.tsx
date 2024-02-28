import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './';
import { useGetDepth } from '../../api/query';

jest.mock('../../api/query', () => ({
    useGetDepth: jest.fn(() => ({ isLoading: false, data: 4 })),
}));
const useGetDepthMock = jest.mocked(useGetDepth);

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading indicator while data is fetched', () => {
        // @ts-ignore
        useGetDepthMock.mockReturnValueOnce({ isLoading: true, data: undefined });
        const { container } = render(<Header />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render level buttons based on fetched data', () => {
        render(<Header />);

        expect(screen.getAllByTestId('level-button')).toHaveLength(4);
        expect(screen.getByText('1')).toHaveClass('active');
        // Simulate clicking level 3 button
        fireEvent.click(screen.getByText('3'));
        expect(screen.getByText('3')).toHaveClass('active'); // Level 3 becomes active
    });
});