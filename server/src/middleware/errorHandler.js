export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    status: statusCode,
    message: err.message || 'Server Error',
    data: null,
    pagination: null,
    error: {
      code: err.code || undefined,
      details: err.details || undefined,
    },
    meta: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  });
};
