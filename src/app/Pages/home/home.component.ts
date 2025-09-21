import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OurServicesComponent } from "../our-services/our-services.component";
import { PricingsComponent } from "../pricings/pricings.component";
import { EmphasizerComponent } from "../emphasizer/emphasizer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, OurServicesComponent, PricingsComponent, EmphasizerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
welcome_text = "Welcome"
homepage_intro = "Connecting travelers, reducing carbon footprints, and making every journey eco-friendly, social, and cost-effective."
}
