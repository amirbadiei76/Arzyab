import { Component, Input } from '@angular/core';

@Component({
  selector: 'star-icon',
  imports: [],
  templateUrl: './star-icon.component.html',
  styleUrl: './star-icon.component.css'
})
export class StarIconComponent {
  @Input() selected: boolean = false;
  @Input() isFav?: boolean = false;

}
