const compose = require('koa-compose');
const _ = require('lodash');
const axios = require('./plugins/axios');

function createRequestContext(options) {
  return { options };
}

module.exports = (...args) => {
  const specialNames = [
    'namingPlugin',
    'transferPlugin',
  ];
  const {
    plugins,
    namingPlugin,
    transferPlugin = [axios],
  } = _.groupBy(args, (fn) => (specialNames.indexOf(fn.name) === -1 ? 'plugins' : fn.name));

  const [transfer] = transferPlugin;

  if (namingPlugin) plugins.push(namingPlugin[0]);
  plugins.push(transfer);

  const fn = compose(plugins);
  return async (options) => {
    const ctx = createRequestContext(options);
    await fn(ctx);
    return ctx.resp || ctx.response;
  };
};
