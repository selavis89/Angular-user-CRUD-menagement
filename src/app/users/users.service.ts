import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Users[]>('http://localhost:3000/users');
  }

  create(data: Users) {
    return this.http.post<Users>('http://localhost:3000/users', data);
  }

  getById(id: number) {
    return this.http.get<Users>(`http://localhost:3000/users/${id}`);
  }

  update(data: Users) {
    return this.http.put(`http://localhost:3000/users/${data.id}`, data);
  }

  delete(id: number) {
    return this.http.delete<Users>(`http://localhost:3000/users/${id}`);
  }
}
