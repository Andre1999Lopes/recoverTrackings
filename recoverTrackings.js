const fs = require('fs');

const [node, archive, botOrigin, botDestination] = process.argv;

if (!botOrigin || !botDestination) {
	console.log("botOrigin and botDestination can't be null");
	return;
}

let raw = fs.readFileSync(`${botOrigin}`);
let json = JSON.parse(raw);
let newJson = {};
const flowKeys = Object.keys(json["flow"]);

flowKeys.forEach(key => {
	let blockName = json["flow"][key]["$title"];
	newJson[blockName] = [];

	json["flow"][key]["$enteringCustomActions"].forEach(action => {
		if (action["type"] == "TrackEvent") newJson[blockName].push(action["$title"]);
	})

	json["flow"][key]["$leavingCustomActions"].forEach(action => {
		if (action["type"] == "TrackEvent") newJson[blockName].push(action["$title"]);
	})
})

newJsonKeys = Object.keys(newJson)
newJsonKeys.forEach(key => {
	if (newJson[key].length == 0) delete newJson[key];
})

let data = JSON.stringify(newJson);
fs.writeFileSync(`${botDestination}`, data);