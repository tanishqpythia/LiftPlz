import { Component } from '@angular/core';
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SectionHeadingsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
