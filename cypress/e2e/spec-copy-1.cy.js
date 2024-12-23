describe('Login Page - Login and Logout Test for Multiple Users', () => {
  // Lista cu utilizatori (username și parola)
  const users = [
    { username: 'anna_johnson', password: 'secret123' },
    { username: 'elisabetat@eed.usv.ro', password: 'cadru866' },
    { username: 'alexandru.siean@usm.ro', password: 'cadru1123' },
    { username: 'andy.tanase@usm.ro', password: 'cadru75' },
    { username: 'tcaciuc.anda@eed.usv.ro', password: 'cadru877' },
    { username: 'mihail.terenti@usm.ro', password: 'cadru1782' },
    { username: 'cristina@eed.usv.ro', password: 'cadru63' },
    { username: 'ioanu@eed.usv.ro', password: 'cadru114' },
    { username: 'vatavu@eed.usv.ro', password: 'cadru79' },
    { username: 'zagan@eed.usv.ro', password: 'cadru809' },
    { username: 'zagan@eed.usv.ro', password: 'cadru8' },
  ];

  // Iterează prin fiecare utilizator
  Cypress._.each(users, (user) => {
    it(`should allow ${user.username} to log in and then log out`, () => {
      // Vizitează pagina de login
      cy.visit('http://localhost:3000');

      // Introduce username-ul
      cy.get('.login-form input[placeholder=" Email"]').type(user.username);

      // Introduce parola
      cy.get('.login-form input[placeholder=" Parola"]').type(user.password);

      // Apasă pe butonul de login
      cy.get('.login-button').click();

      // Așteaptă redirecționarea la pagina calendarului
      cy.url().should('include', '/calendar'); 

      // Apasă pe butonul de logout
      cy.get('.logout-btn').click();

      // Verifică dacă utilizatorul a fost redirecționat la pagina de login
      cy.url().should('include', '/');
    });
  });
});
