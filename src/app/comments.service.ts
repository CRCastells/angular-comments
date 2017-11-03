import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentService {
  private comments = [
      { author: 'bob', content: 'first comment!', editing : false},
      { author: 'steve', content: 'nice work!', editing : false},
      { author: 'jason', content: 'I would also like to congratulate you!', editing : false}
  ]

  private subject : Subject<object> = new Subject<object>();
  constructor() { }

  private updateSubject(): void {
    this.subject.next(this.comments);
  }

  editComment(comment : Comment): void {
    let data : Comment = {
      author: comment.author,
      content: comment.content,
      editing: false
    }
    this.comments[this.comments.indexOf(comment)] = data;
    this.updateSubject();
  }

  getComments() {
    return this.comments;
  }

  createComment(comment: Comment): void {
    let data : Comment = {
      author: comment.author,
      content: comment.content,
      editing: false
    }
    this.comments.push(data);
    this.updateSubject();
  }

  deleteComment(comment : Comment): void {
    this.comments.splice(this.comments.indexOf(comment),1);
    this.updateSubject();
  }

  onCommentUpdated(callback) : void{
    this.subject.asObservable().subscribe(callback);
  }
}
interface Comment {
  author:string, 
  content:string,
  editing : boolean
}
