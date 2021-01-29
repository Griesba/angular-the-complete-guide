import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PostModel} from './post.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, Subscription, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  urlPost = 'https://syvie-95ede.firebaseio.com/post.json';
  error = new Subject<string>();
  constructor(private http: HttpClient){}

  createAndPost(postData: PostModel): void {
    this.http.post< {[key: string]: PostModel}>('https://syvie-95ede.firebaseio.com/post.json', postData)
      .subscribe(result => console.log(result), error => this.error.next(error));
  }

  fetchPost(): Observable<PostModel[]> {
    return this.http.get< {[key: string]: PostModel}>('https://syvie-95ede.firebaseio.com/post.json')
      .pipe(map(responseData => {
        const postsArray: PostModel[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }), catchError(err => {
        return throwError(err);
      }));
  }

  clearPost() {
    return this.http.delete(this.urlPost);
  }
}
