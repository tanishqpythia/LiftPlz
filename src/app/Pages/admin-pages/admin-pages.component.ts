import { Component } from '@angular/core';
import { DisplayTableComponent } from '../../Components/display-table/display-table.component';
import { SectionHeadingsComponent } from '../../Components/section-headings/section-headings.component';
import { ApiService } from '../../services/api/api.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardAvatar } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-pages',
  standalone: true,
  imports: [CommonModule, SectionHeadingsComponent, MatTabsModule,MatIconModule],
  templateUrl: './admin-pages.component.html',
  styleUrl: './admin-pages.component.css'
})
export class AdminPagesComponent {
allHoldingDisplayTableData = {
    summary:[
      ],
    tableData:{
    columns: [],
    data: [ ]
  }};

// admin_page_services = {
//     "holdins":[
//       {
//       "service_name":"1",
//       "service_description":"1",
//       "service_url":"/1",
//       "service_icon":"maticon"
//     },
//       {
//       "service_name":"2",
//       "service_description":"2",
//       "service_url":"/2",
//       "service_icon":""
//     },
//   ],
//   "users":[
//     {
//       "service_name":"3",
//       "service_description":"3",
//       "service_url":"/3",
//       "service_icon":"maticon"
//     }
//   ]
//   }


stockNearTargetDisplayTableData = {
    summary:[
      ],
    tableData:{
    columns: [],
    data: [ ]
  }};

loginStatusDisplayTableData = {
    summary:[
      ],
    tableData:{
    columns: [],
    data: [ ]
  }};

  constructor(private apiService:ApiService,private router:Router){

  }



  admin_page_services: Record<string, any[]> = {
    "Holdings": [
      {
        service_name: "Stock Near Target",
        service_description: "View and track stocks that are approaching their target prices.",
        service_url: "/stockNearTarget",
        service_icon: "trending_up"
      },
      {
        service_name: "All Holdings",
        service_description: "Monitor and analyze your complete portfolio holdings in real time.",
        service_url: "/AllHoldings",
        service_icon: "account_balance"
      },
    ],
    "Users": [
      {
        service_name: "User Login History",
        service_description: "Review user login activity.",
        service_url: "/loginHistoryStatus",
        service_icon: "history"
      }
    ]
  };

  navigateTo(serviceUrl: string) {
    console.log('Navigating to:', serviceUrl);
    this.router.navigate([serviceUrl]); 
  }
  
}
