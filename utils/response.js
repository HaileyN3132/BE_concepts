export function sendSuccess(res, status = 200, data, message = "OK") {
  return res.status(status).json({
    success: true,
    data: data,
    message: message,
    error: null,
  });
}

export function sendError(
  res,
  status = 400,
  message = "ERROR!",
  code,
  detail = null,
) {
  return res.status(status).json({
    success: false,
    data: null,
    message: message,
    error: {
      code: code,
      detail: detail,
    },
  });
}
