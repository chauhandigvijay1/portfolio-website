function validate(schema) {
  return function validationMiddleware(request, response, next) {
    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      return next(parsed.error);
    }

    request.body = parsed.data;
    return next();
  };
}

module.exports = { validate };
