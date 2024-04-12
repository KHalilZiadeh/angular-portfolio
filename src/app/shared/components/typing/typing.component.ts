import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit, AfterViewInit {

  @ViewChild('content', { static: false }) content!: ElementRef;

  title: string = 'What I Can Do';
  sentences: string[] = ['Angular apps', 'Css animations', 'Vanilla Js', 'HTML5 semantics', 'porblem Solving', 'logical thinking'];
  typingSpeed: number = 300;
  deleteSpeed: number = 50;
  private ind: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.animateTyping();
  }


  animateTyping(): void {
    const sentence: string[] = this.sentences[this.ind].split("");
    const loopTyping = () => {
      if (sentence.length > 0) {
        this.content.nativeElement.innerHTML += sentence.shift();
      } else {
        this.animateDelete();
        return;
      }
      setTimeout(loopTyping, this.typingSpeed);
    };
    loopTyping();
  }

  animateDelete(): void {
    const sentence: string[] = this.sentences[this.ind].split("");
    const loopDelete = () => {
      if (sentence.length > 0) {
        sentence.pop();
        this.content.nativeElement.innerHTML = sentence.join("");
      } else {
        this.ind = this.sentences.length > this.ind + 1 ? this.ind + 1 : 0;

        this.animateTyping();
        return;
      }

      setTimeout(loopDelete, this.deleteSpeed);
    };
    loopDelete();
  }

}
