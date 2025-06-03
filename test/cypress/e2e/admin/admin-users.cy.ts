/// <reference types="cypress" />

describe('Dashboard de usuarios', () => {
  before(() => {
    // Login antes de acceder al dashboard de usuarios
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('El admin puede ver el dashboard de usuarios', () => {
    cy.visit('https://cine-front-production.up.railway.app/admin/users');
    cy.contains('Gestión de usuarios').should('be.visible');
    cy.contains('Usuarios').should('be.visible');
    cy.contains('Listado de usuarios registrados.').should('be.visible');
    cy.get('table').should('exist');
    cy.get('th').contains('Correo electrónico').should('exist');
  });
});