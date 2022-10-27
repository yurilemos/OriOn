export const setColor = (estilo) => {
  console.log(estilo);
  if (estilo === 'negativo') {
    return 'volcano';
  }
  if (estilo === 'neutro') {
    return 'cyan';
  }
  if (estilo === 'aviso') {
    return 'purple';
  }
  if (estilo === 'positivo') {
    return 'green';
  }
  return 'blue';
};
