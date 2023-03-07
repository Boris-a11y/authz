import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../utils/httpOptions';
import { userDto } from '../dto/userdto';
import { Observable, map, catchError, of } from 'rxjs';
import { Ability, AbilityBuilder } from '@casl/ability';

const url = 'http://localhost:3000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private ability: Ability) {}

  register(userDto: userDto): Observable<any> {
    return this.http.post(`${url}/register`, userDto, httpOptions);
  }

  login(userDto: userDto): Observable<any> {
    return this.http.post(`${url}/login`, userDto, httpOptions);
  }

  updateAbility(user: userDto) {
    const { can, rules } = new AbilityBuilder(Ability);
    const { role } = user;
    if (role === 'admin') {
      can('manage', 'all');
    } else if (role === 'editor') {
      can(['create', 'read'], 'all');
    } else {
      can('read', 'all');
    }

    this.ability.update(rules);
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${url}`, httpOptions).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  currentUser() {
    return this.http.get(url, httpOptions);
  }

  logout() {
    this.ability.update([]);
    return this.http.post(`${url}/logout`, {}, httpOptions);
  }
}
