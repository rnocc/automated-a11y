import { header } from '../support/app.po';

describe('Astronaut Directory', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a header', () => {
    header().should('contain', 'Astronaut Directory');
  });
});
