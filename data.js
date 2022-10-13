global.cmdcord_global = {}

let setData = (key, data) => {
	cmdcord_global[key] = data;
}

let getData = key => cmdcord_global[key];

export { setData, getData };