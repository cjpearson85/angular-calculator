import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDisplay',
})
export class FormatDisplayPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('Infinity')) return value;

    const negative: boolean = value.startsWith('-');
    let result: string = negative ? value.substr(1) : value;

    if (result.includes('e')) {
      result = result.replace('+', '');
      if (result.length > 9) {
        let [foreNum, zeroes] = result.split('e');
        result = Number(foreNum).toFixed(7 - zeroes.length) + 'e' + zeroes;
      }
    } else if (result.length > 9) {
      let [int] = result.split('.');
      if (int.length > 9) {
        let zeroes = (int.length - 1).toString();
        result =
          (+int / 10 ** +zeroes).toFixed(7 - zeroes.length) + 'e' + zeroes;
      } else if (int.length === 9) {
        result = int;
      } else {
        result = Number(result).toFixed(9 - int.length);
      }
    }

    // Split string for further formatting
    let [int, dec] = result.split('.');

    // Insert comma separators into display integer string
    let numArr: string[] = int
      .split('')
      .filter((num) => num !== ',')
      .reverse()
      .map((num, i) => {
        if (i % 3 === 0 && i !== 0 && num !== '-') {
          return `${num},`;
        }
        return num;
      });

    // Reassemble string with decimals if needed
    if (/\./.test(result)) {
      result = numArr.reverse().join('') + `.${dec}`;
    } else {
      result = numArr.reverse().join('');
    }

    // Return result with negative prefix if applicable
    return negative ? `-${result}` : result;
  }
}
