function main() {
    const Notes = require("./notes.js");
    const notes = new Notes();
    const yargs = require("yargs")
        .usage(`Simple todo app\nUsage: $0 <command> <arguments>`)
        .example('$0 add -t [title] -b [body]', 'add a new note')
        .example('$0 list', 'list all notes')
        .example('$0 read -t [title]', 'read a note by title')
        .example('$0 remove -t [title]', 'remove a note by title')
        .alias({
            't': 'title',
            'b': 'body',
            'p': 'parameter',
            'o': 'order',
            'f': 'file',
            'n' : 'newtitle'
        })
        .demandCommand(1, "You didn't enter a command!")
        .command('add', 'add a new note', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title' })
            yargs.options('b', { demand: true, desc: 'Note body' })
        }, (yargs) => {
            const date = notes.dateToString(new Date(Date.now()));
            const new_note = {
                title: yargs.title,
                body: yargs.body,
                date: date, 
            };
            const result = notes.add(new_note);
            console.log(result);
        })
        .command('list', 'list all notes', () => {
            const result = notes.list();
            console.log(result);
        })
        .command('read', 'read a note by title', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title' })
        }, (yargs) => {
            const title = yargs.title;
            const result = notes.read(title);
            console.log(result);
        })
        .command('remove', 'remove a note by title', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title' })
        }, (yargs) => {
            const title = yargs.title;
            const result = notes.remove(title);
            console.log(result);
        })
        .command('sort', 'sort all notes by date, title/body length or alphabetial order', (yargs) => {
            yargs.options('p', { demand: false, default: 'title', desc: 'Parameter to sort notes by (date, titlelength, bodylength, title)'})
            yargs.options('o', { demand: false, default: 'asc', desc: 'Order of sorting (asc, desc)'})
        }, (yargs) => {
            const param = yargs.parameter;
            const order = yargs.order;
            const result = notes.sort(param, order);
            console.log(result);
        })
        .command('readExcel', 'import notes from a .xslx file', (yargs) => {
            yargs.options('f', { demand: true, desc: 'Path to XLSX file with notes'});
        }, (yargs) => {
            const file = yargs.file;
            const result = notes.readFromExcel(file);
            console.log(result);
        })
        .command('writeExcel', 'export notes to a .xslx file', (yargs) => {
            yargs.options('f', { demand: true, desc: 'Path to a result XLSX file'});
        }, (yargs) => {
            const file = yargs.file;
            const result = notes.writeToExcel(file);
            console.log(result);
        })
        .command('update', 'update a selected note', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title'});
            yargs.options('n', { demand: false, desc: 'New title'});
            yargs.options('b', { demand: false, desc: 'New body'});
        }, (yargs) => {
            let title = yargs.title;
            const newtitle = yargs.n;
            const newbody = yargs.b;
            let result;
            if (newtitle === undefined && newbody === undefined) console.log("Enter parameter you want to update: --newtitle or --body");
            if (newtitle !== undefined) {
                result = notes.update('title', title, newtitle);
                title = newtitle;
            }
            if (newbody !== undefined) { result = notes.update('body', title, newbody); }
            if (result !== undefined) console.log(result);
        })
        .argv;
}

main();