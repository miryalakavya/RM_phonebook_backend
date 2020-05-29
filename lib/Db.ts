
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';

export class Db {

    static config={
        dbhost:'localhost',
        dbname:'contact',
        dbusername:'',
        dbpassword:'',
        dbsource:'admin'
    }
    public static connect() {
        const dbUri="mongodb://kavya:kavya0207@ds119768.mlab.com:19768/contacts";
        let dbUrl = dbUri,
            opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoReconnect: true,
                reconnectInterval: 5000,
                reconnectTries: Number.MAX_VALUE
            };
        if (this.config.dbusername && this.config.dbpassword && this.config.dbsource) {
            dbUrl = 'mongodb://' + this.config.dbusername + ':' +
            this.config.dbpassword + '@' + this.config.dbhost +
                '/' + this.config.dbname + '?authSource=' + this.config.dbsource
        }

        return new Promise(async resolve => {
            try {
                mongoose.connection.on('connected', () => { console.log('Db connected'); });
                mongoose.connection.on('close', () => { console.log('lost Db connection'); });
                mongoose.connection.on('reconnected', () => { console.log('Db reconnected'); });
                mongoose.connection.on('error', () => { console.log('Db connection error'); });
                await mongoose.connect(dbUrl, opts);
                resolve();
            } catch (err) {
                console.log('Error while db connection ' + JSON.stringify(err));
            }

        });
    }
}