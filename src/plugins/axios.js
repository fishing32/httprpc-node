const axios = require('axios');

module.exports = (axiosOptions) => {
  const instance = axios.create(axiosOptions);
  return async function transferPlugin(ctx, next) {
    const { options, request = options } = ctx;
    ctx.response = await instance.request(request);
    await next();
  };
};
