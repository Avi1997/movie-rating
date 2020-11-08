import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';
import { Movie } from './movie.model';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
    movies: Movie[];
    constructor(private movieRepo: MovieRepository, private userRepository: UserRepository) { }
    async getAllMovies() {
        this.movies = await this.movieRepo.find();
        return this.movies;
    }

    async postMovieCommentAndRating(comment: string, id: string, req: any, rating: number) {
        try {
            const movie: Movie = await this.movieRepo.findOne(id);
            let present = false;
            movie.user.find((user) => {
                if (user?.email == req.user?.email) {
                    present = true;
                    return present;
                }
            });
            if (present || rating > 10) {
                return { code: 204, message: 'not allowed' };
            }

            movie.comment = movie.comment ? movie.comment : [];

            movie.comment.push(comment);
            movie.rating = movie.rating ? movie.rating : [];
            movie.rating.push(rating);
            const email = req.user.email;
            const user = await this.userRepository.find({ email });
            movie.user.push(user[0]);
            this.movieRepo.save(movie);
            return movie;
        } catch (e) {
            console.log(e);
        }
    }

    async postMovie(movie: MovieDto, req: any) {
        try {
            const newMovie = new Movie();
            newMovie.comment = movie.comment ? [] : newMovie.comment;
            newMovie.comment.push(movie.comment);
            newMovie.imageUrl = movie.imageUrl;
            newMovie.rating = movie.rating ? [] : newMovie.rating;
            newMovie.rating.push(movie.rating > 10 ? 0 : movie.rating);

            newMovie.user = [];
            const user = await this.userRepository.find({ email: req.user.email });
            newMovie.user.push(user[0]);
            return this.movieRepo.save(newMovie);
        } catch (e) {
            console.log("error :", e);
        }

    }

    async filterByOrder(direction: string) {
        let movies: Array<Movie> = await this.movieRepo.find();
        if (direction == 'asc') {
            movies = movies.sort(this.sortByAsc);
        } else {
            movies = movies.sort(this.sortByDesc);
        }
        return movies;
    }

    sortByAsc(movieA: Movie, movieB: Movie) {
        const ratingA = movieA.rating?.reduce((a, b) => a + b, 0) / movieA.rating?.length;
        const ratingB = movieB.rating?.reduce((a, b) => a + b, 0) / movieB.rating?.length;
        if (ratingA < ratingB) {
            return 1;
        } else {
            return -1;
        }

    }

    sortByDesc(movieA: Movie, movieB: Movie) {
        const ratingA = movieA.rating?.reduce((a, b) => a + b, 0) / movieA.rating?.length;
        const ratingB = movieB.rating?.reduce((a, b) => a + b, 0) / movieB.rating?.length;
        if (ratingA < ratingB) {
            return -1;
        } else {
            return 1;
        }

    }

}
