describe('Image Search Application', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:3000')
  })

  it('should have the correct title', () => {
    cy.get('h1').should('contain', 'Random Image Search')
  })

  it('should have a search input and button', () => {
    // Check if search input exists
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .should('exist')
      .and('be.visible')

    // Check if search button exists and contains correct text
    cy.get('button')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Search')
  })

  it('should be able to type in the search input', () => {
    const searchText = 'test search'
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .type(searchText)
      .should('have.value', searchText)
  })

  it('should display images after search', () => {
    // Type and submit search
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .type('test{enter}')

    // Check if images are loaded
    cy.get('img').should('have.length', 12)
    
    // Check if images are within cards
    cy.get('.MuiCard-root').should('have.length', 12)
  })

  it('should load new images on button click', () => {
    // First search
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .type('first search')
    cy.get('button').click()
    
    // Store first set of image sources
    cy.get('img').then($firstImages => {
      const firstImageSrcs = Array.from($firstImages).map(img => img.src)

      // Second search
      cy.get('input[placeholder="Enter any text to get random images..."]')
        .clear()
        .type('second search')
      cy.get('button').click()

      // Compare new images with first set
      cy.get('img').then($secondImages => {
        const secondImageSrcs = Array.from($secondImages).map(img => img.src)
        expect(firstImageSrcs).to.not.deep.equal(secondImageSrcs)
      })
    })
  })

  it('should have hover effect on images', () => {
    // Search for images first
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .type('test{enter}')

    // Wait for images to load
    cy.get('img').first()
      .should('be.visible')
      // Trigger hover
      .trigger('mouseover')
      // Check if transform scale is applied
      .should('have.css', 'transform', 'matrix(1.05, 0, 0, 1.05, 0, 0)')
  })

  it('should handle empty search gracefully', () => {
    // Click search with empty input
    cy.get('button').click()
    
    // Should not show any images
    cy.get('img').should('not.exist')
  })

  it('should be responsive', () => {
    // Type and submit search
    cy.get('input[placeholder="Enter any text to get random images..."]')
      .type('test{enter}')

    // Test different viewport sizes
    cy.viewport('iphone-6') // Mobile
    cy.get('.MuiGrid-root > .MuiGrid-item').should('have.css', 'max-width', '100%')
    
    cy.viewport('ipad-2') // Tablet
    cy.get('.MuiGrid-root > .MuiGrid-item').should('have.css', 'max-width', '50%')
    
    cy.viewport(1920, 1080) // Desktop
    cy.get('.MuiGrid-root > .MuiGrid-item').should('have.css', 'max-width', '33.3333%')
  })
})
