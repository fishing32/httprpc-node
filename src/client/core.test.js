const logger = require('pino')();
const createClient = require('./core');

test('2 middleware', () => {
  const request = createClient(
    async (ctx, next) => { await next(); },
    async (ctx, next) => { ctx.resp = '2'; await next(); },
  );
  return expect(request({})).resolves.toBe('2');
});

test('break middleware', () => {
  const request = createClient(
    async (ctx) => { logger.debug('1'); ctx.resp = '1'; },
    async (ctx, next) => { logger.debug('2'); ctx.resp = '2'; await next(); },
  );
  return expect(request({})).resolves.toBe('1');
});
