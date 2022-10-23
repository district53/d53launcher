# Minetest Launcher

**NOTE:** Here be dragons. This is _very_ early in development, and is **not** production-ready.

This is an alternative Minetest launcher written as a Tauri application (Electron, but _fast_) with SvelteKit.

This currently is only guaranteed to work on Windows. MacOS only has a public Minetest build for 5.6.0 and there are no
trusted AppImage files for Linux (that I know of).

## Requirements
- Follow https://tauri.app/v1/guides/getting-started/prerequisites/
- Install NodeJs `16.14` or higher

## From source
```
git clone https://github.com/district53/d53launcher
cd d53launcher
yarn install
yarn dev
```

Use `yarn build` to build a self-contained binary **for your current distribution**. Cross builds do not work in Tauri at the moment.

## How does it work
- Tauri apps use a native web view component to load the application (which is actually just a fancy webpage)
- Downloads go to a specific directory (see more below)
- The frontend just politely requests the Tauri backend to launch Minetest

### Does this support custom installations?

(not in this exact build bc i had to rewrite like half of the version logic borpaSpin)
**Yes, but** only if:
- the installation is in your `versions/` directory
- the installation contains the following sub-directories: `bin/`, `games/`, `mods/`, `textures/`, `screenshots/`, `worlds/`

## licensing
this project uses a few external things:
- [feather icons](https://feathericons.com/) - licensed under the MIT license
- [quicksand font](https://fonts.google.com/specimen/Quicksand) - licensed under the OFL
- [svelte-headless-table](https://github.com/bryanmylee/svelte-headless-table) - licensed under the MIT license

this project also modifies the [minetest logo](https://www.minetest.net/media/icon.svg) which is licensed under **CC-BY-SA 3.0**.
the modified logo is used in the following locations, and as such are licensed as **CC-BY-SA 3.0**:
- `src-tauri/icons/*`
- `src/lib/icon/Logo.svelte`