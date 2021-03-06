const yargs = require("yargs");
const fs = require("fs");
const Util = require("./util.js");

function main() {
    const util = new Util();
    const args = yargs
        .usage("An app to search for a specific character on rickandmortyapi.com")
        .example("$0 -n Rick")
        .options({
            "i": { alias: "id", describe: "Character ID", type: "number" },
            "n": { alias: "name", describe: "Character name", type: "string" },
            "u": { alias: "status", describe: "Character status", type: "string" },
            "s": { alias: "species", describe: "Character species", type: "string" },
            "t": { alias: "type", describe: "Character type", type: "string" },
            "g": { alias: "gender", describe: "Character gender", type: "string" },
            "o": { alias: "origin", describe: "Character origin", type: "string" },
            "l": { alias: "location", describe: "Character location", type: "string" }
        })
        .argv;

    try {
        util.getKeys(args);             //checking if any valid search parameters were entered before getting the whole database
    } catch (err) {
        console.log(err.message);
        yargs.showHelp();
        return;
    }
    util.search(args).then((data) => {
        const result = util.filter(data);
        if (result.length > 0) {
            const text = util.format(result);
            console.log(text);
            fs.writeFileSync(`result${Date.now()}.json`, JSON.stringify(result));    //Date.now() is used to give each search result file a unique name
        }
        else console.log("No such characters found.");
    }).catch((err) => { console.log(err) })
}

main();
