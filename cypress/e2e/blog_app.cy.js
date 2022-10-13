describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'safouene',
      username: 'saf',
      password: '123456',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('login form is shown', function () {
    cy.contains('Log into Application');
    cy.contains('username');
    cy.contains('password');
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('saf');
      cy.get('#password').type('123456');
      cy.get('#login_button').click();
      cy.get('.success')
        .should('contain', 'Successfully logged-in')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('safouene is logged-in');
      cy.contains('new blog');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('saf');
      cy.get('#password').type('0000');
      cy.get('#login_button').click();
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'saf', password: '123456' });
    });
    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#Title').type('Testing with cypress');
      cy.get('#Author').type('jhon doe');
      cy.get('#Url').type('jhon.com');
      cy.get('#create_blog_button').click();
      cy.contains('Testing with cypress');
    });

    describe('Existing blog', function () {
      beforeEach(function () {
        const blog = {
          title: 'Creating new Blog',
          author: 'John',
          url: 'http://example.com',
          likes: 0,
        };
        cy.CreateBlog(blog);
      });

      it('user can like a blog', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.get('.likes').contains(1);
      });
    });
  });
});
