export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email) && email.length > 0 ? 'Invalid email format' : '';
};

export const validatePassword = (password: string): string => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (/\s/.test(password)) {
    return 'Password cannot contain spaces';
  }
  return '';
};
