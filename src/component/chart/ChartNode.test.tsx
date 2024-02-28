import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartNode from './ChartNode';
import { isEmpty } from '../../util/object';

jest.mock('../../util/object', () => ({
    isEmpty: jest.fn(),
}));
const mockIsEmpty = jest.mocked(isEmpty);


describe('ChartNode', () => {
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
        render(
            <ChartNode
                data={mockData}
                addDivision={jest.fn()}
                addEntity={jest.fn()}
                selectedDivisionList={[]}
            />
        );
        expect(screen.getByText('Marketing')).toBeInTheDocument();
    });

    it('should not render children when empty', () => {
        mockIsEmpty.mockReturnValue(true);
        render(
            <ChartNode
                data={mockData}
                addDivision={jest.fn()}
                addEntity={jest.fn()}
                selectedDivisionList={[]}
            />
        );
        expect(screen.queryByTestId('node-child-id')).toBeNull();
    });

    it('should render children recursively', () => {
        mockIsEmpty.mockReturnValueOnce(false).mockReturnValue(true);
        render(
            <ChartNode
                data={mockData}
                addDivision={jest.fn()}
                addEntity={jest.fn()}
                selectedDivisionList={[]}
            />
        );

        expect(screen.getByText('Marketing')).toBeInTheDocument();
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });

    it('should render action buttons and conditionally display forms', () => {
        render(
            <ChartNode
                data={mockData}
                addDivision={jest.fn()}
                addEntity={jest.fn()}
                selectedDivisionList={[]}
            />
        );

        expect(screen.getByTestId('add-division-button')).toBeInTheDocument();
        expect(screen.getByTestId('add-entity-button')).toBeInTheDocument();
        expect(screen.queryByTestId('add-division-form')).not.toBeInTheDocument();
        expect(screen.queryByTestId('add-entity-form')).not.toBeInTheDocument();

        const divisionButton = screen.getByTestId('add-division-button');
        fireEvent.click(divisionButton);
        expect(screen.getByTestId('add-division-form')).toBeInTheDocument();
        expect(screen.queryByTestId('add-entity-form')).not.toBeInTheDocument();
    });

    it('should call addDivision mutation when the Add Division form is submitted', async () => {
        const mockAddDivision = jest.fn();
        render(
            <ChartNode
                data={mockData}
                addDivision={mockAddDivision}
                addEntity={jest.fn()}
                selectedDivisionList={[]}
            />
        );

        const divisionButton = screen.getByTestId('add-division-button');
        fireEvent.click(divisionButton);
        const input = screen.getByTestId('add-division-input');
        const submitButton = screen.getByTestId('add-division-submit-button');
        fireEvent.change(input, { target: { value: 'New Division' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockAddDivision).toHaveBeenCalledWith({ parent: mockData, name: 'New Division' }));
    });

    it('should call addEntity mutation when the Add Entity form is submitted', async () => {
        const mockAddEntity = jest.fn();
        render(
            <ChartNode
                data={mockData}
                addDivision={jest.fn()}
                addEntity={mockAddEntity}
                selectedDivisionList={[]}
            />
        );

        const entityButton = screen.getByTestId('add-entity-button');
        fireEvent.click(entityButton);
        const input = screen.getByTestId('add-entity-form-input');
        const select = screen.getByTestId('add-entity-form-select');
        const submitButton = screen.getByTestId('add-entity-form-submit');
        fireEvent.change(input, { target: { value: 'New Entity' } });
        fireEvent.change(select, { target: { value: 'USER' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockAddEntity).toHaveBeenCalledWith({
            parent: mockData,
            name: 'New Entity',
            type: 'USER'
        }));
    });
});