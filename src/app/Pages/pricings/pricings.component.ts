import { Component } from '@angular/core';
import { SectionHeadingsComponent } from '../../Components/section-headings/section-headings.component';
import { CardListComponent } from '../../Components/card-list/card-list.component';
import { CardComponent } from '../../Components/card/card.component';

@Component({
  selector: 'app-pricings',
  standalone: true,
  imports: [SectionHeadingsComponent,CardListComponent],
  templateUrl: './pricings.component.html',
  styleUrl: './pricings.component.css'
})
export class PricingsComponent {
heading = "Pricing Plans"
sub_heading = "Choose a Plan That Moves You Forward"

card_list = [
  {
    heading: 'Free',
    sub_heading: 'Basic Commuter',
    description: "Perfect for occasional travelers. Access basic carpool matching, join community events, and track your eco-friendly journeys. Start your sustainable travel journey at no cost and see how small changes make a big difference.",
    button_text: 'Get Started',
    button_route: '/plan-free',
    media_content: 'directions_car',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: '299 Rs. / Month',
    sub_heading: 'Active Rider',
    description: "Designed for daily commuters and active travelers. Unlock unlimited carpool matches, access advanced route planning, and earn rewards for your eco-friendly trips. Save money while contributing to a greener planet every day.",
    button_text: 'Subscribe Now',
    button_route: '/plan-active',
    media_content: 'emoji_transportation',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: '599 Rs. / Month',
    sub_heading: 'Eco Explorer',
    description: "For travelers who want the full experience. Enjoy premium features like bike-sharing priority, detailed carbon footprint reports, and exclusive community events. Make every commute a step towards sustainability.",
    button_text: 'Subscribe Now',
    button_route: '/plan-explorer',
    media_content: 'eco',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: '999 Rs. / Month',
    sub_heading: 'Green Ambassador',
    description: "Ideal for eco-conscious leaders and organizations. Gain access to advanced analytics, group travel management, priority support, and special recognition in the community. Lead the way in promoting sustainable travel and inspire others to join your mission.",
    button_text: 'Subscribe Now',
    button_route: '/plan-ambassador',
    media_content: 'verified_user',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
];

}
