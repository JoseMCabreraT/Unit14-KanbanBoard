import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  }); //Within this login function I can make a POST request.

  if (!response.ok) {
    throw new Error('Login failed');
  }//Here we handle the error if the responde is unsuccessful.

  return await response.json();
}//const login



export { login };
