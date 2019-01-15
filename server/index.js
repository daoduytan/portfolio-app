const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

// SERVICES
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const secretData = [
  {
    title: 'SecretData 1',
    description: 'Info how to wield a world'
  },
  {
    title: 'SecretData 2',
    description: 'Secret place to do it'
  }
];

mongoose
  .connect(
    'mongodb://<dbuser>:<dbpassword>@ds157834.mlab.com:57834/portfolio-cholewka-dev',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });

    server.get(
      '/api/v1/onlysiteowner',
      authService.checkJWT,
      authService.checkRole('siteOwner'),
      (req, res) => {
        return res.json(secretData);
      }
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.use(function(error, req, res, next) {
      if (error.name === 'UnauthorizedError') {
        res
          .status(401)
          .send({ title: 'Unauthorized', detail: 'Unauthorized access!!' });
      }
    });

    server.use(handle).listen(3000, error => {
      if (error) throw error;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
