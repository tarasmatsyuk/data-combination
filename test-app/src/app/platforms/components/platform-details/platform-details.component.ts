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
    this.route.data.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(({data}) => {
      this.platform = data.platform;
      const currentPlatform = this.platformShared[+id];
      const users = data.users.filter(user => user.profile_shared[currentPlatform]);
      this.dataSource = new MatTableDataSource(users);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
