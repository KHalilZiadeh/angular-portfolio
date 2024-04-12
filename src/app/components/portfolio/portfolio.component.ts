import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @ViewChild('plus', { static: false }) plus!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  rotate() {
    this.plus.nativeElement.classList.contains('rotate') ?
      this.renderer.removeClass(this.plus.nativeElement, 'rotate') :
      this.renderer.addClass(this.plus.nativeElement, 'rotate');
  }

}
