/* eslint-disable no-magic-numbers */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate"
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 15, completeWords = true, ellipsis = "...") {
    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(" ");
    }
    return `${value.substring(0, limit)}${ellipsis}`;
  }
}
