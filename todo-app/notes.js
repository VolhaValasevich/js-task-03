const fs = require("fs");
const xlsx = require("xlsx");

class Notes {
    constructor() {
        this.file = "./todo.json";
    }
    add(newnote) {
        const alldata = this.checkfile(this.file);
        if (alldata.notes.findIndex((el) => {
            if (el.title === newnote.title) return true;
        }) === -1) {   //check if the note title is unique
            alldata.notes.push(newnote);
            this.write(JSON.stringify(alldata));
            return "Note was successfully added";
        } else return "This note already exists!";

    }

    list() {
        let resultstring = "";
        const alldata = this.checkfile(this.file);
        alldata.notes.forEach((element, index) => {
            resultstring += `Note ${index}:\n${element.title} - ${element.body};\nCreated on ${element.date}\n`;
        })
        return resultstring;
    }

    read(title) {
        const alldata = this.checkfile(this.file);
        let returnstring;      //a variable for storing element's index
        if ((alldata.notes.findIndex((el) => {
            if (el.title === title) {
                returnstring = `Note:\n${el.title} - ${el.body};\nCreated on ${el.date}\n`;
                return true;
            };
        })) !== -1) {    //checking if a note with this title exists
            return returnstring;
        } else return "No such note found";
    }

    remove(title) {
        const alldata = this.checkfile(this.file);
        let i;      //a variable for storing element's index
        if ((i = alldata.notes.findIndex((el) => {
            if (el.title === title) return true;
        })) !== -1) {  //checking if a note with this title exists
            alldata.notes.splice(i, 1);
            this.write(JSON.stringify(alldata));
            return "Note was successfully deleted";
        } else return "No such note found";
    }

    sort(param, order) {
        let resultstring = "";
        const alldata = this.checkfile(this.file);
        const sorteddata = alldata.notes.sort((a, b) => {
            switch (param) {
                case 'date': {
                    if (order === 'asc') return this.stringToDate(a.date).getTime() > this.stringToDate(b.date).getTime();
                    else return this.stringToDate(b.date).getTime() > this.stringToDate(a.date).getTime();
                }
                case 'titlelength': {
                    if (order === 'asc') return a.title.length > b.title.length;
                    else return b.title.length > a.title.length;
                }
                case 'bodylength': {
                    if (order === 'asc') return a.body.length > b.body.length;
                    else return b.body.length > a.body.length;
                }
                case 'title': {
                    if (order === 'asc') return a.title.toString() > b.title.toString();
                    else return b.title.toString() > a.title.toString();
                }
                default: throw err(`Unknown parameter '${param}'!`)
            }
        })
        this.write(`{"notes":${JSON.stringify(sorteddata)}}`);
        sorteddata.forEach((element, index) => {
            resultstring += `Note ${index}:\n${element.title} - ${element.body};\nCreated on ${element.date}\n`;
        })
        return resultstring;
    }

    update(param, title, newinfo) {
        const alldata = this.checkfile(this.file);
        let i;
        if ((i = alldata.notes.findIndex((el) => {              //checking if a note with this title exists
            if (el.title === title) { return true; }
        })) !== -1) {                                    
            if (param === 'title') alldata.notes[i].title = newinfo;
            else alldata.notes[i].body = newinfo;
            this.write(JSON.stringify(alldata));
            return "Note was successfully updated";
        } else return "No such note found";
    }

    writeToExcel(file) {
        try {
            const alldata = this.checkfile(this.file);
            let data = `title\tbody\tdate\n`;
            //const workbook = xlsx.utils.book_new();
            //xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(alldata.notes), "Notes");
            //xlsx.writeFile(workbook, file);
            alldata.notes.forEach((el, index) => {
                data += `${el.title}\t${el.body}\t${el.date}\n`
            })
            fs.writeFileSync(file, data.slice(0, -1));
            return "Notes were successfully exported."
        } catch (err) { return err; }
    }

    readFromExcel(file) {
        try {
            /*const datasheet = xlsx.readFile(file).Sheets["Notes"];
            const data = JSON.stringify(xlsx.utils.sheet_to_json(datasheet));
            const result = `{"notes":${data}}`;*/
            const alldata = JSON.parse('{"notes":[]}');
            const data = fs.readFileSync(file, "utf-8").split("\n").slice(1);
            data.forEach((el) => {
                el = el.split("\t");
                const note = {
                    title : el[0],
                    body : el[1],
                    date : el[2]
                };
                alldata.notes.push(note);
            })
            this.write(JSON.stringify(alldata));
            return "Notes were successfully imported";
        } catch (err) { return err; }
    }

    checkfile(file) {
        const defaultcontent = '{"notes":[]}';     //default json string that will be written in the file if it is corrupted or empty
        try {
            const alldata = require(file);         //trying to get json object from file
            return alldata;
        } catch (err) {
            this.write(defaultcontent);
            return JSON.parse(defaultcontent);     //returning default json object
        }
    }

    write(data) {
        fs.writeFileSync(this.file, data, "utf-8");
    }

    dateToString(date) {
        const day = this.addZero(date.getDate());
        const month = this.addZero(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = this.addZero(date.getHours());
        const minutes = this.addZero(date.getMinutes());
        const seconds = this.addZero(date.getSeconds());
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    stringToDate(str) {
        const date = str.split(" ")[0].split("/");
        const time = str.split(" ")[1].split(":");
        const day = date[0];
        const month = date[1] - 1;
        const year = date[2];
        const hours = time[0];
        const minutes = time[1];
        const seconds = time[2];
        return new Date(year, month, day, hours, minutes, seconds);
    }

    addZero(num) {
        if (num < 10) return '0' + num;
        else return num;
    }
}

module.exports = Notes;