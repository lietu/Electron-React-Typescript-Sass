/// <reference path="../typings/node.d.ts" />
/// <reference path="../typings/electron.d.ts" />

import electron = require('electron');
import path = require("path");
import {log} from './backend/log';
import {api} from './backend/api';

let app = electron.app;

let settings = {
    width: 800,
    height: 600
};

function findRoot() {
    return __dirname + "/..";
}

const ROOT = findRoot();
const RELEASE = `file://${ROOT}/index.html`;

class Main {
    mainWindow: electron.BrowserWindow;

    constructor() {
        app.on('ready', this.init.bind(this));
    }

    private init() {
        log.info("Electron ready");

        api.start();

        app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', function () {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.mainWindow === null) {
                this.createWindow();
            }
        }.bind(this));

        this.createWindow();

        this.mainWindow.webContents.on('did-finish-load', () => {
            this.mainWindow.show();
            this.mainWindow.focus();
        });
    }

    private createWindow() {
        log.info("Creating new main window");

        this.mainWindow = new electron.BrowserWindow({
            show: false,
            width: settings.width,
            height: settings.height
        });

        this.mainWindow.on("closed", function () {
            this.mainWindow = null;
        }.bind(this));

        let url = RELEASE;
        if (process.argv.indexOf("--dev") !== -1) {
            log.info("Developer mode enabled!");
            // TODO: Nothing to do here yet, maybe pass the info to client?
        }

        log.info(`Opening ${url}`);

        this.mainWindow.loadURL(url);
    }
}

var main: Main = new Main();
