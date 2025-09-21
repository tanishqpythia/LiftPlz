import { Component } from '@angular/core';
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";
import { CardListComponent } from '../../Components/card-list/card-list.component';
import { CardComponent } from '../../Components/card/card.component';
import { DisplayTableComponent } from "../../Components/display-table/display-table.component";
import Aos from 'aos';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [SectionHeadingsComponent, CardListComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
heading = "Our Services"
sub_heading = "Welcome to LiftsPlz, your eco-friendly travel platform! We connect commuters, cyclists, and carpoolers to reduce carbon emissions, save travel costs, and promote sustainable mobility. Whether you're going to work, school, or exploring the city, our platform makes it easy to find like-minded travelers heading in the same direction. Join our community and travel responsibly while making new connections."

card_list = [
  {
    heading: 'Carpool Matching',
    sub_heading: '',
    description: 'Find and connect with travelers going in the same direction. Our smart matching algorithm ensures you share rides efficiently, saving fuel, reducing emissions, and building a community of eco-conscious commuters.',
    button_text: 'Learn More',
    button_route: '/carpool-matching',
    media_content: 'car_rental',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Bike Sharing Network',
    sub_heading: '',
    description: 'Access a wide network of shared bicycles for last-mile connectivity. Whether you need a quick ride to the station or a leisurely eco-friendly tour, our platform makes cycling convenient and green.',
    button_text: 'Explore Bikes',
    button_route: '/bike-sharing',
    media_content: 'pedal_bike',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Eco-Travel Guides',
    sub_heading: '',
    description: 'Discover sustainable travel tips, local green spots, and eco-friendly destinations. Our guides help you make choices that are both enjoyable and environmentally responsible.',
    button_text: 'Read Guides',
    button_route: '/eco-guides',
    media_content: 'menu_book',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Community Events',
    sub_heading: '',
    description: 'Participate in community rides, clean-up drives, and eco-friendly challenges. Connect with like-minded travelers and make your daily commute part of a larger sustainable movement.',
    button_text: 'Join Events',
    button_route: '/community-events',
    media_content: 'group',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Travel Carbon Tracker',
    sub_heading: '',
    description: 'Track your carbon footprint from daily commutes. See how much CO₂ you save by carpooling, biking, or using shared rides. Our platform provides insights to help you reduce your environmental impact over time.',
    button_text: 'Track Now',
    button_route: '/carbon-tracker',
    media_content: 'eco',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Safety & Verification',
    sub_heading: '',
    description: 'Your safety is our priority. All travelers are verified and rated to ensure trustworthy connections. Enjoy a secure and reliable eco-friendly commuting experience.',
    button_text: 'Learn More',
    button_route: '/safety-verification',
    media_content: 'verified_user',
    is_button: true,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
];
}