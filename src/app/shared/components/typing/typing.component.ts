import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounce, debounceTime, delay, fromEvent, interval, merge, mergeMap, of, switchMap } from 'rxjs';
import 'vanilla-colorful';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit {

  @ViewChild('content', { static: false }) content!: ElementRef;
  @ViewChild('cursor', { static: false }) cursor!: ElementRef;

  textColor = "#FFFFFF";
  underlineColor = 'white';
  fontSize = "20px";
  blinkWidth = "2px";

  title: string = 'What I Can Do';
  // sentences: string[] = ['Angular apps', 'Css animations', 'Vanilla Js', 'HTML5 semantics', 'RxJS', 'logical thinking'];
  sentences: string = 'Angular apps with RxJS';
  fontColor: string = '#ffffff';
  borderColor: string = '#ffffff';
  typingSpeed: number = 300;
  deleteSpeed: number = 50;
  selectedColor: string = 'both';
  selectedSpeed: string = 'both';

  typingControls!: FormGroup;

  clrSl$;
  clrIn$;

  private ind: number = 0;

  constructor(private renderer: Renderer2, private formB: FormBuilder) {
    this.typingControls = formB.group({
      sentsIn: [''],
      fontSIn: [this.fontSize],
      colorSl: [this.selectedColor],
      colorIn: ['#FFFFFF'],
      speedIn: [this.typingSpeed],
      speedSl: [this.selectedSpeed]
    });
    this.clrSl$ = new BehaviorSubject(this.typingControls.controls['colorSl'].value);
    this.clrIn$ = new BehaviorSubject(this.typingControls.controls['colorIn'].value);
  }

  ngOnInit(): void {

    this.typingControls.controls['sentsIn'].valueChanges.subscribe(string => this.sentences = string);
    this.typingControls.controls['fontSIn'].valueChanges.subscribe(val => console.log(val));
    this.typingControls.controls['colorSl'].valueChanges.subscribe(clrSl => this.clrSl$.next(clrSl));
    this.typingControls.controls['colorIn'].valueChanges.subscribe(clrIn => this.clrIn$.next(clrIn));
    this.typingControls.controls['speedSl'].valueChanges.subscribe(val => console.log(val));
    this.typingControls.controls['speedIn'].valueChanges.subscribe(val => console.log(val));
  }

  ngAfterViewInit(): void {
    this.initVariables();
    this.animateTyping();
    combineLatest([this.clrSl$, this.clrIn$]).subscribe(opts => {
      switch (opts[0]) {
        case 'font':
          this.fontColor = opts[1];
          break;
        case 'underline':
          this.underlineColor = opts[1];
          break;
        default:
          this.fontColor = this.underlineColor = opts[1];
          break;
      }
      this.renderer.setStyle(
        this.content.nativeElement,
        "color",
        this.fontColor
      );
      this.renderer.setStyle(
        this.content.nativeElement,
        "border-buttom",
        `2px solid ${this.underlineColor}`
      );
    });
  }

  initVariables() {
    this.renderer.setStyle(
      this.content.nativeElement,
      "font-size",
      this.fontSize
    );
    this.renderer.setStyle(this.content.nativeElement, "padding", "0.1em");

    this.renderer.setStyle(
      this.cursor.nativeElement,
      "border-right-width",
      this.blinkWidth
    );
    this.renderer.setStyle(
      this.cursor.nativeElement,
      "border-right-color",
      this.textColor
    );
    this.renderer.setStyle(
      this.cursor.nativeElement,
      "font-size",
      this.fontSize
    );
  }

  animateTyping(): void {
    // const sentence: string[] = this.sentences[this.ind].split("");
    const sentence: string[] = this.sentences.split("");
    this.renderer.addClass(this.cursor.nativeElement, 'blink');
    const loopTyping = () => {
      if (sentence.length > 0) {
        this.content.nativeElement.innerHTML += sentence.shift();
        this.renderer.setStyle(this.content.nativeElement, 'border-bottom', `2px solid ${this.underlineColor}`);
      } else {
        this.animateDelete();
        return;
      }
      setTimeout(loopTyping, this.typingSpeed);
    };
    loopTyping();
  }

  animateDelete(): void {
    // const sentence: string[] = this.sentences[this.ind].split("");
    const sentence: string[] = this.sentences.split("");
    this.renderer.removeClass(this.cursor.nativeElement, 'blink');
    const loopDelete = () => {
      if (sentence.length > 0) {
        sentence.pop();
        this.content.nativeElement.innerHTML = sentence.join("");
      } else {
        this.ind = this.sentences.length > this.ind + 1 ? this.ind + 1 : 0;
        this.renderer.setStyle(this.content.nativeElement, 'border-bottom', `none`);

        setTimeout(() => {
          this.animateTyping();
        }, 350);
        return;
      }

      setTimeout(loopDelete, this.deleteSpeed);
    };
    loopDelete();
  }

}
