import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {UsersService} from './users.service';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';
import { PlatformsService } from 'src/app/platforms/services/platforms.service';

@Injectable()
export class UserResolverResolver implements Resolve<boolean> {
  constructor(
    private platformsService: PlatformsService,
    private usersService: UsersService,
    private toast: ToastrService,
    private router: Router,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any {
    const id = route.paramMap.get('id');

    return forkJoin([
      this.usersService.getUser(id),
      this.platformsService.getPlatforms()
    ]).pipe(
      map(([user, platforms]) => {
        if (user && platforms) {
          return {
            user,
            platforms
          };
        } else {
          return of(false);
        }

      }),
      catchError(err => {
        console.error(err);
        this.toast.error('Cannot navigate');
        this.router.navigate(['/users']);
        return of(err);
      }),
    );
  }
}
