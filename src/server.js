const fastify = require('fastify')();
const router = require('express').Router();

router.use((req, res, next) => {
  res.setHeader('x-custom', true);
  next();
});

router.get('/hello', (req, res) => {
  res.status(201);
  res.json({ hello: 'world' });
});

router.get('/foo', (req, res) => {
  res.status(400);
  res.json({ foo: 'bar' });
});

fastify.register(require('fastify-express'))
  .after(() => { fastify.use(router); });

fastify.listen(3000, console.log);
