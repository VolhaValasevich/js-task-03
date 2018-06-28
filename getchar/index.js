const yargs = require("yargs");
const Searcher = require("./searcher.js");

function main() {
    const searcher = new Searcher();
    const args = yargs
        .usage("An app to search for a specific character on rickandmortyapi.com")
        .example("$0 -n Rick")
        .alias({
            'i' : 'id',
            'n': 'name',
            'u': 'status',
            's': 'species',
            't': 'type',
            'g': 'gender',
        })
        .argv;

    searcher.search(args).then((data, err) => {
        if (err) console.log(err);
        const result = searcher.filter(data);
        if (result.length > 0) console.log(result);
        else console.log("No such characters found.");
    })
}

main();
