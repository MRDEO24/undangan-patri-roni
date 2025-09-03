export const throwError = (name, description) => {
  const error = new Error(description);
  error.name = name;

  throw error;
};