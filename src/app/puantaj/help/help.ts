
//  function help()  {

import { Injectable } from "@angular/core";

//   static  dateFormat (tarih){
//   return new Date(tarih);
   

//   }

// }




 

// const  seconsdMethod()={
//   function dateFormat(tarih) {
//     return new Date(tarih);
//   }
// }

// function buildName(firstName:any) : any{
//   return new Date(firstName);
// }

@Injectable()
export  class HelpMethod {

   dateFormat(firstName:any) : any{
    return new Date(firstName);
  }

}

