"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mongoose = require("mongoose");
let Db = /** @class */ (() => {
    class Db {
        static connect() {
            const dbUri = "mongodb://kavya:kavya0207@ds119768.mlab.com:19768/contacts";
            let dbUrl = dbUri, opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoReconnect: true,
                reconnectInterval: 5000,
                reconnectTries: Number.MAX_VALUE
            };
            if (this.config.dbusername && this.config.dbpassword && this.config.dbsource) {
                dbUrl = 'mongodb://' + this.config.dbusername + ':' +
                    this.config.dbpassword + '@' + this.config.dbhost +
                    '/' + this.config.dbname + '?authSource=' + this.config.dbsource;
            }
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                try {
                    mongoose.connection.on('connected', () => { console.log('Db connected'); });
                    mongoose.connection.on('close', () => { console.log('lost Db connection'); });
                    mongoose.connection.on('reconnected', () => { console.log('Db reconnected'); });
                    mongoose.connection.on('error', () => { console.log('Db connection error'); });
                    yield mongoose.connect(dbUrl, opts);
                    resolve();
                }
                catch (err) {
                    console.log('Error while db connection ' + JSON.stringify(err));
                }
            }));
        }
    }
    Db.config = {
        dbhost: 'localhost',
        dbname: 'contact',
        dbusername: '',
        dbpassword: '',
        dbsource: 'admin'
    };
    return Db;
})();
exports.Db = Db;
//# sourceMappingURL=Db.js.map