/// <reference path="../typings/electron.d.ts" />
import electron = require("electron");
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Hello} from "./components/Hello";

let ipc = electron.ipcRenderer;

ipc.on("PONG", function (event: any, data: any) {
    console.log("<- pong", data);
    console.log(event);
});

setInterval(function() {
    console.log("-> ping");
    ipc.send("PING", Date.now());
}, 1000);

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React"/>,
    document.getElementById("example")
);
