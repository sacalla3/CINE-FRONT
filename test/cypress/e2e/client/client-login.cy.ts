/// <reference types="cypress" />

describe('Login de usuario', () => {
  it('El admin puede iniciar sesión correctamente', () => {
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('client3@example.com');
    cy.get('input[type="password"]').type('client123');
    cy.get('button[type="submit"]').click();

    // Espera a que redirija al dashboard 
    cy.url().should('include', '/dashboard');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('userRole')).to.eq('client');
    });
  });
});