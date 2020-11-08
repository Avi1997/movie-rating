import { User } from "src/user/user.model";
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Movie{
    @ObjectIdColumn()    
    _id: ObjectID;

    @Column()
    imageUrl: string;

    @Column()
    rating: Array<number>;

    @Column()
    comment: Array<string>;

    @Column()
    user:Array<User>;
}