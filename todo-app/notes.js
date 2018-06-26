const notes = {
    file: "./todo.json",
    fs: require("fs"),
    add: (new_note) => {
        const all_data = notes.checkfile(notes.file);
        if (all_data.notes.findIndex((el) => { if (el.title === new_note.title) return true; }) === -1) {   //check if the note title is unique
            all_data.notes.push(new_note);
            notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
            return "Note was successfully added";
        } else return "This note already exists!";

    },
    list: () => {
        let resultstring = "";
        const all_data = notes.checkfile(notes.file); 
        all_data.notes.forEach((element, index) => {
            resultstring += `Note ${index}:\n${element.title} - ${element.body}\n`;
        })
        return resultstring;
    },
    read: (title) => {
        const all_data = notes.checkfile(notes.file);
        let i;      //a variable for storing element's index
        if ((i = all_data.notes.findIndex((el) => { if (el.title === title) return true; })) !== -1) {    //checking if a note with this title exists
            return all_data.notes[i].title + " - " + all_data.notes[i].body;
        } else return "No such note found";
    },
    remove: (title) => {
        const all_data = notes.checkfile(notes.file);
        let i;      //a variable for storing element's index
        if ((i = all_data.notes.findIndex((el) => { if (el.title === title) return true; })) !== -1) {  //checking if a note with this title exists
            all_data.notes.splice(i, 1);        
            notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
            return "Note was successfully deleted";
        } else return "No such note found";
    },
    checkfile: (file) => {
        const default_content = '{"notes":[]}';     //default json string that will be written in the file if it is corrupted or empty
        try {
            const all_data = require(file);         //trying to get json object from file
            return all_data;
        } catch (err) {
            notes.fs.writeFileSync(file, default_content, "utf-8");
            return JSON.parse(default_content);     //returning default json object
        }
    }
}

module.exports = notes;