import auth0 from 'auth0-js';

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
    // Save tokens !
  };

  login = () => {
    this.auth0.authorize();
  };
}

const auth0Client = new Auth0();

export default auth0Client;
