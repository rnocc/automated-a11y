import { header } from '../support/app.po';

describe('Astronaut Directory', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a header', () => {
    header().should('contain', 'Astronaut Directory');
  });

  describe('a11y', () => {
    beforeEach(() => {
      cy.injectAxe();
    });
    it('should not have detectable a11y errors on load', () => {
      cy.checkA11y(null, {
        includedImpacts: ['critical'],
      });
    });
  });
});
