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
  heading = "Why Choose LiftPls";
  sub_heading = "LiftPls connects commuters and two-wheeler riders in Tier-2 cities for verified, affordable, and greener daily travel. We combine strong safety standards, real rewards, and the spirit of community so every journey is reliable and local.";

  note_heading = "IMPORTANT NOTICE";
  note_sub_heading = "LiftPls is a trusted, community-first mobility platform connecting travelers for short-distance rides. While we verify users and encourage safe practice, every commuter remains responsible for their travel choices, following local safety rules and verifying ride partners. LiftPls does not guarantee rides or accept liability for incidents in transit.";

  card_list = [
    {
      heading: 'Verified & Trusted Network',
      sub_heading: '',
      description: "All users verify their Aadhaar, driving license, and vehicle RC to join LiftPls. This creates an inclusive, safe, and reliable ride-sharing community.",
      button_text: "",
      button_route: "",
      media_content: 'verified_user',
      is_button: false,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Affordable Mobility',
      sub_heading: '',
      description: "Commuters pay a low, monthly subscription for unlimited access to verified ride-matching. Riders never pay to participate and both benefit from discounts, gifts, and special events.",
      button_text: "",
      button_route: "",
      media_content: 'credit_card',
      is_button: false,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Reward Points & Monthly Payouts',
      sub_heading: '',
      description: "Riders earn LiftPls points for every verified ride. Cash out monthly via UPI, bank transfer, or wallet and unlock badges for top performance.",
      button_text: "",
      button_route: "",
      media_content: 'workspace_premium',
      is_button: false,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Eco Impact Tracker',
      sub_heading: '',
      description: "Track how many kilograms of CO₂ emissions you save by carpooling. LiftPls celebrates collective climate action with community features, stories, and monthly leaders.",
      button_text: "",
      button_route: "",
      media_content: 'eco',
      is_button: false,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Local Community Champions',
      sub_heading: '',
      description: "LiftPls fosters a shared travel identity—join volunteer circles, clean-up drives, and local events. Become a city champion and amplify a culture of 'Chale Hum Sath Sath.'",
      button_text: "",
      button_route: "",
      media_content: 'groups',
      is_button: false,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    }
  ];
}
