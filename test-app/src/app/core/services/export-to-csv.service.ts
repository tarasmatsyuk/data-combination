import { Injectable } from '@angular/core';
import {ExportToCsv} from 'export-to-csv';

@Injectable({
  providedIn: 'root'
})
export class ExportToCSVService {
  private readonly options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  export(data: any[]): void {
    const csvExporter = new ExportToCsv(this.options);

    csvExporter.generateCsv(data);
  }
}
