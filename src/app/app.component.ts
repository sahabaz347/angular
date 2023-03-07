import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean;
  error=null;
private errorSub:Subscription

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.errorSub=this.postService.error.subscribe(errorMessage=>{
this.error=errorMessage;
    })
    this.fetchData();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData)
    setTimeout(() => {
      this.fetchData();
    }, 100);

  }

  onFetchPosts() {
    this.fetchData();

  }
  fetchData() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(userData => {
      this.isFetching = false;
      this.loadedPosts = userData;
      // console.log(userData);
    },error=>{
      this.isFetching = false;
      this.error=error.message;
      console.log(error)
    })
  }
  handleError(){
    this.error=null;
  }

  onClearPost(index:number) {
    this.postService.deletePost(index);
    setTimeout(() => {
      this.fetchData();
    }, 100);
    
  }
  onClearPosts() {
    this.postService.deletePosts();
    setTimeout(() => {
      this.fetchData();
    }, 100);
    
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
function subscribe(arg0: (userData: any) => void) {
  throw new Error('Function not implemented.');
}

