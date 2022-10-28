import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
	  alias: {
		stream: "rollup-plugin-node-polyfills/polyfills/stream",
		events: "rollup-plugin-node-polyfills/polyfills/events",
		assert: "rollup-plugin-node-polyfills/polyfills/assert",
		assert2: "rollup-plugin-node-polyfills/polyfills/assert",
		buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
		crypto: "crypto-browserify",
		util: "util",
	  },
	},
	define: {
	  "process.env": process.env ?? {},
	},
	build: {
	  target: "es2020",
	  rollupOptions: {
		plugins: [nodePolyfills({ crypto: true })],
	  },
	},
	optimizeDeps: {
	  esbuildOptions: {
		plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		target: "es2020",
	  },
	},
  });
  