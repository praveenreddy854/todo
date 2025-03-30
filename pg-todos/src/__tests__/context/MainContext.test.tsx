import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainContext, MainProvider } from '../../context/MainContext';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Simple test component
const TestComponent = () => {
  const context = React.useContext(MainContext);
  return <div>{context ? 'Context exists' : 'No context'}</div>;
};

describe('MainContext', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('provides context to children', () => {
    mockLocalStorage.getItem.mockReturnValueOnce('[]');

    render(
      <MainProvider>
        <TestComponent />
      </MainProvider>
    );

    expect(screen.getByText('Context exists')).toBeInTheDocument();
  });
});
