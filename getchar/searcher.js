const request = require('request-promise-native');
class Searcher {

    constructor() {
        this.url = "https://rickandmortyapi.com/api/character";
    }

    getData(url) {
        let result = [];
        const getchars = (url) => request(url, { json: true })
            .then((body) => {
                result = result.concat(body.results);
                if (body.info.next !== "") {
                    return getchars(body.info.next);
                } else return result;
            })

        return getchars(url);
    }

    search(args) {
        return new Promise((resolve, reject) => {
            const keys = this.getKeys(args);
            try {
                this.getData(this.url).then((data) => {
                    const chars = data.map((el) => {
                        let flag = true;
                        for (let i = 0; i < keys.length; i++) {
                            if (keys[i] === 'origin' || keys[i] === 'location') {
                                if (el[keys[i]].name.indexOf(args[keys[i]]) === -1) {
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
                        if (flag === true) {
                            return el;
                        }
                    })
                    resolve(chars);
                })
            } catch (err) { reject(err); }
        })
    }

    getKeys(args) {
        const keys = ['id', 'name', 'species', 'status', 'type', 'gender', 'origin', 'location', 'episode'];
        const result = [];
        Object.keys(args).forEach((el) => {
            if (keys.includes(el)) result.push(el);
        })
        if (result.length < 1) throw new Error("You didn't enter a command!");
        return result;
    }

    filter(arr) {
        return arr.filter((el) => { return el !== undefined; })
    }

}

module.exports = Searcher;