import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/Posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  post: Posts = {
    title: '',
    content: '',
    published: false,
  };
  submitted = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  savePost(): void {
    const data = {
      title: this.post.title,
      content: this.post.content,
    };

    this.postsService.create(data).subscribe(
      (response: any) => {
        console.log(response);
        this.submitted = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  newPost(): void {
    this.submitted = false;
    this.post = {
      title: '',
      content: '',
      published: false,
    };
  }
}
