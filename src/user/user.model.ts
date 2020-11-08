
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @ObjectIdColumn()
    _id:string;

    @PrimaryColumn()
    email : string;

    @Column()
    password : string;


    @Column()
    name: string;

}