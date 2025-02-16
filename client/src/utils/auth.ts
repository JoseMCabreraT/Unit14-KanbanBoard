import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }//getProfile

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return !!this.getToken();
  }//loggedIn
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000);
      //Above: This converts the expiration date to a JavaScript Date object by multiplying the expiration time by 1000 to convert it from seconds to milliseconds. 
      return expirationDate < new Date();
    }//if statement
    return false;
  }//isTokenExpired

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }//getToken

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }//login

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }//logout
}

export default new AuthService();
