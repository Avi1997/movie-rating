import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommentService } from './comment.service';
import { Movie } from './Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies:Array<Movie>;
  noMovie:boolean;
  direction = true;
  constructor(private movieService:MovieService,private router: Router,private commentService:CommentService) { 
    this.movies = [];
    this.noMovie = false;
  }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((res:Array<Movie>)=>{
      if(res.length ==0){
        this.noMovie = true;
      }
      this.movies = res;

      if(this.movies.length >0){
        this.movies.forEach((movie:Movie) =>{
          if(movie.rating?.length >0){
            movie.rating[0] = movie.rating?.reduce((a,b)=>a+b,0)/movie.rating?.length;
          }
        })
      }
    })
  }
  filterData(){
    this.direction =  !this.direction;
    const val = this.direction  ? 'desc' : 'asc';
    this.commentService.filterDataA(val).subscribe((res:any) =>{
      this.movies = res;
    })
  }
  goToComment(id){
    this.router.navigate(['/comment',id]);
  }

}
