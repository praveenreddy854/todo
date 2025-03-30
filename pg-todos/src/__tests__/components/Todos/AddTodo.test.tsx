import React from 'react';
import { render, screen } from '@testing-library/react';
import AddTodo from '../../../components/Todos/AddTodo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Mock the DateTimePicker component
jest.mock('@mui/x-date-pickers/DateTimePicker', () => {
  return {
    DateTimePicker: ({ label }: { label: string }) => (
      <div>
        <label htmlFor="mock-date-picker">{label}</label>
        <input id="mock-date-picker" data-testid="mock-date-picker" />
      </div>
    ),
  };
});

// Mock the addTodo function
const mockAddTodo = jest.fn();

describe('AddTodo Component', () => {
  test('renders the component', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AddTodo addTodo={mockAddTodo} />
      </LocalizationProvider>
    );

    // Check if the component renders without crashing
    expect(screen.getByText(/I will do this/i)).toBeInTheDocument();
  });
});
