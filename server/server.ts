
import { Application, send, Router } from "https://deno.land/x/oak/mod.ts";
import { SkinsController } from './controllers/SkinsController';

const skinsController = new SkinsController();

const app = new Application();

const router = new Router();
router
  .get("/api/skins", (context) => {

    // get model -  context.request....
    skinsController.add();

    context.response.body = "Hello world!";
  });
  // .get("/book", (context) => {
  //   context.response.body = Array.from(books.values());
  // })
  // .get("/book/:id", (context) => {
  //   if (context.params && context.params.id && books.has(context.params.id)) {
  //     context.response.body = books.get(context.params.id);
  //   }
  // });


app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/client/dist`,
    index: "index.html",
  });
});

await app.listen({port: 8088});
