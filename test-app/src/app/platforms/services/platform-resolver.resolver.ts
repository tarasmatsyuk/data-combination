import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UsersService} from 'src/app/users/services/users.service';
import {PlatformsService} from './platforms.service';
import {User} from '../../users/store/models/user.model';
import {Platform} from '../store/models/platform.model';
import {ToastrService} from 'ngx-toastr';
import { PlatformsFacadeService } from './platforms-facade.service';
import { UsersFacadeService } from 'src/app/users/services/user-facade.service';

@Injectable()
export class PlatformResolverResolver implements Resolve<boolean> {
  constructor(
    private platformsService: PlatformsService,
    private usersService: UsersService,
    private toast: ToastrService,
    private router: Router,
    private platformsFacadeService: PlatformsFacadeService,
    private usersFacadeService: UsersFacadeService,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any {
    const id = route.paramMap.get('id');

    return forkJoin([
      this.usersService.getUsers(),
      this.platformsService.getPlatform(id)
    ]).pipe(
      map(([users, platform]) => {
        if (users.length && platform) {
          this.platformsFacadeService.setPlatform(platform);
          this.usersFacadeService.setUsers(users);
          return {
            users,
            platform
          };
        } else {
          return of(false);
        }

      }),
      catchError(err => {
        console.error(err);
        this.toast.error('Cannot navigate');
        this.router.navigate(['/plaftorms']);
        return of(err);
      }),
    );
  }
}
