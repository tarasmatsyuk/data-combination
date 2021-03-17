import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlatformsFacadeService} from '../../services/platforms-facade.service';
import {UsersFacadeService} from '../../../users/services/user-facade.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, forkJoin, Observable, Subject} from 'rxjs';
import {map, take, takeUntil, tap} from 'rxjs/operators';
import {User} from 'src/app/users/store/models/user.model';
import {Platform} from '../../store/models/platform.model';
import {PlatformShared} from 'src/app/users/store/models/platform-shared.enum';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformDetailsComponent implements OnInit, OnDestroy {
  platform: Platform;
  users: User[] = [];
  platformShared = PlatformShared;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address', 'username'];
  dataSource: MatTableDataSource<User>;
  selectedPlatform$ = this.platformsFacadeService.selectedPlatform$;
  users$ = this.usersFacadeService.users$;
  private unsubscribe$: Subject<void> = new Subject();
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
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.users$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((users) => {
      const currentPlatformId = this.platformShared[+id];
      const platformUsers = users.filter(user => user.profile_shared[currentPlatformId]);
      this.dataSource = new MatTableDataSource(platformUsers);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
