/// <reference types="cypress" />

describe('Flujo de compra de función por cliente', () => {
  before(() => {
    cy.visit('http://localhost:3001/login');
    cy.get('input[type="email"]').type('client3@example.com');
    cy.get('input[type="password"]').type('client123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('El cliente puede comprar dos boletos para una función', () => {
    // Ir a funciones
    cy.visit('http://localhost:3001/admin/functions');
        cy.contains('Lista de funciones', { timeout: 10000 }).should('be.visible');

    // Elegir la primera función y dar click en "Comprar boleto"
    cy.get('button').contains('Comprar boleto').first().click();
    cy.url().should('include', '/seats');

    // Esperar a que cargue el componente de selección de sillas
    cy.contains('Detalles de la Función', { timeout: 10000 }).should('be.visible');

    // Seleccionar dos sillas (ajusta el selector según tu UI)
    cy.get('.seat.available', { timeout: 10000 }).eq(0).click();
    cy.get('.seat.available', { timeout: 10000 }).eq(1).click();

    // Dar click en el botón de comprar (ajusta el selector si es necesario)
    cy.get('button').contains('Comprar').click();

    // Verificar mensaje de éxito o redirección
     cy.contains('Compra realizada', { timeout: 10000 }).should('be.visible');
  });
});