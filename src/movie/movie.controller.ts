import { Body, Controller, Get,Request, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private movieService:MovieService){
    }
    @Get()
    @UseGuards(AuthGuard())
    async getAllMovies(){
        return this.movieService.getAllMovies();
    }

    @Post()
    @UseGuards(AuthGuard())
    async postMovie(@Body()movie : MovieDto, @Request() req){
        
        return  this.movieService.postMovie(movie,req);
    }

    @Post("/comment/:id")
    @UseGuards(AuthGuard())

    async postMovieComment(@Body() comment : any,@Param('id') id:string,@Request() req){
        
        return  this.movieService.postMovieCommentAndRating(comment.comment,id,req,comment.rating);
    }

    @Get('order/:direc')
     @UseGuards(AuthGuard())
     sortByRating(@Param() direction:string){
        return this.movieService.filterByOrder(direction);
     }

    

}
