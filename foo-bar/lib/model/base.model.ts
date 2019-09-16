import { SchemaOptions } from 'mongoose';
import {Typegoose, prop, pre} from 'typegoose';

@pre('findOneAndUpdate', function(next:any) {
    this.getUpdate().updatedAt = new Date();
    next();
})
export class BaseModel<T> extends Typegoose {
    @prop({default: Date.now()})
    createdAt?: Date;

    @prop({default: Date.now()})
    updatedAt?: Date;
}

export class BaseModelVm {
    createdAt?: Date;
    updatedAt?: Date;
}

export const schemaOptions: SchemaOptions = {
    toJSON : {
        virtuals: true,
        getters: true
    }
};
