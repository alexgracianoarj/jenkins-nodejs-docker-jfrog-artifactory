import {Request, Response} from "express";
import {Controller} from "@decorators/express";
import {ApiOperationPost, ApiOperationPut, ApiPath, ApiOperationGet, ApiOperationDelete} from "swagger-express-ts";
import {Logger} from "../config/logger";

import { FooBarService } from '../services/foo-bar.service';

@ApiPath({
    path: '',
    name: 'FooBar'
})
@Controller('FooBar')
export class FooBarController {
    private readonly _fooBarService: FooBarService = new FooBarService();

    constructor(private _logger = new Logger().initLogger()){}

    @ApiOperationGet({
        description: 'This route will check is the foo bar microservice is alive',
        summary: 'Is Alive Route',
        path: '/isAlive',
        responses: {
            200: {description: 'The foo bar microservice is alive'}
        }
    })
    public isAlive (req:Request, res: Response) {
        res.json({
            message: `The foo bar microservice is running`,
            env: process.env.NODE_ENV
        })
    }
	
    @ApiOperationPost({
        description: 'This route will save the foo bar',
        summary: 'Save the foo bar',
        path: '/saveFooBar',
        parameters: {
            body: {
                description: 'Save the foo bar',
                required: true,
                model: 'FooBar'
            }
        },
        security: {
            ['Bearer']: [
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            ]
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' }
        }
    })
    public saveFooBar (req:Request, res: Response) {
        this._fooBarService
        .saveFooBar(req.body)
        .then(fooBar => res.json(fooBar))
        .catch(err => (console.log(err), res.json(err)))
    }
	
    @ApiOperationPut({
        description: 'This route will update the foo bar',
        summary: 'Update the foo bar',
        path: '/updateFooBar',
        parameters: {
            body: {
                description: 'Update the foo bar',
                required: true,
                model: 'FooBar'
            }
        },
        security: {
            ['Bearer']: [
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            ]
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' }
        }
    })
    public updateFooBar (req:Request, res: Response) {
        this._fooBarService
        .updateFooBar(req.body)
        .then(fooBar => res.json(fooBar))
        .catch(err => (console.log(err), res.json(err)))
    }

    @ApiOperationGet({
        description: 'Get foo bar by id',
        summary: 'Get foo bar by id',
        path : '/getFooBarById/{id}',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: 'string',
                }
            }
        },
        security: {
            ['Bearer']: [
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            ]
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' }
        }
    })
    getFooBarById(req: Request, res: Response){
        this._fooBarService
            .getFooBarById(req.params.id)
            .then(fooBar => res.json(fooBar))
            .catch(err => (console.log(err), res.json(err)))
    }

    @ApiOperationGet({
        description: 'Get all foo bar',
        summary: 'Get all foo bar',
        path : '/getAllFooBar',
        security: {
            ['Bearer']: [
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            ]
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' }
        }
    })
    getAllFooBar(req: Request, res: Response){
        this._fooBarService
            .getAllFooBar()
            .then(allFooBar => res.json(allFooBar))
            .catch(err => (console.log(err), res.json(err)))
    }

    @ApiOperationDelete({
        description: 'Delete foo bar',
        summary: 'Delete foo bar',
        path : '/deleteFooBar/{id}',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: 'string',
                }
            }
        },
        security: {
            ['Bearer']: [
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            ]
        },
        responses: {
            200: { description: 'Success' },
            400: { description: 'Parameters fail' }
        }
    })
    deleteFooBar(req: Request, res: Response){
        this._fooBarService
            .deleteFooBar(req.params.id)
            .then(fooBar => res.json(fooBar))
            .catch(err => (console.log(err), res.json(err)))
    }
}