import blessed from "blessed";
import { setData, getData } from "./data.js";
import hook from "./hook.js";

let createLoggingInBox = screen => {
	let cycle = ["|", "/", "-", "\\"]
	let box = blessed.box({
		parent: screen,
		top: 'center',
		left: 'center',
		width: 17,
		height: 3,
		content: '| Logging in...',
		border: {
			type: 'line'
		},
		style: {
			fg: 'white',
			bg: 'black',
			border: {
				fg: '#ffffff'
			},
			hover: {
				bg: 'blue'
			}
		}
	});

	let idx = 0;
	let interval = setInterval(_ => {
		idx++; idx %= 4;
		box.setText(cycle[idx] + " Logging in...")
		box.render();
		screen.render();
		//logger.log(idx, cycle[idx])
	}, 250)
}

let createLoginForm = screen => {
	let form = blessed.form({
		parent: screen,
		top: 'center',
		left: 'center',
		keys: true,
		width: 50,
		height: 7,
		border: {
			type: 'line'
		},
		style: {
			fg: 'white',
			bg: 'black',
			border: {
				fg: '#ffffff'
			},
			hover: {
				bg: 'blue'
			}
		},
		vi: true
	});

	blessed.text({
		parent: form,
		content: 'cmdcord',
		top: 0,
		left: "center",
		bold: true
	});

	blessed.text({
		parent: form,
		content: 'Enter Discord token to log into Discord:',
		top: 1,
		width: "80%",
		left: "center"
	});

	blessed.textbox({
		parent: form,
		name: 'token',
		width: 50 - 7,
		bottom: 0,
		left: 1,
		height: 3,
		border: {
			type: "line"
		},
		inputOnFocus: true,
		content: 'last',
		focus: {
			fg: 'blue'
		}
	}).focus();

	let submit = blessed.button({
		parent: form,
		name: 'submit',
		content: '>',
		right: 1,
		bottom: 1,
		shrink: true,
		style: {
			bold: true,
			fg: 'white',
			bg: 'green',
			focus: {
				inverse: true
			}
		}
	});

	submit.on("press", _ => {
		logger.log("tgetet")
		form.submit()
	})

	form.on("submit", data => {
		form.destroy();
		hook.Call("TokenEntered", [data.token])
		createLoggingInBox(screen);

		screen.render();
	})

	return form;
}

export { createLoginForm, createLoggingInBox };