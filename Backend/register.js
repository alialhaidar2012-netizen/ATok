import {auth} from './firebase.js';
import {createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

function prepareForRegister() {
  const meSection = document.getElementById('content-me');
  meSection.innerHTML = '';
  
  const registerForm = document.createElement('div');
  registerForm.className = 'login-form'; // same class like login => similiar style
  
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'E-Mail';
  emailInput.id = 'email';
  
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.id = 'password';
  
  const passwordInputSecond = document.createElement('input');
  passwordInputSecond.type = 'password';
  passwordInputSecond.placeholder = 'Write your password again';
  passwordInputSecond.id = 'password';
  
  const registerButton = document.createElement('button');
  registerButton.id = 'register-button';
  registerButton.className = 'register-link';
  registerButton.textContent = "Register";
  
  const goToLoginButton = document.createElement('button');
  goToLoginButton.id = 'login-button';
  goToLoginButton.textContent = "You have already an account? Go to Login";
  
  registerForm.append(emailInput, passwordInput, goToLoginButton, registerButton);
  
  meSection.append(registerForm)
  
  registerButton.addEventListener('click', () => {
    if(passwordInput.value === passwordInputSecond){
    register(emailInput.value, passwordInput.value);
    }else{
      console.log("Registration failed. Check if the password and the password second check are the same!")
    }
  });
  
  goToLoginButton.addEventListener('click', () => {
    window.prepareForLogin();
  });
}

async function register(email, password) {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration went well!");
    window.loggedIn = true;
    const registerForm = document.querySelector('.login-form');
    if(registerForm) registerForm.style.display = 'none';
  } catch (error){
    alert("Something went wrong" + error.message);
  }
}

window.prepareForRegister = prepareForRegister; //make it globally accessible
