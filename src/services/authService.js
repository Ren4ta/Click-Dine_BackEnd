import authRepository from '../repositories/authRepository.js';

const login = async (mail, contrasena) => {
  return await authRepository.verifyUser(mail, contrasena);
};

export default { login };
