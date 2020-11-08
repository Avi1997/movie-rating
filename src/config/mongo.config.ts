import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Movie } from "src/movie/movie.model";
import { User } from "src/user/user.model";

export const typeOrm:TypeOrmModuleOptions ={
    type: 'mongodb' ,
    url:process.env.DB_URL ||'mongodb://127.0.0.1:27017/movie-rating',
    synchronize: true,
    useUnifiedTopology: true,
    entities:[User,Movie]
}