import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8001");


// https://dev.to/am77/deno-v1-0-303j
// 