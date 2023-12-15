import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/Posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts?: Posts[];
  currentPost?: Posts;
  currentIndex = -1;
  title = '';

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.postService.getAll().subscribe(
      (data: any) => {
        this.posts = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrievePosts();
    this.currentPost = undefined;
    this.currentIndex = -1;
  }

  setActivePost(post: Posts, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
  }
}
