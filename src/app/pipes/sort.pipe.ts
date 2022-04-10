import { Pipe, PipeTransform } from '@angular/core';

// pipe pris sur Stackoverflow
// https://stackoverflow.com/questions/35158817/orderby-pipe-issue
// et qui permet dans une boucle angular *ngFor
// de trier *ngFor="let nft of nfts | sort:'title'" (tri alphabétique sur le titre des nfts)

@Pipe({
  name: 'sort',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
