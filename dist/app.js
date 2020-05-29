"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Db_1 = require("./Db");
const core_1 = require("@overnightjs/core");
class App extends core_1.Server {
    constructor() {
        super();
        this.corsPolicy();
        Db_1.Db.connect();
        this.loadControllers();
        // this.config();
    }
    corsPolicy() {
        express.Router();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST,DELETE');
            next();
        });
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    getPath() {
        return './controllers';
    }
    loadControllers() {
        const controllerInstances = [];
        Promise.resolve().then(() => require('./controllers')).then((controllers) => {
            console.log('loading all controllers: start');
            for (const name of Object.keys(controllers)) {
                const controller = controllers[name];
                if (typeof controller === 'function') {
                    controllerInstances.push(new controller());
                }
            }
            this.addControllers(controllerInstances, null);
            console.log('loading all controllers: end');
        });
    }
    start() {
        this.app.listen(3000, () => {
            console.log("server start at port :" + 3000);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map