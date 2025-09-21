import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-headings',
  standalone: true,
  imports: [RouterLink,MatRippleModule],
  templateUrl: './section-headings.component.html',
  styleUrl: './section-headings.component.css'
})
export class SectionHeadingsComponent {
  @Input({required: true})  heading = ""
  @Input({})  sub_heading = ""
  @Input({})  Service_url = ""
  @Input({})  Service_msg = "Click on me : To Access This Service"

}
