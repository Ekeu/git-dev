const catchErrors = (error) => {
  if (error.response) {
    // Server respons with a status !== 2xx
    return error.response.data;
  }

  if (error.request) {
    // No response received from server
    return error.request;
  }

  // Any other error
  return error.message;
};

export const errorsService = {
  catchErrors,
};
