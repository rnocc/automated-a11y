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
    it('should not have detectable a11y errors on load', () => {
      cy.checkA11y(null, { includedImpacts: ['critical'] });
    });

    // check full page after opening modal
    it('should not have detectable a11y errors after opening the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y(
        {},
        {
          rules: {
            // This is not handled correctly by cdkFocusTrap
            // https://github.com/angular/components/issues/9035
            'aria-hidden-focus': { enabled: false },
          },
        }
      );
    });

    // scope tests to modal
    it('should not have detectable a11y errors on the add astronaut modal', () => {
      addAstronautButton().click();
      addAstronautForm().should('exist');
      cy.checkA11y({
        include: [['app-add-astronaut']],
      });
    });
  });
});
