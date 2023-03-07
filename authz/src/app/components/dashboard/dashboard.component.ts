import { Component } from '@angular/core';
import { postDto } from 'src/app/dto/postdto';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private postsService: PostsService) {}
  posts: postDto[] = [];

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data as any;
      },
    });
  }

  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  ngOnInit(): void {
    this.getPosts();
  }
}
