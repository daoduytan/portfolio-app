const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// MIDDLEWARE
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: 'https://marcin-cholewka.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'KCPmzyc877FPttQJKXBgoCYvSABSosE2',
  issuer: 'https://marcin-cholewka.eu.auth0.com/',
  algorithms: ['RS256']
});
