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
    introTitle:'',
    introStatementBold: '',
    introStatement: '',
    contactInfo: [],
  };

  constructor(private apiService: ApiService) {
    // this.getContactdata();
  }

  // getContactdata() {
  //   this.apiService.getSync({
  //     endpoint: "getdetails",
  //     isAuthRequired: false,
  //     isUserIdRequired: false
  //   }).subscribe(res => {
  //     this.contactdetails.introTitle = res.data.introTitle;
  //     this.contactdetails.introStatementBold = res.data.introStatementBold;
  //     this.contactdetails.introStatement = res.data.introStatement;
  //     this.contactdetails.contactInfo = JSON.parse(res.data.contactInfo);
  //   });
  // }
}
