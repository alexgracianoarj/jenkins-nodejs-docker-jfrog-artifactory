import 'automapper-ts';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import {Types} from 'mongoose';

export abstract class BaseService<T extends Typegoose>{
    protected _model: ModelType<T>;

    private get ModelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    /**
     * This function should be use to ignore any variable from an object in a fast way
     * Just give to the function the object and the variable you want to ignore
     * If you want, you can pass the sourceKey and the destinationKey. But it is not necessary
     *
     * @template K
     * @param {Object} object
     * @param {string} whatToIgnore
     * @param {string} [sourceKey=this.ModelName]
     * @param {string} [destinationKey=this.viewModelName]
     * @returns {Promise<any>}
     * @memberof BaseService
     */
    async ignore<K> (
        object: Object,
        whatToIgnore: string,
        sourceKey: string = this.ModelName,
        destinationKey: string = this.viewModelName
    ): Promise<any> {
        automapper
            .createMap(sourceKey, destinationKey)
            .forMember(whatToIgnore, function(opts) { opts.ignore(); })
        return automapper.map(sourceKey, destinationKey, object);
    }

    /**
     * Find all mongoose function. You can add filter and exclude param
     *
     * @param {*} [filter={}]
     * @param {*} [exclude={}]
     * @returns {Promise<InstanceType<T>[]>}
     * @memberof BaseService
     */
    async findAll(filter = {}, exclude = {}): Promise<InstanceType<T>[]> {
        return this._model.find(filter, exclude).exec();
    }

    /**
     * Find one mongoose function. You can add filter and exclude param
     *
     * @param {*} [filter={}]
     * @param {*} [exclude={}]
     * @returns {Promise<InstanceType<T>>}
     * @memberof BaseService
     */
    async findOne(filter = {}, exclude = {}): Promise<InstanceType<T>> {
        return this._model.findOne(filter, exclude).exec();
    }

    /**
     * Find by ind mongoose function with a required id param
     *
     * @param {string} id
     * @returns {Promise<InstanceType<T>>}
     * @memberof BaseService
     */
    async findById(id: string): Promise<InstanceType<T>> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    /**
     * Create mongoose function. Required instancetype param
     *
     * @param {InstanceType<T>} item
     * @returns {Promise<InstanceType<T>>}
     * @memberof BaseService
     */
    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.create(item);
    }

    /**
     * Delete function with required id param
     *
     * @param {string} id
     * @returns {Promise<InstanceType<T>>}
     * @memberof BaseService
     */
    async delete(id: string): Promise<InstanceType<T>> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    /**
     *  Update mongoose function. ID and Item required parameters. 
     * 
     * This function will insert the item in the database if it is not already in
     * 
     * It will respond with the newer document
     *
     * @param {string} id
     * @param {InstanceType<T>} item
     * @returns {Promise<InstanceType<T>>}
     * @memberof BaseService
     */
    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.findOneAndUpdate({_id: this.toObjectId(id)}, item, {new: true, upsert: true});
    }

    /**
     * Clear collection mongoose function
     *
     * @param {*} [filter={}]
     * @returns {Promise<any>}
     * @memberof BaseService
     */
    async clearCollection(filter= {}): Promise<any> {
        return this._model.deleteMany(filter).exec();
    }

    /**
     * To ObjectId function. It is nice to use when you have an string id and you want to pass it to objectID
     *
     * @protected
     * @param {(string | any)} id
     * @returns {Types.ObjectId}
     * @memberof BaseService
     */
    protected toObjectId(id: string | any): Types.ObjectId {
        return Types.ObjectId(id);
    }
}