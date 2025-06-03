/// <reference types="cypress" />

describe('Crear nueva película', () => {
  before(() => {
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('El admin puede crear y buscar una nueva película', () => {
    cy.visit('https://cine-front-production.up.railway.app/admin/movies');
    cy.contains('button', 'Crear nueva película').click();

    // Completa el formulario del modal
    cy.get('input[name="title"]').type('Película Cypress');
    cy.get('input[name="description"]').type('Descripción de prueba');
    cy.get('input[name="director"]').type('Director de prueba');
    cy.get('input[name="releaseDate"]').type('2025-06-01');
    cy.get('select[name="genre"]').select('Acción');
    cy.get('input[name="duration"]').type('120');
    cy.get('input[name="language"]').type('Español');
    cy.get('select[name="status"]').select('Disponible');
    cy.get('input[name="classification"]').type('PG-13');

    cy.get('button[type="submit"]').contains('Crear').click();

    // Verifica que la película aparece en el listado
    cy.contains('Película Cypress').should('be.visible');

    cy.contains('Película Cypress').should('be.visible');
  });
});