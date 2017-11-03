import { Component } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { CommentService } from './comments.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private commentService : CommentService){}

  ngOnInit() {
    this.commentService.onCommentUpdated(comments => this.comments = comments);
  }

  comment: Comment = {
    author: '',
    content: '',
    editing: false
  };
  comments = this.commentService.getComments();

  createComment = (comment: Comment) => this.commentService.createComment(comment);

  deleteComment = (comment : Comment) => this.commentService.deleteComment(comment);
  
  editComment = (comment : Comment) => this.commentService.editComment(comment);

}
interface Comment {
  author:string, 
  content:string,
  editing : boolean
}

