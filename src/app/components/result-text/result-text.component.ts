import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-result-text',
  templateUrl: './result-text.component.html',
  styleUrls: ['./result-text.component.css']
})
export class ResultTextComponent {
  @Input() results: any[]; // Aquí debes pasar los datos de resultsText
  resultList: any[]; // Arreglo de objetos que contienen el cliente y el dato

  exportToExcel(): void {
    const dataToExport = this.resultList.map(result => [result.client, result.data]);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'resultData');
    XLSX.writeFile(wb, 'resultData.xlsx');
  }
  ngOnChanges(): void {
    if (this.results) {
      this.resultList = this.results.map(result => ({
        client: result.client,
        data: result.data
      }));
    }
  }
}
