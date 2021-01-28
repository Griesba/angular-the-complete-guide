import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PostModel} from './post.model';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient){}

  createAndPost(postData: PostModel): void {
    this.http.post< {[key: string]: PostModel}>('https://syvie-95ede.firebaseio.com/post.json', postData)
      .subscribe(result => console.log(result));
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
      }));
  }
}
