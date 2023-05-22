import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage-angular';

const USER: string = 'user';

export interface JwtPayload {
  sub?: string;
  roles?: string[];
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private user: JwtPayload = {};
  private currentUser: BehaviorSubject<JwtPayload> = new BehaviorSubject(this.user);

  constructor(private router: Router,  private storage:Storage) {
    this.loadUser();
  }
  async ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    await this.storage.create();
    const user = await this.storage.get(USER);
    this.currentUser.next(user);
  }

  // Access the current user
  async  getUser() {
    return await this.storage.get(USER) as JwtPayload;
  }

  // Remove all information of the previous user
  async logout() {
    await this.storage.remove(USER);
    this.currentUser.next(this.user);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  // Check if a user has a certain permission
  hasPermission(permissions: string[]): boolean {
    for (const permission of permissions) {
      if (!this.currentUser.value || !this.currentUser.value.roles?.includes(permission)) {
        return false;
      }
    }
    return true;
  }
}
