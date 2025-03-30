import React from 'react';
import { render, screen } from '@testing-library/react';
import Todos from '../../../components/Todos/Todos';
import { MainContext } from '../../../context/MainContext';

// Mock the context with minimal data
const mockContextValue = {
  todos: [],
  setTodosChanged: jest.fn(),
  markComplete: jest.fn(),
  deleteTodos: jest.fn(),
  deleteAll: jest.fn(),
  updateTodos: jest.fn(),
  addTodo: jest.fn(),
  moveTodo: jest.fn(),
  markStar: jest.fn(),
  hideTodo: jest.fn(),
  listTodos: jest.fn(),
};

describe('Todos Component', () => {
  test('renders the component', () => {
    render(
      <MainContext.Provider value={mockContextValue}>
        <Todos />
      </MainContext.Provider>
    );

    // Check if the component renders without crashing
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
