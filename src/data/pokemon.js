import request from '../utils/request';

export const getDetailPokemon = async ({ queryKey: [_, name] }) => {
  const res = await request(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // throw Error('error request');
  return res.data;
};