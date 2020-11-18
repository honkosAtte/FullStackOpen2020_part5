describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = { 
        name: 'testiNimi',      
        username: 'testiUserName',      
        password: 'siikret' 
    }    
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    })

    it('a user with right creds can log in', function() {
        cy.get('#username').type('testiUserName')
        cy.get('#password').type('siikret')
        cy.get('#login-button').click()
    
        cy.contains('testiNimi logged in')
      })

      it('login fails with a wrong password', function() {
        cy.get('#username').type('wrong')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.contains('wrong credentials')
      })
    
  })




describe('Blog ', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Blogs')
    })
  })