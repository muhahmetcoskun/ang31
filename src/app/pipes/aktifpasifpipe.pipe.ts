import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aktifpasifpipe'
})
export class AktifpasifpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let val=value  ==true? "Aktif" :"Pasif" 
    return val;
  }

}
