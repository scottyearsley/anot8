import { Application, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello world!";
// });

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/client/dist`,
    index: "index.html",
  });
});

await app.listen({port: 8088});


// https://dev.to/am77/deno-v1-0-303j
// 