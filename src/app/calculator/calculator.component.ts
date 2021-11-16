import { Component } from '@angular/core';
import { performCalc } from 'src/assets/utils/helper-functions';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  liveDisplay = '';
  formulaDisplay = '';
  lastInput = '';
  operatorActive = '';
  allClear = true;

  insertOperator = ($event: any) => {
    if (this.operatorActive === '') {
      this.operatorActive = $event.target.value;
      if (this.liveDisplay !== '') {
        const plusMinus = ['+', '-'];
        const timesDivide = ['x', '÷'];
        if (
          plusMinus.includes($event.target.value[1]) ||
          (timesDivide.includes(
            this.formulaDisplay.charAt(this.formulaDisplay.length - 2)
          ) &&
            timesDivide.includes($event.target.value[1]))
        ) {
          const result = performCalc(this.formulaDisplay + this.liveDisplay);
          this.formulaDisplay = result + $event.target.value;
          this.liveDisplay = result;
        } else {
          this.formulaDisplay =
            this.formulaDisplay + this.liveDisplay + $event.target.value;
        }
      } else {
        this.operatorActive = $event.target.value;
        this.formulaDisplay =
          this.formulaDisplay.slice(0, -3) + $event.target.value;
      }
    }
  };

  plusMinusToggle = () => {
    if (this.liveDisplay.startsWith('-')) {
      this.liveDisplay = this.liveDisplay.slice(1);
    } else {
      this.liveDisplay = `-${this.liveDisplay}`;
    }
  };

  percentage = () => {
    const base: string = this.formulaDisplay.match(/\d+ /g)?.slice(-1)[0] || '';
    const symbol = this.formulaDisplay.charAt(this.formulaDisplay.length - 2);

    if (symbol === '+' || symbol === '-') {
      this.liveDisplay = `${(+base * +this.liveDisplay) / 100}`;
    } else {
      this.liveDisplay = `${+this.liveDisplay / 100}`;
    }

    // switch (this.formulaDisplay.charAt(this.formulaDisplay.length - 2)) {
    //   case '+':
    //     this.liveDisplay = `${(+base * +this.liveDisplay) / 100}`;
    //     break;
    //   case '-':
    //     this.liveDisplay = `${(+base * +this.liveDisplay) / 100}`;
    //     break;
    //   case 'x':
    //     this.liveDisplay = `${+this.liveDisplay / 100}`;
    //     break;
    //   case '÷':
    //     this.liveDisplay = `${+this.liveDisplay / 100}`;
    //     break;
    // }
  };

  insertNum = ($event: any): void => {
    if (this.operatorActive !== '') {
      this.liveDisplay = $event.target.value;
      this.operatorActive = '';
    } else {
      if (this.liveDisplay.length < 9) {
        this.liveDisplay = this.liveDisplay + $event.target.value;
      }
    }
    this.allClear = false;
    console.log(this.liveDisplay);
  };

  insertZero = (): void => {
    if (this.operatorActive !== '') {
      this.liveDisplay = '';
      this.operatorActive = '';
    } else {
      if (this.liveDisplay !== '') {
        this.liveDisplay = this.liveDisplay + 0;
      }
    }
  };

  insertDecimal = (): void => {
    if (/\./.test(this.liveDisplay)) {
      this.liveDisplay = this.liveDisplay;
    } else if (this.liveDisplay === '') {
      this.allClear = false;
      this.liveDisplay = 0 + '.';
    } else {
      this.liveDisplay = this.liveDisplay + '.';
    }
  };

  finishCalc = () => {
    let answer: string;
    if (this.formulaDisplay === '') {
      answer = performCalc(this.liveDisplay + this.lastInput);
    } else {
      this.lastInput = this.formulaDisplay.slice(-3) + this.liveDisplay;
      answer = performCalc(this.formulaDisplay + this.liveDisplay);
    }
    this.formulaDisplay = '';
    this.liveDisplay = answer;
  };

  clearDisplay = ($event: any) => {
    if ($event.target.value === 'AC') {
      this.formulaDisplay = '';
      this.operatorActive = '';
    }
    this.liveDisplay = '';
    this.allClear = true;
  };
}
