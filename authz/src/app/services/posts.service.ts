import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../utils/httpOptions';
import { postDto } from '../dto/postdto';

const url = 'http://localhost:3000/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(url, httpOptions);
  }

  createPost(postDto: postDto) {
    return this.http.post(url, postDto, httpOptions);
  }

  deletePost(id: number) {
    return this.http.delete(`${url}/${id}`, httpOptions);
  }
}
