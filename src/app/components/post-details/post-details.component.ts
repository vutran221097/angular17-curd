import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from '../../models/Posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  currentPost: Posts = {
    title: '',
    content: '',
    published: false,
  };
  message = '';

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getPost(this.route.snapshot.params['id']);
  }

  getPost(id: string): void {
    this.postService.get(id).subscribe(
      (data: any) => {
        this.currentPost = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentPost.title,
      content: this.currentPost.content,
      published: status,
    };

    this.message = '';

    this.postService.update(this.currentPost.id, data).subscribe(
      (response: any) => {
        this.currentPost.published = status;
        console.log(response);
        this.message = response.message
          ? response.message
          : 'This Post was updated successfully!';
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updatePost(): void {
    this.message = '';

    this.postService.update(this.currentPost.id, this.currentPost).subscribe(
      (response: any) => {
        console.log(response);
        this.message = response.message
          ? response.message
          : 'This Post was updated successfully!';
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletePost(): void {
    this.postService.delete(this.currentPost.id).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/posts']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
