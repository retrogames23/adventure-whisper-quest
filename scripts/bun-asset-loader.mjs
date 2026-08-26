/**
 * Bun-Preload: Asset-Importe (Bilder, Audio, Video) in Node-Skripten
 * auflösbar machen. Vite ersetzt sie im Build durch URLs — im Headless-Lauf
 * genügt der Pfad als String.
 */
import { plugin } from "bun";

const ASSET_RE = /\.(jpg|jpeg|png|svg|webp|gif|mp3|wav|mp4|webm|ttf|woff2?)$/;

plugin({
  name: "asset-stub",
  setup(build) {
    build.onLoad({ filter: ASSET_RE }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
  },
});
