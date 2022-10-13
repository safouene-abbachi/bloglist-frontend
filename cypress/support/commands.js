Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('CreateBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
    body: blog,
  });
  cy.visit('http://localhost:3000');
});
