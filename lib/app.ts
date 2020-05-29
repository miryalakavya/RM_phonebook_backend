import * as express from "express";
import * as bodyParser from "body-parser";
import { Db } from "./Db";
import { Server } from "@overnightjs/core";
import * as fs from 'fs';

class App extends Server {
    constructor() {
        super();
        this.corsPolicy();
        Db.connect();
        this.loadControllers();
        // this.config();
    }

    
    private corsPolicy() {
        express.Router()
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           
            res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST,DELETE');
            next();
        });
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private config(): void {
       
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private getPath(): string {
        return './controllers';
    }

    private loadControllers() {
        const controllerInstances = [];
        import('./controllers').then((controllers) => {
            console.log('loading all controllers: start');
            for (const name of Object.keys(controllers)) {
                const controller = (controllers as any)[name];
                if (typeof controller === 'function') {
                    controllerInstances.push(new controller());
                }
            }
            this.addControllers(controllerInstances, null);
            console.log('loading all controllers: end');
        });
    }

    public start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log("server start at port :" + PORT);
        })
    }
}

export default App;

