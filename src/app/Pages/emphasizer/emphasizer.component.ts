import { Component } from '@angular/core';
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";
import { CardListComponent } from '../../Components/card-list/card-list.component';
import { CardComponent } from '../../Components/card/card.component';

@Component({
  selector: 'app-emphasizer',
  standalone: true,
  imports:[SectionHeadingsComponent,CardListComponent,CardComponent],
  templateUrl: './emphasizer.component.html',
  styleUrl: './emphasizer.component.css'
})
export class EmphasizerComponent {
heading = "Why Choose LiftPlz"
sub_heading = "We care about your travel, your safety, and the environment. Our team is always ready to help, ensuring every ride you take is efficient, eco-friendly, and connected with the community. Let's travel green together!"

note_heading = "IMPORTANT NOTICE"
note_sub_heading = "LiftPlz is a community-based eco-friendly travel platform. While we provide tools, guidance, and a trusted network to connect travelers, we do not guarantee rides or control third-party actions. Users are responsible for their travel decisions, personal safety, and adherence to local traffic regulations. Please exercise caution, verify ride partners, and follow safety protocols at all times. LiftPlz is not liable for any incidents, losses, or damages during rides. By using our platform, you acknowledge and accept these terms."

card_list = [
  {
    heading: 'Eco-Friendly Focus',
    sub_heading: '',
    description: "LiftPlz is dedicated to reducing carbon emissions and promoting sustainable travel. Every ride shared contributes to a greener planet and a cleaner environment, helping you make a positive impact with your daily commute.",
    button_text: '',
    button_route: '',
    media_content: 'eco',
    is_button: false,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Community Driven',
    sub_heading: '',
    description: "Join a vibrant community of like-minded travelers. Connect, share rides, and participate in local eco-events. Our platform fosters trust and collaboration, making your daily travel more social and rewarding.",
    button_text: 'Learn More',
    button_route: '/community',
    media_content: 'group',
    is_button: false,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Smart Matching',
    sub_heading: '',
    description: "Our advanced ride-matching system pairs you with travelers heading in the same direction. Save time, reduce costs, and make your commute efficient while minimizing environmental impact.",
    button_text: 'Learn More',
    button_route: '/smart-matching',
    media_content: 'directions_car',
    is_button: false,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Safety & Verification',
    sub_heading: '',
    description: "Your safety is our priority. All users are verified and rated to ensure trustworthy connections. Ride confidently knowing that LiftPlz fosters a secure and reliable travel environment.",
    button_text: 'Learn More',
    button_route: '/safety',
    media_content: 'verified_user',
    is_button: false,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
  {
    heading: 'Educational Resources',
    sub_heading: '',
    description: "We provide resources and tips on sustainable travel, carbon footprint reduction, and eco-friendly commuting. Learn how to make each ride count for both your wallet and the planet.",
    button_text: 'Learn More',
    button_route: '/eco-tips',
    media_content: 'menu_book',
    is_button: false,
    is_mat_icon: true,
    is_google_icon: false,
    is_image: false,
    card_background:"body-component-bg"
  },
];

}
