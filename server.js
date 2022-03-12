/* eslint-disable no-fallthrough */

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const Router = require('koa-router');

const router = new Router();

const Chat = require('./src/Chat');

const ctrl = new Chat();

const app = new Koa();
app.use(cors());
const PORT = process.env.PORT || 7070;

app.use(koaBody({
  text: true,
  urlencoded: true,
  json: true,
  multipart: true,
}));

// eslint-disable-next-line consistent-return
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    // eslint-disable-next-line no-return-await
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set(
        'Access-Control-Allow-Headers',
        ctx.request.get('Access-Control-Allow-Request-Headers'),
      );
    }
    ctx.response.status = 204; // No content
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/api/messages/all', async (ctx) => {
  //console.log(ctx.query)
  const result = ctrl.getAllPosts(ctx.query.start, ctx.query.end);
  ctx.response.body = result;
  //console.log(ctx.response.body);
});

router.get('/api/messages/count', async (ctx) => {
  //console.log(ctx.query)
  const result = ctrl.countAllPosts();
  ctx.response.body = result;
  //console.log(ctx.response.body);
});

router.post('/api/messages/add', async (ctx) => {
  const object = ctx.request.body;
  const result = ctrl.createTextPost(object);
  ctx.response.body = result;
  //console.log(ctx.response.body);
});

app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
