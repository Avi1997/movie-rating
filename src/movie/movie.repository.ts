
import { EntityRepository, Repository } from "typeorm";
import { Movie } from "./movie.model";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    
}