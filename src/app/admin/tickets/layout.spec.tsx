import { render, screen } from '@testing-library/react';
import TicketsLayout from './layout';
import { Sidebar } from '../../components/Sidebar';

// Mock explícito del Sidebar para aislar la prueba
jest.mock('../../components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe('TicketsLayout', () => {
  it('debería renderizar el Sidebar y el contenido hijo', () => {
    render(
      <TicketsLayout>
        <div data-testid="child">Contenido principal</div>
      </TicketsLayout>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Contenido principal');
  });
});
