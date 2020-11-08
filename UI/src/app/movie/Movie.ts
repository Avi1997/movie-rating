import {User} from '../site/User';
export interface Movie{   
    _id: string;
    name: string;
    imageUrl: string;
    rating: Array<number>;
    comment: Array<string>;
    user:Array<User>;
}