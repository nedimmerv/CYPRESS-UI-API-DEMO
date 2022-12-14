// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types='Cypress' />
/// <reference types='cypress-xpath' />
import "cypress-iframe";
import "cypress-file-upload";

// iframe locator
Cypress.Commands.add("getIframe", (iframe) => {
  return cy
    .get(iframe)
    .its("0.contentDocument.body")
    .should("be.visible")
    .then(cy.wrap);
});

// custom command for clicking on link using label

Cypress.Commands.add("clickLink", (label) => {
  cy.get("a").contains(label).click();
});
// Overwrite contains() method
Cypress.Commands.overwrite(
  "contains",
  (originalFn, subject, filter, text, options = {}) => {
    if (typeof text === "object") {
      options = text;
      text = filter;
      filter = undefined;
    }
    options.matchCase = false;
    return originalFn(subject, filter, text, options);
  }
);

// Custom  Command for Login
Cypress.Commands.add("loginApp", (email, password) => {
  cy.get("#Email").type(email);
  cy.get("#Password").type(password);
  cy.get("button[class='button-1 login-button']").click();
});

// Token Creation
Cypress.Commands.add("create_token", () => {
  cy.request({
    method: "POST",
    url: "https://hx-glog-keyclk.uksouth.cloudapp.azure.com:8443/auth/realms/qa/protocol/openid-connect/token",
    form: true,
    body: {
      grant_type: "password",
      client_id: "webfront",
      username: "qa.admin@hitachivantara.com",
      password: "test123",
    },
  });
});
