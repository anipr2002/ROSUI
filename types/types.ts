export interface ITopic {
    name : string;
    messageType: string;
    fieldNames: string[];
    fieldTypes: IField[];
    message?: string[] | ROSLIB.Message | null;
    isSubscribed: boolean;
}
export interface IField {
  name: string;
  type: string;
  isNested: boolean;
  nestedFields?: IField[];
}
export interface IROSMessageDetail {
    type: string;
    fieldnames: string[];
    fieldtypes: string[];
    fieldarraylen: number[];
    examples: string[];
    constnames: string[];
    constvalues: string[];
}


export interface IService{
    name: string;
    serviceType: string;
    serviceArgs :  {[key: string]: unknown} | null;
    serviceReturns ?: {[key: string]: unknown} | null
}

export interface INode {
    name: string;
    subscribedTopics: ITopic["name"][];
    publishedTopics: ITopic["name"][];
    services: IService["name"][];
}

export interface IParam {
    name: string;
    value: string;
}
