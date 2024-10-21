import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthFormDeclarationPage from './HealthFormDeclarationPage';
import HealthFormDeclaration from '../components/HealthFormDeclaration';

jest.mock('../components/HealthFormDeclaration');

describe('HealthFormDeclarationPage', () => {
  beforeEach(() => {
    HealthFormDeclaration.mockImplementation(() => <div>Mocked HealthFormDeclaration Component</div>);
  });

  test('renders the page title', () => {
    render(<HealthFormDeclarationPage />);
    const titleElement = screen.getByText(/Health Declaration Form/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the HealthFormDeclaration component', () => {
    render(<HealthFormDeclarationPage />);
    const mockedComponent = screen.getByText(/Mocked HealthFormDeclaration Component/i);
    expect(mockedComponent).toBeInTheDocument();
  });
});