import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required: true})  heading:any = ""
  @Input()  sub_heading:any = ""
  @Input()  description:any = ""
  @Input()  button_text:any = ""
  @Input()  button_route:any = ""
  @Input()  media_content:any = ""
  @Input()  card_bg:any = "body-component-bg"
  @Input()  is_button:any = false
  @Input()  is_mat_icon:any = false
  @Input()  is_google_icon:any = false
  @Input()  is_image:any = false
  bg_color="--body-component-bg"
  ngOnInit(): void {
    this.bg_color = "--" + this.card_bg
    
  }
}
