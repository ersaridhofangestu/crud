export const saveLoginDataToLocalStorage = (email: string) => {
  localStorage.setItem('email', email);
};
