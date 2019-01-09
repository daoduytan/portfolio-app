import auth0 from 'auth0-js';
import Cookies from 'js-cookie';

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
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

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

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = Cookies.getJSON('expiresAt');

    return new Date().getTime() < expiresAt;
  };

  clientAuth = () => {
    return this.isAuthenticated();
  };

  serverAuth = req => {
    if (req.headers.cookie) {
      const expiresAtCookie = req.headers.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('expiresAt='));

      if (!expiresAtCookie) {
        return undefined;
      }

      const expiresAt = expiresAtCookie.split('=')[1];
      return new Date().getTime() < expiresAt;
    }
  };
}

const auth0Client = new Auth0();

export default auth0Client;
