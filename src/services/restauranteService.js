import restauranteRepository from '../repositories/restauranteRepository.js';

const getAllRestaurantes = async () => {
  return await restauranteRepository.findAll();
};

export default {
  getAllRestaurantes,
};
