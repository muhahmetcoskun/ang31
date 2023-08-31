import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimTuru } from 'src/app/models/primTuru';
import { HelpMethod } from '../../help/help';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as fileSaver from 'file-saver';
import { BasetanimlamalarserviceService } from '../services/basetanimlamalarservice.service';
@Component({
  selector: 'app-prim-turleri-tanimla',
  templateUrl: './prim-turleri-tanimla.component.html',
  styleUrls: ['./prim-turleri-tanimla.component.scss'],
  providers: [MessageService]
})
export class PrimTurleriTanimlaComponent {
  loading: boolean = true;
  constructor(private baseService: BasetanimlamalarserviceService, private messageService: MessageService, private helpMethod: HelpMethod) { }
  async ngOnInit() {
    this.baseService.get(this.apiname).subscribe(response => {
      this.primTurus = (response);
      this.loading = false;

    });
    this.cols = [
      { field: 'sira', header: 'Sıra' },
      { field: 'id', header: 'Id' },
      { field: 'adi', header: 'Adı' },
      { field: 'aktif', header: 'Aktif' }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }
  apiname = "PrimTurus";
  datas = [];
  exportColumns;
  primTuruDialog: boolean = false;
  deleteprimTuruDialog: boolean = false;
  deleteprimTurusDialog: boolean = false;
  primTurus: PrimTuru[] = [];
  primTuru: PrimTuru = {
    id: null,
    adi: null,
    siraNo: null,
    aktif: null
  }

  primTuruDuzenle: PrimTuru = {
    id: null,
    adi: null,
    siraNo: null,
    aktif: null
  }

  data: any[] = [];
  selectedprimTurus: PrimTuru[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  guncelleId = null;
  buttonS: boolean = true;
  openNew() {
    this.primTuru = {
      // id: null,
      adi: null,
      siraNo: null,
      aktif: null
    }

    this.submitted = false;
    this.primTuruDialog = true;
    this.guncelleId = null;
    this.primTuru.aktif = true;
    this.primTuru.id = 0;
  }

  deleteSelectedprimTurus() {
    //this.deleteprimTurusDialog = true;
  }

  editprimTuru(primTuru: PrimTuru) {
    this.primTuru = primTuru
    this.primTuruDialog = true;
  }

  deleteprimTuru(primTuru: PrimTuru) {
    this.deleteprimTuruDialog = true;
    this.primTuru = primTuru;
  }

  confirmDeleteSelected() {
    this.deleteprimTurusDialog = false;

    this.baseService.sil(this.apiname, this.primTuru.id).subscribe(
      (success) => {
        this.deleteprimTuruDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Silme Başarılı', life: 3000 });
      },
      (error) => {

        this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
      }
    );

    this.primTurus = this.primTurus.filter(val => val.id !== this.primTuru.id)
    this.primTuru.aktif = false;
    this.primTurus.push(this.primTuru);
    // this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Günler Silindi', life: 3000 });
    //this.selectedprimTurus = [];
  }

  confirmDelete() {

  }

  hideDialog() {
    this.primTuruDialog = false;
    this.submitted = false;
  }

  saveprimTuru() {

    if (this.primTuru.id != 0) {

      this.baseService.guncelle(this.apiname, this.primTuru).subscribe(
        (success) => {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {
          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.primTuru = {
        id: null,
        adi: null,
        siraNo: null,
        aktif: null,
      };
      this.hideDialog();
    }
    else {
      // this.primTuru.tarih=Date("2023-07-28T07:43:00.326Z");
      this.baseService.kaydet(this.apiname, this.primTuru).subscribe(
        (success) => {
          this.primTurus.push(success);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {

          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.primTuru = {
        id: null,
        adi: null,
        siraNo: null,
        aktif: null,
      };
      this.hideDialog();
    }
  }

  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    doc['autoTable'](this.exportColumns, this.primTurus);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("Çıktı.pdf");
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.primTurus);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Çıktı");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
