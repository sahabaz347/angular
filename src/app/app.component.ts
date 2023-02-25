import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.http.post<{name:string}>('http://localhost/file.php', postData).subscribe(userData => {
      console.log(userData);
      this.onFetchPosts();
    })
    
  }

  onFetchPosts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get('http://localhost/get.php').pipe(map(responseData => {
      const postArray = []
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key], id: key });
        }
      }
      return postArray;
    })).subscribe(userData => {
      this.loadedPosts=userData;
    });
    

  }

  onClearPosts() {
    // Send Http request
  }
}
function subscribe(arg0: (userData: any) => void) {
  throw new Error('Function not implemented.');
}

