import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  contactdetails: any = {
    introTitle: "Contact Us - LiftPls",
    introStatementBold: "We’re here to help you travel greener, safer, and smarter!",
    introStatement: "LiftPls is a community-driven platform built for India’s Tier-2 cities. Our team is here to support you – whether you have questions, feedback, or need help navigating our trusted ride-sharing services.",
    contactInfo: [
      { title: "Phone", value: "+91 90000 12345", maticon: "call" },
      { title: "Email", value: "support@liftpls.com", maticon: "mail" },
      { title: "Address", value: "LiftPls Mobility Solutions, Jaipur, Rajasthan, India", maticon: "place" },
      { title: "Website", value: "www.liftpls.com", maticon: "language" }
    ]
  };
}
