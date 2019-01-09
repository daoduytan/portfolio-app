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
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
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
