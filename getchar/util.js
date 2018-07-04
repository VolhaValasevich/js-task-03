const request = require('request-promise-native');
class Util {

    constructor() {
        this.url = "https://rickandmortyapi.com/api/character";
    }

    getData(url) {
        let result = [];
        const getchars = (url) => request(url, { json: true })  //recursive function for getting characters from all pages
            .then((body) => {
                result = result.concat(body.results);           //saving results from current page
                if (body.info.next !== "") {                    //checking if it is the last page
                    return getchars(body.info.next);            //if not, get characters from the next page
                } else return result;
            }).catch((err) => { return err; })

        return getchars(url);
    }

    search(args) {
        return new Promise((resolve, reject) => {
            try {
                this.getData(this.url).then((data) => {        //get all data
                    const chars = data.map((el) => {           //creating a new array of characters
                        return this.compare(el, args);         //check current element by all the parameters
                    })
                    resolve(chars);
                })
            } catch (err) { reject(err); }
        })
    }

    compare(el, args) {
        const keys = this.getKeys(args);                                //get all the parameters for search
        let flag = true;                                                //flag to indicate that current character fits the criteria
        for (let i = 0; i < keys.length; i++) {                         //checking multiple parameters
            if (keys[i] == "id") {
                if (el[keys[i]] !== args[keys[i]]) {       //id is a number and has to be an exact match
                    flag = false;                   //if one parameter does not fit the criteria, character is marked as not right
                    break;                          //and cycle breaks
                }
            }
            else if (keys[i] === 'origin' || keys[i] === 'location') {       //"origin" and "location" parameters are objects
                if (el[keys[i]].name.indexOf(args[keys[i]]) === -1) {   //and have to be checked by their .name property
                    flag = false;
                    break;
                }
            } else {
                if (el[keys[i]].indexOf(args[keys[i]]) === -1) {
                    flag = false;
                    break;
                }
            }
        }
        if (flag === true) { return el; }       //if the character is marked as right, return it to the result array
    }

    getKeys(args) {
        const keys = ['id', 'name', 'species', 'status', 'type', 'gender', 'origin', 'location', 'episode'];        //availiable parameters for search 
        const result = [];
        Object.keys(args).forEach((el) => {                 //get keys from command arguments
            if (keys.includes(el)) result.push(el);         //if the key is a search parameter, save it
        })
        if (result.length < 1) throw new Error("You didn't enter a command!");
        return result;
    }

    filter(arr) {               //function for removing empty elements from an array
        return arr.filter((el) => { return el !== undefined; })
    }

    format(data) {              //function for transforming raw data into formatted text
        let result = `Found ${data.length} entries:\n\n`;
        data.forEach((el) => {
            result += `Id: ${el.id};\nName: ${el.name};\nStatus: ${el.status};\nSpecies: ${el.species};\nType: ${el.type};\nGender: ${el.gender};\nOrigin: ${el.origin.name};\nLocation: ${el.location.name}\n\n`
        })
        return result.slice(0, -1);        //removing the last \n to make the text look better in the terminal
    }

}

module.exports = Util;