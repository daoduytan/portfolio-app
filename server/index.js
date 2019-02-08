const express = require('express');
const compression = require('compression');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');
const bodyParser = require('body-parser');

// SERVICES
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

const portfolioRoutes = require('./routes/portfolio');
const experienceRoutes = require('./routes/experience');
const blogRoutes = require('./routes/blog');

const robotsOptions = {
  root: path.join(__dirname, '../static'),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
};

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.error(err));

// async () =>
//   (await mongoose.connect(
//     config.DB_URI,
//     { useNewUrlParser: true }
//   ))();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.use(bodyParser.json());

    server.use('/api/v1/portfolios', portfolioRoutes);
    server.use('/api/v1/experiences', experienceRoutes);
    server.use('/api/v1/blogs', blogRoutes);

    server.get('/robots.txt', (req, res) => {
      return res.status(200).sendFile('robots.txt', robotsOptions);
    });

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

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, error => {
      if (error) throw error;
      console.log('> Ready on port ' + PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
