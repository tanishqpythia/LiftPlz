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
  heading = "Our Services";
  sub_heading = "LiftPls offers a community-driven platform, connecting two-wheeler riders with commuters headed in the same direction. Designed for Tier-2 cities like Jaipur, we make urban travel affordable, convenient, and more sustainable—with safety, verification, and rewards built in.";

  card_list = [
    {
      heading: 'Verified Ride-Sharing',
      sub_heading: '',
      description: 'Share short-distance rides on two-wheelers with trusted, verified members. Our platform ensures secure connections with Aadhaar, driving license, and vehicle verification for every rider and commuter.',
      button_text: 'Find a Ride',
      button_route: '/ride-matching',
      media_content: 'two_wheeler',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Reward Points & Cash Payouts',
      sub_heading: '',
      description: 'Riders earn LiftPls Points for every completed trip. Track rides, reliability, and convert rewards into monthly cash via UPI or bank transfer. Top riders gain badges and special bonuses.',
      button_text: 'View Dashboard',
      button_route: '/rider-rewards',
      media_content: 'workspace_premium',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Affordable Commuter Subscription',
      sub_heading: '',
      description: 'Activate ride-matching and messaging for a low monthly fee. Get discounts with referrals or opt for “Buddy” gifting. Manage your plan and renew with bonus perks.',
      button_text: 'Choose Plan',
      button_route: '/subscription',
      media_content: 'card_membership',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Eco & Social Impact Tracker',
      sub_heading: '',
      description: 'Reduce carbon emissions and move towards greener habits by sharing rides. Our platform offers insights into your CO₂ savings and celebrates the impact with stories and monthly recognition.',
      button_text: 'See Impact',
      button_route: '/impact-tracker',
      media_content: 'eco',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Community Events & Volunteer Circles',
      sub_heading: '',
      description: 'Join city rides, clean-up drives, and awareness campaigns. Become a LiftPls “Champion” and help foster shared travel culture in your area.',
      button_text: 'Join In',
      button_route: '/community',
      media_content: 'groups',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    },
    {
      heading: 'Safety & Inclusion First',
      sub_heading: '',
      description: 'All profiles undergo rigorous verification. We prioritize safety, inclusivity, and mutual trust, making daily travel secure for users of all ages and backgrounds.',
      button_text: 'See How',
      button_route: '/trust-safety',
      media_content: 'verified_user',
      is_button: true,
      is_mat_icon: true,
      is_google_icon: false,
      is_image: false,
      card_background:"body-component-bg"
    }
  ];
}
