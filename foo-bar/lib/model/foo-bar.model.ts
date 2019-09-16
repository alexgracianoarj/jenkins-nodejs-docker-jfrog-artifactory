import { BaseModel } from "./base.model";
import {Typegoose, prop, pre, ModelType, Ref} from 'typegoose';
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel({
    description: 'This is the FooBar model',
    name: 'FooBar'
})
export class FooBar extends BaseModel<FooBar> {   
    @ApiModelProperty({
        description: 'Foo',
        // required: true
    })
    @prop({})
    foo: string;

    @ApiModelProperty({
        description: 'Bar',
        // required: true
    })
    @prop({})
    bar: number;

    @ApiModelProperty({
        description: 'Baz',
        // required: true
    })
    @prop({})
    baz: number;
}