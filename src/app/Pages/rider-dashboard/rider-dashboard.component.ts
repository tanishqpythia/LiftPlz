import { Component } from '@angular/core';
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";

@Component({
  selector: 'app-rider-dashboard',
  standalone: true,
  imports: [SectionHeadingsComponent],
  templateUrl: './rider-dashboard.component.html',
  styleUrl: './rider-dashboard.component.css'
})
export class RiderDashboardComponent {

}
