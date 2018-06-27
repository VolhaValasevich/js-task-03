const fs = require("fs");

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
        if (num < 10) {
            return '0' + num;
        } else return num;
    }
}

module.exports = Notes;