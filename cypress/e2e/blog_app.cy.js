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
        cy.CreateBlog({
          title: 'Creating new Blog',
          author: 'John',
          url: 'http://example.com',
          likes: 0,
        });
      });

      it('user can like a blog', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.get('.likes').contains(1);
      });
      it('user can delete a blog', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.contains('blog Creating new Blog was deleted by John');
      });
    });

    describe('ordering blogs by number of likes', function () {
      beforeEach(function () {
        cy.contains('new blog').click();
        cy.CreateBlog({
          title: 'first blog',
          author: 'John',
          url: 'http://example.com',
          likes: 2,
        });
        cy.CreateBlog({
          title: 'second blog',
          author: 'John',
          url: 'http://example.com',
          likes: 0,
        });
        cy.CreateBlog({
          title: 'third blog',
          author: 'John',
          url: 'http://example.com',
          likes: 15,
        });
      });
      it('contains 3 blogs in the right order', function () {
        cy.get('.blogList').children().should('have.length', 3);
        cy.get('.blog').eq(0).should('contain', 'John-third blog');
        cy.get('.blog').eq(1).should('contain', 'John-first blog');
        cy.get('.blog').eq(2).should('contain', 'John-second blog');
      });
    });
  });
});
