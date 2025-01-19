import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(input: string): string {
    if (!input) return '';

    // Replace underscores with spaces
    let formatted = input.replace(/_+/g, ' ');

    // Capitalize the first character of each word
    formatted = formatted
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return formatted;
  }
}
