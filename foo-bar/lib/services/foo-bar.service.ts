import { BaseService } from './base.service';
import { FooBar } from '../model/foo-bar.model';
import { ApiException } from './api-exception.model';

/**
 *
 * @export
 * @class FooBarService
 * @extends {BaseService<FooBar>}
 */
export class FooBarService extends BaseService<FooBar> {
    constructor(
        private readonly _fooBarModel = new FooBar().getModelForClass(FooBar)
    ){
        super();
        this._model = _fooBarModel;
    }
	
    async saveFooBar(fooBar): Promise<ApiException | FooBar> {
		
        const _fooBar = await this.create(fooBar);      

        return !_fooBar ? 
            {
                statusCode: 404,
                message: 'Some error has happened',
                timestamp: new Date().getTime().toString()
            } :
            (console.log(_fooBar),
                fooBar
            )
    }
	
    async updateFooBar(fooBar): Promise<ApiException | FooBar> {
		
        const _fooBar = await this.update(fooBar._id, fooBar);      

        return !_fooBar ? 
            {
                statusCode: 404,
                message: 'Some error has happened',
                timestamp: new Date().getTime().toString()
            } :
            (console.log(_fooBar),
                fooBar
            )
    }

    async getFooBarById(id):Promise<FooBar | any> {
        return await this.findById(id);
    }

    async getAllFooBar():Promise<FooBar[] | any[]> {
        return await this.findAll({});
    }

    async deleteFooBar(id):Promise<FooBar | any> {
        return await this.delete(id);
    }
}