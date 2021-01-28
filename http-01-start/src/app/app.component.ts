import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
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
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
