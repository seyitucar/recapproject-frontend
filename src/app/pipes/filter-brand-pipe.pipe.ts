import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterBrandPipe'
})
export class FilterBrandPipePipe implements PipeTransform {

  transform(value: Brand[], filteBrandText: string): Brand[] {
    filteBrandText = filteBrandText?filteBrandText.toLocaleLowerCase():"";
    return filteBrandText?value.filter((b:Brand)=>b.brandName.toLocaleLowerCase().indexOf(filteBrandText) !== -1):value;
  }

}
