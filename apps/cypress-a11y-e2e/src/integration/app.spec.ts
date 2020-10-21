import {
  addAstronautButton,
  addAstronautForm,
  header,
} from '../support/app.po';
import { defaultAxeConfiguration } from '../support/axe-configuration';

describe('Astronaut Directory', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a header', () => {
    header().should('contain', 'Astronaut Directory');
  });

  describe('a11y', () => {
    beforeEach(() => {
      cy.injectAxe();
      cy.configureAxe(defaultAxeConfiguration);
    });

    it('should have no detectable a11y errors on page load', () => {
      cy.checkA11y(null, { includedImpacts: ['critical'] });
    });

    it('should not have detectable errors on the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y({ include: [['app-add-astronaut']] });
    });

    it.only('should not have detectable errors after opening the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y(null, {
        // This is not handled correctly by cdkFocusTrap
        // https://github.com/angular/components/issues/9035
        rules: { 'aria-hidden-focus': { enabled: false } },
      });
    });
  });
});
