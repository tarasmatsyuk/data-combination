import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {User} from '../../store/models/user.model';
import {UsersFacadeService} from '../../services/user-facade.service';
import {ActivatedRoute} from '@angular/router';
import { PlatformsFacadeService } from 'src/app/platforms/services/platforms-facade.service';
import {Subject} from 'rxjs';
import { Platform } from 'src/app/platforms/store/models/platform.model';
import {PlatformShared} from '../../store/models/platform-shared.enum';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  dataSource: MatTableDataSource<Platform>;
  platforms: Platform[] = [];
  user: User;
  platformShared = PlatformShared;
  displayedColumns: string[] = ['platform_id', 'last_shared', 'display_order', 'name'];
  selectedUser$ = this.usersFacadeService.selectedUsers$;
  platforms$ = this.platformsFacadeService.platforms$;
  @ViewChild(MatSort) set content(sort: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }
  constructor(
    private platformsFacadeService: PlatformsFacadeService,
    private usersFacadeService: UsersFacadeService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.selectedUser$.pipe(
      switchMap(user => this.platforms$.pipe(
          map(platforms => {
            return {platforms, user};
          })
        )),
      takeUntil(this.unsubscribe$)
    ).subscribe(({platforms, user}) => {
      const sharedPlatforms = platforms.filter(platform => {
        return user.profile_shared[this.platformShared[platform.platform_id]];
      });
      this.dataSource = new MatTableDataSource(sharedPlatforms);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
