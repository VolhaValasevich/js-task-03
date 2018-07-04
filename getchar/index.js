const yargs = require("yargs");
const fs = require("fs");
const Util = require("./util.js");

function main() {
    const util = new Util();
    const args = yargs
        .usage("An app to search for a specific character on rickandmortyapi.com")
        .example("$0 -n Rick")
        .alias({
            'i': 'id',
            'n': 'name',
            'u': 'status',
            's': 'species',
            't': 'type',
            'g': 'gender',
            'o': 'origin',
            'l': 'location'
        })
        .argv;

    util.search(args).then((data, err) => {
        if (err) console.log(err);
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
