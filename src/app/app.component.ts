import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean;

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.fetchData();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData)

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
    })
  }

  onClearPosts(index:number) {
    this.postService.deletePost(index);
    setTimeout(() => {
      this.fetchData();
    }, 100);
    
  }
}
function subscribe(arg0: (userData: any) => void) {
  throw new Error('Function not implemented.');
}

