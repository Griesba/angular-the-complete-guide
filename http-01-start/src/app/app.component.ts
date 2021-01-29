import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';
import {PostService} from './post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  errorMessage = null;
  errorSubscription = new Subscription();

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMsg => {
      this.errorMessage = errorMsg.message;
    })
    this.onFetchPosts();
  }

  onCreatePost(postData: PostModel) {
    this.postService.createAndPost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost()
      .subscribe(result => {
        this.isFetching = false;
        this.loadedPosts = result;
      }, error => {
        this.isFetching = false;
        this.errorMessage = error.message;
      });
  }

  onClearPosts() {
    this.postService.clearPost().subscribe((resutl) => {
      console.log(resutl);
    });
  }

  onHandleError() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
