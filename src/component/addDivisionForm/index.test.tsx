import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddDivisionForm from '.';

describe('AddDivisionForm', () => {
    const mockData: DivisionNode = { id: 1, name: 'Marketing', level: 2, parentTrack: [1], childTrack: [], children: {} };

    it('should render the form correctly', () => {
        const { getByText, getByRole, getByTestId } = render(<AddDivisionForm data={mockData} action={() => { }} />);

        expect(getByText('Add Division')).toBeInTheDocument();
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByTestId('add-division-input')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should call the submit function with entered name', () => {
        const mockAction = jest.fn();
        const { getByTestId } = render(<AddDivisionForm data={mockData} action={mockAction} />);

        const nameInput = getByTestId('add-division-input')
        const submitButton = getByTestId('add-division-submit-button');

        fireEvent.change(nameInput, { target: { value: 'New Division' } });
        fireEvent.click(submitButton);

        expect(mockAction).toHaveBeenCalledWith({ parent: mockData, name: 'New Division' });
    });
});