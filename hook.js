global.hooks = {}

let hook = {
	Add: (ev, name, func) => {
		if (hooks[ev] == undefined) hooks[ev] = {}
		hooks[ev][name] = func
	},
	Run: (ev, args) => {
		if (hooks[ev] == undefined) return;
		
		let ret
		Object.keys(hooks).forEach(hook => {
			let res = hooks[hook](...args)
			if (res != undefined) {
				ret = res
				return
			}
		})
		return ret
	},
	Call: (ev, args) => {
		if (hooks[ev] == undefined) return;

		Object.keys(hooks[ev]).forEach(hook => {
			hooks[ev][hook](...args)
		})
	},
	Remove: (ev, name) => {
		if (hooks[ev] == undefined) return;
		hooks[ev][name] = undefined
	}
}

export default hook;