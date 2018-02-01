import { OperationProvider } from "./operation-provider";
export declare type PropertyTransformKernel = (value: any, parent?: IPSOObject) => any;
export interface PropertyTransform extends PropertyTransformKernel {
    /** If this transform is not supposed to be skipped ever */
    neverSkip: boolean;
    /** If this transform requires arrays to be split */
    splitArrays: boolean;
}
export declare type RequiredPredicate = (me: IPSOObject, reference: IPSOObject) => boolean;
/**
 * Defines the ipso key neccessary to serialize a property to a CoAP object
 */
export declare const ipsoKey: (key: string) => PropertyDecorator;
/**
 * Declares that a property is required to be present in a serialized CoAP object
 */
export declare const required: (predicate?: boolean | RequiredPredicate) => PropertyDecorator;
/**
 * Defines the required transformations to serialize a property to a CoAP object
 * @param transform: The transformation to apply during serialization
 * @param options: Some options regarding the behavior of the property transform
 */
export declare function serializeWith(kernel: PropertyTransformKernel, options?: {
    splitArrays?: boolean;
    neverSkip?: boolean;
}): PropertyDecorator;
/**
 * Defines the required transformations to deserialize a property from a CoAP object
 * @param transform: The transformation to apply during deserialization
 * @param splitArrays: Whether the deserializer expects arrays to be split up in advance
 */
export declare function deserializeWith(kernel: PropertyTransformKernel, options?: {
    splitArrays?: boolean;
    neverSkip?: boolean;
}): PropertyDecorator;
/**
 * Defines that a property will not be serialized
 */
export declare const doNotSerialize: (target: object, property: string | symbol) => void;
/**
 * Provides a set of options regarding IPSO objects and serialization
 */
export interface IPSOOptions {
    /**
     * Determines if basic serializers (i.e. for simple values) should be skipped
     * This is used to support raw CoAP values instead of the simplified scales
     */
    skipBasicSerializers?: boolean;
}
export declare class IPSOObject {
    constructor(options?: IPSOOptions);
    /**
     * Reads this instance's properties from the given object
     */
    parse(obj: Record<string, any>): this;
    private parseValue(propKey, value, transform?, requiresArraySplitting?);
    /**
     * Overrides this object's properties with those from another partial one
     */
    merge(obj: Partial<this>): this;
    /** serializes this object in order to transfer it via COAP */
    serialize(reference?: any): Record<string, any>;
    /**
     * Deeply clones an IPSO Object
     */
    clone(): this;
    private isSerializedObjectEmpty(obj, refObj);
    /** If this object was proxied or not */
    readonly isProxy: boolean;
    /** Returns the raw object without a wrapping proxy */
    unproxy(): this;
    /**
     * Creates a proxy for this device
     * @param get Custom getter trap (optional). This is called after mandatory traps are in place and before default behavior
     * @param set Custom setter trap (optional). This is called after mandatory traps are in place and before default behavior
     */
    createProxy(get?: (me: this, key: PropertyKey) => any, set?: (me: this, key: PropertyKey, value, receiver) => boolean): this;
    protected client: OperationProvider;
}