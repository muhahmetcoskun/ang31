import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TatilgunutanimlaserviceService } from '../services/tatilgunutanimlaservice.service';
import { Table } from 'primeng/table';
import { TatilGun } from 'src/app/models/tatilgun';
import { HelpMethod } from '../../help/help';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-tatil-gunu-tanimla-home',
  templateUrl: './tatil-gunu-tanimla-home.component.html',
  styleUrls: ['./tatil-gunu-tanimla-home.component.scss'],
  providers: [MessageService]
})
export class TatilGunuTanimlaHomeComponent implements OnInit {
  loading: boolean = true;
  constructor(private ttgtService: TatilgunutanimlaserviceService, private messageService: MessageService,private helpMethod: HelpMethod) { }
  async ngOnInit() {
    this.ttgtService.getTatilGunleri().subscribe(response => {
      this.tatilGunus = (response);
      this.loading = false;

    });
    this.cols = [
      { field: 'sira', header: 'Sıra' },
      { field: 'id', header: 'Id' },
      { field: 'tarih', header: 'Tarih' },
      { field: 'aktif', header: 'Aktif' }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }
  datas = [];
  exportColumns;
  tatilGunuDialog: boolean = false;
  deletetatilGunuDialog: boolean = false;
  deletetatilGunusDialog: boolean = false;
  tatilGunus: TatilGun[] = [];
  tatilGunu: TatilGun = {
    id: null,
    tarih: null,
    aktif: null
  }

  tatilGunuDuzenle: TatilGun = {
    id: null,
    tarih: null,
    aktif: null
  }

  data: any[] = [];
  selectedtatilGunus: TatilGun[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  guncelleId = null;
  buttonS: boolean = true;
  openNew() {
    this.tatilGunu = {
      // id: null,
      tarih: null,
      aktif: null
    }

    this.submitted = false;
    this.tatilGunuDialog = true;
    this.guncelleId = null;
    this.tatilGunu.aktif = true;
    this.tatilGunu.id = 0;
  }

  deleteSelectedtatilGunus() {
    //this.deletetatilGunusDialog = true;
  }

  edittatilGunu(tatilGunu: TatilGun) {
    this.tatilGunu = tatilGunu
    const formattedDate = new Date(this.tatilGunu.tarih);
    this.tatilGunu.tarih = this.helpMethod.dateFormat(this.tatilGunu.tarih)
    this.tatilGunuDialog = true;
  }

  deletetatilGunu(tatilGunu: TatilGun) {
    this.deletetatilGunuDialog = true;
    this.tatilGunu = tatilGunu;
  }

  confirmDeleteSelected() {
    this.deletetatilGunusDialog = false;

    this.ttgtService.sil(this.tatilGunu.id).subscribe(
      (success) => {
        this.deletetatilGunuDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Silme Başarılı', life: 3000 });
      },
      (error) => {

        this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
      }
    );

    this.tatilGunus = this.tatilGunus.filter(val => val.id !== this.tatilGunu.id)
    this.tatilGunu.aktif = false;
    this.tatilGunus.push(this.tatilGunu);
    // this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Günler Silindi', life: 3000 });
    //this.selectedtatilGunus = [];
  }

  confirmDelete() {

  }

  hideDialog() {
    this.tatilGunuDialog = false;
    this.submitted = false;
  }

  savetatilGunu() {

    if (this.tatilGunu.id != 0) {
     
      this.ttgtService.guncelle(this.tatilGunu).subscribe(
        (success) => {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {
          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.tatilGunu = {
        id: null,
        tarih: null,
        aktif: null,
      };
      this.hideDialog();
    }
    else {
      // this.tatilGunu.tarih=Date("2023-07-28T07:43:00.326Z");
      this.ttgtService.kaydet(this.tatilGunu).subscribe(
        (success) => {
          this.tatilGunus.push(success);
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kayıt Başarılı', life: 3000 });
        },
        (error) => {

          this.messageService.add({ severity: 'success', summary: 'Hata', detail: 'Hata Oluştu', life: 3000 });
        }
      );

      this.tatilGunu = {
        //id: null,
        tarih: null,
        aktif: null,
      };
      this.hideDialog();
    }
  }

  exportPdf() {
    const doc = new jsPDF('p','pt');
    doc['autoTable'](this.exportColumns, this.tatilGunus);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("products.pdf");
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.tatilGunus);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
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


