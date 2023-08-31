import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CalismaSuresi } from 'src/app/models/calismaSuresi';
import { HelpMethod } from '../../help/help';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as fileSaver from 'file-saver';
import { BasetanimlamalarserviceService } from '../services/basetanimlamalarservice.service';
@Component({
  selector: 'app-calisma-suresi-tanimlama',
  templateUrl: './calisma-suresi-tanimlama.component.html',
  styleUrls: ['./calisma-suresi-tanimlama.component.scss'],
  providers: [MessageService]
})
export class CalismaSuresiTanimlamaComponent {
  loading: boolean = true;
  constructor(private baseService: BasetanimlamalarserviceService, private messageService: MessageService, private helpMethod: HelpMethod) { }
  async ngOnInit() {
    this.baseService.get(this.apiname).subscribe(response => {
      this.calismaSuresis = (response);
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
  apiname = "GunlukCalismaSuresies";
  datas = [];
  exportColumns;
  calismaSuresiDialog: boolean = false;
  deletecalismaSuresiDialog: boolean = false;
  deletecalismaSuresisDialog: boolean = false;
  calismaSuresis: CalismaSuresi[] = [];
  calismaSuresi: CalismaSuresi = {
    id: null,
    adi: null,
    siraNo: null,
    aktif: null
  }

  calismaSuresiDuzenle: CalismaSuresi = {
    id: null,
    adi: null,
    siraNo: null,
    aktif: null
  }

  data: any[] = [];
  selectedcalismaSuresis: CalismaSuresi[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  guncelleId = null;
  buttonS: boolean = true;
  openNew() {
    this.calismaSuresi = {
      // id: null,
      adi: null,
      siraNo: null,
      aktif: null
    }

    this.submitted = false;
    this.calismaSuresiDialog = true;
    this.guncelleId = null;
    this.calismaSuresi.aktif = true;
    this.calismaSuresi.id = 0;
  }

  deleteSelectedcalismaSuresis() {
    //this.deletecalismaSuresisDialog = true;
  }

  editcalismaSuresi(calismaSuresi: CalismaSuresi) {
    this.calismaSuresi = calismaSuresi
    this.calismaSuresiDialog = true;
  }

  deletecalismaSuresi(calismaSuresi: CalismaSuresi) {
    this.deletecalismaSuresiDialog = true;
    this.calismaSuresi = calismaSuresi;
  }

  confirmDeleteSelected() {
    this.deletecalismaSuresisDialog = false;

    this.baseService.sil(this.apiname, this.calismaSuresi.id).subscribe(
      (success) => {
        this.deletecalismaSuresiDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Silme Başarılı', life: 3000 });
      },
      (error) => {

        this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
      }
    );

    this.calismaSuresis = this.calismaSuresis.filter(val => val.id !== this.calismaSuresi.id)
    this.calismaSuresi.aktif = false;
    this.calismaSuresis.push(this.calismaSuresi);
    // this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Günler Silindi', life: 3000 });
    //this.selectedcalismaSuresis = [];
  }

  confirmDelete() {

  }

  hideDialog() {
    this.calismaSuresiDialog = false;
    this.submitted = false;
  }

  savecalismaSuresi() {

    if (this.calismaSuresi.id != 0) {

      this.baseService.guncelle(this.apiname, this.calismaSuresi).subscribe(
        (success) => {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {
          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.calismaSuresi = {
        id: null,
        adi: null,
        siraNo: null,
        aktif: null,
      };
      this.hideDialog();
    }
    else {
      // this.calismaSuresi.tarih=Date("2023-07-28T07:43:00.326Z");
      this.baseService.kaydet(this.apiname, this.calismaSuresi).subscribe(
        (success) => {
          this.calismaSuresis.push(success);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {

          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.calismaSuresi = {
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
    doc['autoTable'](this.exportColumns, this.calismaSuresis);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("Çıktı.pdf");
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.calismaSuresis);
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
