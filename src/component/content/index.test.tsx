import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './';

jest.mock('../chart/Chart', () => jest.fn(() => <div data-testid="chart-component" />));

describe('Content', () => {
    it('should render the Chart component', () => {
        render(<Content />);
        expect(screen.getByTestId('chart-component')).toBeInTheDocument();
    });
});