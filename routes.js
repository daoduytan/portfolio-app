const routes = require('next-routes');

module.exports = routes()
  .add('experienceNew', '/experiences/new')
  .add('experience', '/experience/:id')
  .add('experienceEdit', '/experiences/:id/edit')
  .add('userBlogs', '/blogs/dashboard')
  .add('blogEditor', '/blogs/new')
  .add('blogDetail', '/blogs/:slug')
  .add('blogEditorUpdate', '/blogs/:id/edit');
