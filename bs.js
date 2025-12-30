// bs.js
import browserSync from "browser-sync";

browserSync({
  proxy: "http://localhost:3000",
  files: ["app/template/**/*.*"],
  port: 4000,
  open: true
});
