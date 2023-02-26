import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  constructor(private http: HttpClient) { }


  createAndStorePost(postData: Post) {
    this.http.post<{ name: string }>('http://localhost/file.php', postData).subscribe(userData => {
      console.log(userData);
    })
  }

  fetchPost() {
    return this.http.get<{ [key: string]: Post }>('http://localhost/get.php').pipe(map(responseData => {
      const postArray = []
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key], id: key });
        }
      }
      return postArray;
    }))
  }
}
