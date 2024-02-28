import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import AddEntityForm from './';

describe('AddEntityForm', () => {
    const mockData: DivisionNode = { id: 1, name: 'Marketing', level: 2, parentTrack: [1], childTrack: [], children: {} };

    it('should render the form correctly', () => {
        const { getByText, getByTestId } = render(<AddEntityForm data={mockData} action={() => { }} />);
        expect(getByText('Add Entity')).toBeInTheDocument();
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByTestId('add-entity-form-input')).toBeInTheDocument();
        expect(getByText('type')).toBeInTheDocument();
        expect(getByTestId('add-entity-form-select')).toBeInTheDocument();
        expect(getByTestId('add-entity-form-submit')).toBeInTheDocument();
    });

    it('should call the submit function with entered name and type', () => {
        const mockAction = jest.fn();
        const { getByTestId } = render(<AddEntityForm data={mockData} action={mockAction} />);

        const nameInput = getByTestId('add-entity-form-input');
        const typeSelect = getByTestId('add-entity-form-select');
        const submitButton = getByTestId('add-entity-form-submit');

        fireEvent.change(nameInput, { target: { value: 'Foo Bar' } });
        fireEvent.change(typeSelect, { target: { value: 'USER' } });
        fireEvent.click(submitButton);

        expect(mockAction).toHaveBeenCalledWith({ parent: mockData, name: 'Foo Bar', type: 'USER' });
    });

});