# Electron-React-Typescript-Sass

A skeleton for building Electron applications using TypeScript and React. The
compilation is automated with Gulp and WebPack.


## How does it work?

Inside the `src/` -directory we have two applications written in TypeScript.

The `src/launcher.ts` and `src/backend/` -directory's contents are for the
backend part of the Electron application, i.e. if you want to do filesystem
changes or other things that require IPC between the backend and the browser
windows.

The `src/index.tsx` and `src/components` -directory's contents are for the
frontend part of the Electron application, anything visible to the end-user.

Electron will run the backend code in `launcher.ts` and then launches a browser
window that opens the `index.html` -file, which will run your frontend code. 

Sass compilation is set up from the `style/style.scss` -file and imports to
`dist/style.css` automatically using `gulp-sass`.


## Setup

Clone this repository and run the following in the repository root directory:

```bash
npm install -g gulp
npm install
```


## Usage

To automatically compile both frontend and backend, and watch for changes run:

```bash
gulp
```

Then open another terminal window and run:

```bash
electron dist/launcher.js
```


*TODO*:

 - Set up a complete release build process and `gulp release` -task.


# Financial support

This project has been made possible thanks to [Cocreators](https://cocreators.ee) and [Lietu](https://lietu.net). You can help us continue our open source work by supporting us on [Buy me a coffee](https://www.buymeacoffee.com/cocreators).

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/cocreators)
