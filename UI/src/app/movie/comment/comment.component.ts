import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Movie } from '../Movie';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment:string = "";
  rating:number =0;
  ratingError = false;
  movie:Movie;
  youCant = false;
  id: string;
  commented= false;
  cmt = false;
  
  constructor(private commentService:CommentService,private activeRout:ActivatedRoute) { }

  ngOnInit(): void {
    this.id= this.activeRout.snapshot.paramMap.get('id');
  }
  postCommentAndRating(){
    if(this.rating <11 && this.rating >=0){
      this.ratingError = false;
      const body = {rating:this.rating,
        comment: this.comment}
      this.commentService.postComment(this.id,body).subscribe((res:any) =>{
        console.log(res)
        if(res.code == 204){
          this.youCant = true;
        } else{
        this.movie = res;
        this.commented = true;
        this.cmt = true;
        }
      })
    }else{
      this.ratingError = true;
    }
  }

  

}
