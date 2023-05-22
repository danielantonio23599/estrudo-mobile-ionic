export const trackByCodigo = (o1: any, o2: any) => {
  if (!o1 || !o2) {
    return false;
  }

  return o1.codigo === o2.codigo;
};

export const trackById = (o1: any, o2: any) => {
  if (!o1 || !o2) {
    return false;
  }
  return o1.id === o2.id;
};
