import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as path from 'path';
import * as swagger from 'swagger-express-ts';
import * as dotenv from 'dotenv';

import RoutesFooBar from '../routes/foo-bar.routes';

class App {
    public app: express.Application;

    constructor(){
        this.app = express();
        this._defineEnv();
        this._config();
        this._mongoSetup();
        this._routes();
        this._configSwagger();
    }

    public _config() : void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));

        this.app.use(cors({
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        }));
    }

    public _mongoSetup() : void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
        mongoose.connection.on('connected', () => console.log('Connected with MongoDB'));
        mongoose.connection.on('error', (error) => console.log('Error on connection. ' + error));
        mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
        process.on('SIGINT', ()=> {
            mongoose.connection.close(()=>{
                console.log('connection with MongoDB closed.');
                process.exit(0);
            })
        })
    }

    public _routes() : void {
        this.app.use('/doc/', express.static(path.join('documentation')));
        this.app.use('/api/', RoutesFooBar);
    }

    private _configSwagger() : void {
        this.app.use('/api-docs/swagger', express.static(path.join('swagger')));
        this.app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        this.app.use(swagger.express({
            definition : {
                info : {
                    title : 'Microservice foo bar' ,
                    version : '1.0'
                } ,
                externalDocs : {
                    url : `localhost:${process.env.PORT}/api-docs/swagger`
                },
                securityDefinitions : {
                    Bearer : {
                        type : 'apiKey',
                        in : 'header',
                        name : 'Authorization'
                    }
                },
                basePath: '/api/'
            }
        }));
    }

    private _defineEnv(): void {
        dotenv.config();

        switch(process.env.NODE_ENV){
            case 'dev':
                dotenv.config({path: `${process.cwd()}/.env.dev`});
                break;
            case 'prod':
                dotenv.config({path: `${process.cwd()}/.env.prod`});
                break;
            case 'qa':
                dotenv.config({path: `${process.cwd()}/.env.qa`});
                break;

            default:
                console.log('Environment not identified. Running default = dev. NODE_ENV is set to ', process.env.NODE_ENV);
                dotenv.config({path: `${process.cwd()}/.env.dev`});
        }
    }
}

export default new App().app;