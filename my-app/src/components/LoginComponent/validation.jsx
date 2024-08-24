// validation.js

export const validateLoginForm = (loginEmail, loginPassword) => {
  const errors = {};
  
  if (!loginEmail) {
    errors.loginEmail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
    errors.loginEmail = 'Email address is invalid';
  }

  if (!loginPassword) {
    errors.loginPassword = 'Password is required';
  } else if (loginPassword.length < 6) {
    errors.loginPassword = 'Password must be at least 6 characters long';
  }

  return errors;
};

export const validateRegistrationForm = (name, address, contact, registerEmail, registerPassword) => {
  const errors = {};
  
  if (!name) {
    errors.name = 'Name is required';
  }

  if (!address) {
    errors.address = 'Address is required';
  }

  if (!contact) {
    errors.contact = 'Contact number is required';
  } else if (!/^\d{10}$/.test(contact)) {
    errors.contact = 'Contact number must be 10 digits long';
  }

  if (!registerEmail) {
    errors.registerEmail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
    errors.registerEmail = 'Email address is invalid';
  }

  if (!registerPassword) {
    errors.registerPassword = 'Password is required';
  } else if (registerPassword.length < 6) {
    errors.registerPassword = 'Password must be at least 6 characters long';
  }

  return errors;
};

export const validateForgotPasswordForm = (loginEmail) => {
  const errors = {};

  if (!loginEmail) {
    errors.loginEmail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
    errors.loginEmail = 'Email address is invalid';
  }

  return errors;
};
