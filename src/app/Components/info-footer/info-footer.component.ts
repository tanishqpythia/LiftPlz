import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule,CommonModule],
  templateUrl: './info-footer.component.html',
  styleUrl: './info-footer.component.css'
})
export class InfoFooterComponent implements OnInit {
  infoFooterContent: any = {
    introTitle: '',
    introStatementBold: '',
    introStatement: '',
    contactInfo: [],
    explor: []
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  //   this.apiService.getSync({
  //     endpoint: "InfoFooterContent/getcontactinformation",
  //     isAuthRequired: false, 
  //     isUserIdRequired: false
  //   }).subscribe(res => {
  //     console.log("_________ res______",res)
  //       this.infoFooterContent.introTitle = res.data.introTitle;
  //       this.infoFooterContent.introStatementBold = res.data.introStatementBold;
  //       this.infoFooterContent.introStatement = res.data.introStatement;
  //       this.infoFooterContent.contactInfo = JSON.parse(res.data.contactInfo);
  //       this.infoFooterContent.explor = JSON.parse(res.data.explor);
  //     });
  }
}
