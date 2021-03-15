import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PlatformsFacadeService} from '../../services/platforms-facade.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Platform} from '../../store/models/platform.model';
import {ExportToCSVService} from 'src/app/core/services/export-to-csv.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformsComponent implements OnInit {
  @ViewChild(MatSort) set content(sort: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }
  displayedColumns: string[] = ['platform_id', 'last_shared', 'display_order', 'name', 'show_more'];
  dataSource: MatTableDataSource<Platform>;
  isLoading$: Observable<boolean> = this.platformsFacadeService.isLoading$;
  userCount$: Observable<number> = this.platformsFacadeService.userCount$;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private platformsFacadeService: PlatformsFacadeService,
    private exportToCSVService: ExportToCSVService,
    private cdr: ChangeDetectorRef,
  ) {
    this.platformsFacadeService.loadPlatforms();
  }

  ngOnInit(): void {
    this.loadPlatforms();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlatforms(): void {
    this.platformsFacadeService.platforms$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((platforms: Platform[]) => {
      this.dataSource = new MatTableDataSource(platforms);
      this.cdr.markForCheck();
    });
  }

  exportToCSV(): void {
    this.exportToCSVService.export(this.dataSource.filteredData);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
