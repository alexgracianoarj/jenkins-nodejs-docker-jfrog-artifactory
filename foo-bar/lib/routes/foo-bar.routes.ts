import { Router } from "express";
import { FooBarController } from "../controller/foo-bar.controller";
import * as expressJwt from 'express-jwt';

const authenticate = expressJwt({ secret: 'foo-bar' });

class RoutesFooBar {
    public router: Router;
    private _fooBarController = new FooBarController();

    constructor(){
        this.router = Router();
        this._init();
    }

    private _init(){
        this.router
            .route('/isAlive')
            .get(this._fooBarController.isAlive.bind(this._fooBarController));

        this.router
            .route('/saveFooBar')
            .post(authenticate, this._fooBarController.saveFooBar.bind(this._fooBarController));

        this.router
            .route('/updateFooBar')
            .put(authenticate, this._fooBarController.updateFooBar.bind(this._fooBarController));

        this.router
            .route('/getFooBarById/:id')
            .get(authenticate, this._fooBarController.getFooBarById.bind(this._fooBarController));

        this.router
            .route('/deleteFooBar/:id')
            .delete(authenticate, this._fooBarController.deleteFooBar.bind(this._fooBarController));

        this.router
            .route('/getAllFooBar')
            .get(authenticate, this._fooBarController.getAllFooBar.bind(this._fooBarController));
    }
}
export default new RoutesFooBar().router;

