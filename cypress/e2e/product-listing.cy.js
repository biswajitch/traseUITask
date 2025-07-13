describe('Product Listing App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000) // Wait for API data to load
  })

  describe('Search Functionality', () => {
    it('should filter products based on search term', () => {
      // Initial state - should show all products
      cy.get('.product').should('have.length', 10)
      
      // Search for "mouse"
      cy.get('.search-bar').type('mouse')
      cy.wait(500) // Wait for debounce
      
      // Should show only mouse products
      cy.get('.product').should('have.length', 1)
      cy.get('.product').should('contain', 'Wireless Mouse')
      
      // Clear search
      cy.get('.search-bar').clear()
      cy.wait(500)
      
      // Should show all products again
      cy.get('.product').should('have.length', 10)
    })

    it('should search in product descriptions', () => {
      cy.get('.search-bar').type('bluetooth')
      cy.wait(500)
      
      cy.get('.product').should('have.length', 1)
      cy.get('.product').should('contain', 'Bluetooth Speaker')
    })

    it('should handle no search results', () => {
      cy.get('.search-bar').type('nonexistent')
      cy.wait(500)
      
      cy.get('.product').should('have.length', 0)
    })
  })

  describe('View Switching', () => {
    it('should switch between card and list views', () => {
      // Default should be card view
      cy.get('[title="Card View"]').should('have.class', 'active')
      cy.get('.product-grid').should('exist')
      
      // Switch to list view
      cy.get('[title="List View"]').click()
      cy.get('[title="List View"]').should('have.class', 'active')
      cy.get('.product-list').should('exist')
      
      // Switch back to card view
      cy.get('[title="Card View"]').click()
      cy.get('[title="Card View"]').should('have.class', 'active')
      cy.get('.product-grid').should('exist')
    })
  })

  describe('Price Sorting', () => {
    it('should sort products by price ascending', () => {
      // Click sort button once for ascending
      cy.get('.sort-button').click()
      cy.get('.sort-button').should('contain', '↑')
      
      // Check if first product has lowest price
      cy.get('.product').first().should('contain', '$14.75') // Smart LED Bulb
    })

    it('should sort products by price descending', () => {
      // Click sort button twice for descending
      cy.get('.sort-button').click()
      cy.get('.sort-button').click()
      cy.get('.sort-button').should('contain', '↓')
      
      // Check if first product has highest price
      cy.get('.product').first().should('contain', '$199.99') // Noise Cancelling Headphones
    })

    it('should return to original order', () => {
      // Click sort button three times to return to original
      cy.get('.sort-button').click()
      cy.get('.sort-button').click()
      cy.get('.sort-button').click()
      cy.get('.sort-button').should('not.contain', '↑')
      cy.get('.sort-button').should('not.contain', '↓')
      
      // Should show original order (first product is Wireless Mouse)
      cy.get('.product').first().should('contain', 'Wireless Mouse')
    })
  })

  describe('Footer Statistics', () => {
    it('should display correct total product count and average price', () => {
      // Check initial stats
      cy.get('.product-footer').should('contain', 'Total Products: 10')
      cy.get('.product-footer').should('contain', 'Average Price: $')
      
      // Search to filter products
      cy.get('.search-bar').type('speaker')
      cy.wait(500)
      
      // Stats should update
      cy.get('.product-footer').should('contain', 'Total Products: 1')
      cy.get('.product-footer').should('contain', 'Average Price: $45.50')
    })

    it('should update stats when filtering', () => {
      cy.get('.search-bar').type('USB-C')
      cy.wait(500)
      
      cy.get('.product-footer').should('contain', 'Total Products: 1')
      cy.get('.product-footer').should('contain', 'Average Price: $32.00')
    })
  })

  describe('Combined Functionality', () => {
    it('should work with search and sort together', () => {
      // Search for products containing "head" or "speaker"
      cy.get('.search-bar').type('head')
      cy.wait(500)
      
      // Should find headphones
      cy.get('.product').should('have.length', 1)
      
      // Sort should still work
      cy.get('.sort-button').click()
      cy.get('.sort-button').should('contain', '↑')
      
      // Stats should reflect filtered and sorted results
      cy.get('.product-footer').should('contain', 'Total Products: 1')
    })

    it('should maintain view mode when searching', () => {
      // Switch to list view
      cy.get('[title="List View"]').click()
      
      // Search
      cy.get('.search-bar').type('mouse')
      cy.wait(500)
      
      // Should still be in list view
      cy.get('[title="List View"]').should('have.class', 'active')
      cy.get('.product-list').should('exist')
    })
  })
})