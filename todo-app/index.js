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
            'o': 'order'
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
            console.log(notes.add(new_note));
        })
        .command('list', 'list all notes', () => {
            console.log(notes.list());
        })
        .command('read', 'read a note by title', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title' })
        }, (yargs) => {
            const title = yargs.title;
            console.log(notes.read(title));
        })
        .command('remove', 'remove a note by title', (yargs) => {
            yargs.options('t', { demand: true, desc: 'Note title' })
        }, (yargs) => {
            const title = yargs.title;
            console.log(notes.remove(title));
        })
        .command('sort', 'sort all notes by date, title/body length or alphabetial order', (yargs) => {
            yargs.options('p', { demand: true, desc: 'Parameter to sort notes by (date, titlelength, bodylength, title)'})
            yargs.options('o', { demand: true, desc: 'Order of sorting (asc, desc)'})
        }, (yargs) => {
            const param = yargs.parameter;
            const order = yargs.order;
            console.log(notes.sort(param, order));
        })
        .argv;
}

main();