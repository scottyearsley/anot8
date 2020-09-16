import {
  Application,
  send,
  Router,
  Status,
  Context,
} from 'https://deno.land/x/oak/mod.ts';
import { SkinsController } from './controllers/SkinsController.ts';
import { FileSkinRepository } from './repository/FileSkinRepository.ts';
import { ISkinRepository } from './repository/ISkinRepository.ts';
import { FileDatabase } from './repository/FileDatabase.ts';

const skinRepository: ISkinRepository = new FileSkinRepository();
const skinsController = new SkinsController(skinRepository);

const app = new Application();
const router = new Router();

router
  .get('/api/skins', (ctx) => {
    //list
    const skins = skinsController.list();

    if (skins) {
      ctx.response.body = skins;
    }
  })
  .get('/api/skins/:id', (ctx) => {
    if (ctx.params && ctx.params.id) {
      const skin = skinsController.get(ctx.params.id);

      if (skin) {
        ctx.response.body = skin;
      }
    }
  })
  .post('/api/skins', async (ctx) => {
    const body = ctx.request.hasBody ? ctx.request.body() : null;
    let skin = await body?.value; //this deserializes the body to json but can throw, this is the happy path

    skin = skinsController.add(skin);
    ctx.response.body = skin; //setting the response body automatically creates a 200 response
  })
  .put('/api/skins/:id', async (ctx) => {
    const body = ctx.request.hasBody ? ctx.request.body() : null;
    let skin = await body?.value; //this deserializes the body to json but can throw, this is the happy path
    skin = skinsController.update(skin);
    ctx.response.body = skin; //setting the response body automatically creates a 200 response
  })
  .delete('/api/skins/:id', (ctx) => {
    if (ctx.params && ctx.params.id) {
      const skin = skinsController.delete(ctx.params.id);
      ctx.response.body = skin; //setting the response body automatically creates a 200 response
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/client/dist`,
    index: 'index.html',
  });
});

await app.listen({ port: 8088 });
