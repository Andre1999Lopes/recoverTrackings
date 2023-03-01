const fs = require('fs');
const MERGE = "MergeContact";
const TRACK = "TrackEvent";
const ENTERING_ACTIONS = "$enteringCustomActions";
const LEAVING_ACTIONS = "$leavingCustomActions";
const optionsJson = {
	"tracking": TRACK,
	"merge": MERGE
}

let option = TRACK;

const [node, archive, botOrigin, botDestination, action] = process.argv;

if (!botOrigin || !botDestination) {
	console.log("botOrigin and botDestination can't be null");
	return;
}

if (action && optionsJson[action]) option = optionsJson[action];


let raw = fs.readFileSync(`${botOrigin}`);
let json = JSON.parse(raw);
let newJson = {};
const flowKeys = Object.keys(json["flow"]);

flowKeys.forEach(key => {
	let blockName = json["flow"][key]["$title"];
	newJson[blockName] = [];

	if (option == TRACK) {
		json["flow"][key][ENTERING_ACTIONS].forEach(action => {
			if (action["type"] == TRACK) newJson[blockName].push(action["$title"]);
		})
	
		json["flow"][key][LEAVING_ACTIONS].forEach(action => {
			if (action["type"] == TRACK) newJson[blockName].push(action["$title"]);
		})
	}

	else if (option == MERGE) {
		json["flow"][key][ENTERING_ACTIONS].forEach(action => {
			if (action["type"] == MERGE) newJson[blockName].push(action["settings"]);
		})
	
		json["flow"][key][LEAVING_ACTIONS].forEach(action => {
			if (action["type"] == MERGE) newJson[blockName].push(action["settings"]);
		})
	}
})

newJsonKeys = Object.keys(newJson)
newJsonKeys.forEach(key => {
	if (newJson[key].length == 0) delete newJson[key];
})
 
let data = JSON.stringify(newJson);
fs.writeFileSync(`${botDestination}`, data);