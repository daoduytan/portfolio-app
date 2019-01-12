import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'marcin-cholewka.eu.auth0.com',
      clientID: 'KCPmzyc877FPttQJKXBgoCYvSABSosE2',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (error) {
          reject(error);
          console.log(error);
          alert(
            `Error: ${error.error}. Check the console for further details.`
          );
        }
      });
    });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);
  };

  logout = () => {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');
    this.auth0.logout({
      returnTo: '',
      clientID: 'KCPmzyc877FPttQJKXBgoCYvSABSosE2'
    });
  };

  login = () => {
    this.auth0.authorize();
  };

  getJWKS = async () => {
    const res = await axios.get(
      'https://marcin-cholewka.eu.auth0.com/.well-known/jwks.json'
    );
    const jwks = res.data;

    return jwks;
  };

  verifyToken = async token => {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE
      let certificate = jwk.x5c[0];
      certificate = certificate.match(/.{1,65}/g).join('\n');
      certificate = `-----BEGIN CERTIFICATE-----\n${certificate}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, certificate);
          const expiredAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiredAt
            ? verifiedToken
            : undefined;
        } catch (error) {
          return undefined;
        }
      }
    }
    return undefined;
  };

  clientAuth = async () => {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
  };

  serverAuth = async req => {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, 'jwt');
      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }

    return undefined;
  };
}

const auth0Client = new Auth0();

export default auth0Client;
