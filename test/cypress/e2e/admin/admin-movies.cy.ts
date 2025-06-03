/// <reference types="cypress" />

describe('Dashboard de películas', () => {
  before(() => {
    // Login antes de acceder al dashboard de películas
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('El admin puede ver el dashboard de películas', () => {
    cy.visit('https://cine-front-production.up.railway.app/admin/movies');
    cy.contains('Películas').should('be.visible');
    cy.get('button').contains('Crear nueva película').should('be.visible');
    cy.get('button').contains('Editar película').should('be.visible');
    cy.get('div').contains('Películas').should('be.visible');
    cy.get('img').should('have.length.greaterThan', 0);
  });
});