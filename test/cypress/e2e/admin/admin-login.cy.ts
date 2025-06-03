/// <reference types="cypress" />

describe('Login de usuario', () => {
  it('El admin puede iniciar sesión correctamente', () => {
    cy.visit('https://cine-front-production.up.railway.app/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Espera a que redirija al dashboard o página de usuarios
    cy.url().should('include', '/dashboard');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('userRole')).to.eq('admin');
    });
  });
});