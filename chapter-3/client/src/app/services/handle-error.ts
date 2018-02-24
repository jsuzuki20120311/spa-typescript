export const handleError = function (error: any) {
  const errorMessage = error.message || error.json().message || 'Server error';
  throw new Error(errorMessage);
};
