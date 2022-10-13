import { setData, getData } from "./data.js";
import hook from "./hook.js";
import { Console } from "console";
import fs from "fs"

var logout = fs.createWriteStream("logout.log")
var logerr = fs.createWriteStream("logerr.log")
global.logger = new Console(logout, logerr);

import blessed from "blessed";
var screen = blessed.screen({
	smartCSR: true
});

hook.Add("TokenEntered", "Test", token => {
	logger.log("pp", token)
	//screen.destroy();
})

import { createLoginForm } from "./login_box.js";
createLoginForm(screen);

screen.key(['q', "escape", "C-c"], _ => {
	screen.destroy();
});

setInterval(_ => {
	screen.render();
}, 100)

// Render the screen.
screen.render();
