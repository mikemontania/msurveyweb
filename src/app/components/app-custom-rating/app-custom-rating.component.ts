import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-rating',
  templateUrl: './app-custom-rating.component.html',
  styleUrls: ['./app-custom-rating.component.css']
})
export class AppCustomRatingComponent {
  @Input() rating: number = 0;
  @Input() totalStars: number = 5;
  @Input() bloqueado: boolean = false; // Nueva propiedad para bloquear/desbloquear
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  public stars: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('totalStars' in changes) {
      this.initStars();
    }
  }

  ngOnInit(): void {
    this.initStars();
  }

  private initStars(): void {
    this.stars = Array(this.totalStars).fill(false);
    this.stars = this.stars.map((_, i) => this.rating > i);
      this.ratingChange.emit(this.rating);
  }

  public rate(rating: number) {
    if (!this.bloqueado) { // Verificar si no está bloqueado antes de calificar
      this.stars = this.stars.map((_, i) => rating > i);
      this.ratingChange.emit(rating);
      console.log(rating);
    }
  }
}
