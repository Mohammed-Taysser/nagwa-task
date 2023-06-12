const statusCode = {
  success: {
    ok: 200,
    created: 201,
  },
  error: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    serverError: 500,
  },
};

class Random {
  static arrayItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length || 0)];
  }
}

module.exports = { statusCode, Random };
