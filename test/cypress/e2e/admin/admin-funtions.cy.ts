/// <reference types="cypress" />

describe('Dashboard de funciones', () => {
  before(() => {
    // Login antes de acceder al dashboard de funciones
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('El admin puede ver el dashboard de funciones y comprar boleto', () => {
    cy.visit('https://cine-front-production.up.railway.app/admin/functions');
    cy.contains('Lista de funciones').should('be.visible');
    cy.get('div').contains('Sala:').should('exist');
    cy.get('div').contains('Fecha y hora:').should('exist');
    cy.get('button').contains('Comprar boleto').should('exist');

    // Verifica que al hacer click en "Comprar boleto" navega a /seats
    cy.get('button').contains('Comprar boleto').first().click();
    cy.url().should('include', '/seats');
  });
});