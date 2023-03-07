import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { postDto } from 'src/app/dto/postdto';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postsService: PostsService
  ) {}
  postsForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', Validators.required],
  });

  addPost() {
    const postDto: postDto = this.postsForm.value;
    this.postsService.createPost(postDto).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard']);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
