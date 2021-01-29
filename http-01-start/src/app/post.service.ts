import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PostModel} from './post.model';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, Subject, Subscription, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  urlPost = 'https://syvie-95ede.firebaseio.com/post.json';
  error = new Subject<string>();
  constructor(private http: HttpClient){}

  createAndPost(postData: PostModel): void {
    this.http.post< {[key: string]: PostModel}>(
      this.urlPost,
      postData,
      {observe: 'response'})
      .subscribe(result => {
        // as observe is of type response, the body of the response is at result.body
        // to get the response body directly, use {observe: 'body'}
        console.log(result);
        console.log(result.body);
      },
          error => this.error.next(error));
  }

  fetchPost(): Observable<PostModel[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('key', 'param');
    httpParams = httpParams.append('custom', 'param');
    return this.http.get< {[key: string]: PostModel}>(this.urlPost, {
      headers: new HttpHeaders(),
      params: httpParams,
      responseType: 'json'
    })
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
    return this.http.delete(this.urlPost, {observe: 'events'})
      .pipe(
        tap(event => {
          // observe events response
          if (event.type === HttpEventType.Sent) {
            console.log('delete request is sent');
          } else if (event.type === HttpEventType.Response) {
            console.log('Delete request response received');
            console.log(event.body);
          }
        }));
  }
}
