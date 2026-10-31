const loginPage = require('../../pages/LoginPage');

describe('Inicio de sesión', () => {
  beforeEach(() => {
    // Cargo los usuarios de prueba para no dejar credenciales sueltas en cada test
    cy.fixture('users').as('users');
    // Todos los casos arrancan desde la pantalla de login
    loginPage.visit();
  });

  it('TC-LOGIN-01: usuario válido accede al inventario', function () {
    // Ingreso con el usuario primary y su contraseña
    loginPage.login(this.users.standard.username, this.users.standard.password);
    // Si todo salió bien, la app nos manda a la página de productos
    cy.url().should('include', '/inventory.html');
    // Confirmo que se ve el título de la sección
    cy.get('[data-test="title"]').should('have.text', 'Products');
  });

  it('TC-LOGIN-02: usuario bloqueado ve mensaje de error', function () {
    // Intento entrar con el usuario que el sitio tiene bloqueado
    loginPage.login(this.users.locked.username, this.users.locked.password);
    // Debe aparecer el aviso de bloqueo
    loginPage.elements.error().should('contain.text', 'Sorry, this user has been locked out.');
    // Y no debería haber pasado al inventario
    cy.url().should('not.include', '/inventory.html');
  });

  it('TC-LOGIN-03: credenciales inválidas muestran error', function () {
    // Pruebas con un usuario y una clave que no existen
    loginPage.login(this.users.invalid.username, this.users.invalid.password);
    // sitio responde que no coinciden con ningún usuario
    loginPage.elements
      .error()
      .should('contain.text', 'Username and password do not match any user in this service');
  });

  it('TC-LOGIN-04: usuario vacío exige username', function () {
    // Dejo el usuario en blanco y completo solo la contraseña
    loginPage.login(null, 'secret_sauce');
    // Deberia pedirme el nombre de usuario
    loginPage.elements.error().should('contain.text', 'Username is required');
  });

  it('TC-LOGIN-05: contraseña vacía exige password', function () {
    // Esta vez completo con el usuario y dejo la contraseña sin nada
    loginPage.login('standard_user', null);
    // Debe pedir la contraseña
    loginPage.elements.error().should('contain.text', 'Password is required');
  });
});
