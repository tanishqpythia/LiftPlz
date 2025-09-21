import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

interface Card {
  heading: string;
  sub_heading: string;
  description: string;
  button_text: string;
  button_route: string;
  media_content: string;
  is_button: boolean;
  is_mat_icon: boolean;
  is_google_icon: boolean;
  is_image: boolean;
  card_background: string
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() cardlist: Card[] = [];
  @Input() card_heading_alignment:any = 'auto'
  @Input() card_sub_heading_alignment:any = 'auto'
  @Input() card_width:any = '50'
  
  ngOnInit(): void {
  }
}
