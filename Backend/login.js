//hole die vordefinierten Funktionen aus Firebase
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const meSection = document.getElementById("content-me");
const forYouSection = document.getElementById("content-for-you");

window.loggedIn = false;

if(!window.loggedIn){
  prepareForLogin();
}else{
  window.createHTML();
}

export function prepareForLogin() {
  const loginForm = document.createElement('div');
  loginForm.className = 'login-form'; //Klasse für alles von Login
  
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'E-Mail';
  emailInput.id = 'email';
    
  const passwordInput = document.createElement('input');    
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.id = 'password';
  
  const loginButton = document.createElement('button');   
  loginButton.id = 'login-button';
  loginButton.textContent="Login";
  
  const goToRegisterButton = document.createElement('button');
  goToRegisterButton.id = 'register-button';
  goToRegisterButton.className = 'register-link';
  goToRegisterButton.textContent = "No Account? Register and make one";
  
  loginForm.append(emailInput, passwordInput, loginButton, goToRegisterButton);
  
  meSection.innerHTML = "";
  meSection.append(loginForm)
  
  loginButton.addEventListener('click', () => {
  login(emailInput.value, passwordInput.value);
});
  goToRegisterButton.addEventListener('click', () => {
  window.prepareForRegister();  
});
}

async function login(email, password) {
  const auth = getAuth();
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email,password);
    console.log("Login succeeded", userCredential.user); // kann später noch schöner gemacht werden
    loginForm.style.display = 'none';
    window.loggedIn = true;
  }catch(error){
    console.log("Login went wrong", error.code);
  }
}

window.prepareForLogin = prepareForLogin; //global machen