import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
error=new Subject<string>();


  constructor(private http: HttpClient) { }


  createAndStorePost(postData: Post) {
    this.http.post<{ name: string }>('http://localhost/file.php', postData,{
      observe:'response'
    }).subscribe(userData => {
      console.log('werwerw------->'+userData);
      console.log(11111111)
    }
    // ,error=>{
    //   this.error.next(error.message)
    //   console.log(11111111)

    // }
    )

  }

  fetchPost() {
    let searchParams=new HttpParams();
    searchParams=searchParams.append('key1','value1');
    searchParams=searchParams.append('key2','value2')
    return this.http.get<{ [key: string]: Post }>('http://localhost/get.php',
    {headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests'
         }),
         params:searchParams
    }).pipe(map(responseData => {
      const postArray = []
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({ ...responseData[key]});//, id: key 
        }
      }
      return postArray;
    }),
    catchError(errormsg=>{
      return throwError(errormsg)
    }))
  }
  deletePost(index:number) {
    this.http.get<{ name: string }>('http://localhost/delete.php?action='+index+'&usertype=single').subscribe(userData => {
      console.log(userData);
    })
  }
  deletePosts(){
    this.http.delete('http://localhost/delete.php').subscribe(userData=>{
      console.log(userData);
    })
  }
}
