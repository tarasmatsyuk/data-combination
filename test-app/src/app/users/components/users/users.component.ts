import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsersFacadeService} from '../../services/user-facade.service';
import {Observable, Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../store/models/user.model';
import {ExportToCSVService} from '../../../core/services/export-to-csv.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address', 'username', 'show_more'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) set content(sort: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }

  isLoading$: Observable<boolean> = this.usersFacadeService.isLoading$;

  constructor(
    private usersFacadeService: UsersFacadeService,
    private exportToCSVService: ExportToCSVService,
    private cdr: ChangeDetectorRef,
  ) {
    this.usersFacadeService.loadUsers();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadUsers(): void {
    this.usersFacadeService.users$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.cdr.markForCheck();
    });
  }

  exportToCSV(): void {
    const data = [ ...this.dataSource.filteredData ].map(user => {
      const {profile_shared, ...rest} = user;
      return rest;
    });
    this.exportToCSVService.export(data);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
