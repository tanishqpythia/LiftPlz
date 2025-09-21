import { Component, inject, ViewChild } from '@angular/core';
import { DisplayTableComponent } from "../../Components/display-table/display-table.component";
import { SectionHeadingsComponent } from "../../Components/section-headings/section-headings.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChartComponent, ChartOptions } from "../../Components/chart/chart.component";
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationTriggerService } from '../../services/notificationTrigger/notification-trigger.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../../Components/dialogbox/dialogbox.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatGridListModule, DisplayTableComponent, SectionHeadingsComponent, ChartComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {



  chartOptions: ChartOptions = {
    series: [100],
    chart: {
      width: 380,
      type: "donut"
    },
    labels: ['Neutral',],
    fill: {
      type: "gradient",
      colors: ['#5085A5']
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
      },
      markers: {
        fillColors: ['#5085A5']
      }
    },
    tooltip: {
      enabled: false,
      fillSeriesColor: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
        },
        expandOnClick: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    dataLabels: {
      enabled: false
    }
  };









  constructor(private apiService: ApiService, private router: Router, private auth: AuthService, private notification: NotificationTriggerService, private ngxLoader: NgxUiLoaderService) {
    // this.ngxLoader.start()
    // this.getTableData()
    // this.getSummaryInformation()
    // this.getAlgoStatus()
    // this.getChartDetails()
    // this.showDisclaimer() 
    // this.ngxLoader.stop()
  }









  actions = [
    { title: 'Start Algo', key: 'StartAlgo', activeLabel: 'ON', inactiveLabel: 'OFF', isOn: false, get_endpoint: "GetQucikAlgoActivation/getquickalgoactivestatussingle", update_endpoint: "UpdateAlgoUser/quickactivealgo" },
    { title: 'Start / Stop Buying', key: 'startBuying', activeLabel: 'ON', inactiveLabel: 'OFF', isOn: false, get_endpoint: "GetQucikAlgoActivation/getquickalgoactivestatussingle", update_endpoint: `BuySellActivation/buyingactivationself?userId=${this.auth.getUserId()}` },
    { title: 'Start / Stop Selling', key: 'startSelling', activeLabel: 'ON', inactiveLabel: 'OFF', isOn: false, get_endpoint: "GetQucikAlgoActivation/getquickalgoactivestatussingle", update_endpoint: `BuySellActivation/sellingactivationself?userId=${this.auth.getUserId()}` },
  ];




  // Toggle the state of the button based on its key
  toggleButtonClick(QuickAction: any) {
    console.log("Action", QuickAction)
    let key = QuickAction.key
    const action = this.actions.find(a => a.key === key);
    console.log("found Action", action)
    let dataBody = {}
    if (action) {
      console.log("action", action.isOn)
      action.isOn = !action.isOn;
      if (action.key == "startBuying" || action.key == "startSelling") {
        dataBody = {
          "userID": this.auth.getUserId(),
          "startBuying": this.actions.find(a => a.key === "startBuying")?.isOn,
          "startSelling": this.actions.find(a => a.key === "startSelling")?.isOn
        }
      }
      else {
        dataBody = { userID: this.auth.getUserId(), isActive: action.isOn, isAlgoActive: action.isOn, isPaperTradeActive: action.isOn, isCopyTradeAllowed: action.isOn };

      }
    }

    this.sendAlgoEnableRequest(QuickAction.update_endpoint, dataBody, action?.isOn)
  }

 
  sendAlgoEnableRequest(endpoint: any, body: any, mode: any) {
    console.log("clicked algo mode", mode)

    // const body2 = { "userID": 5, "startBuying": true, "startSelling": true }

    this.ngxLoader.start()

    this.apiService.postSync({ endpoint: `${endpoint}`, body: body, isAuthRequired: true }).subscribe(
      (response: any) => {
        console.log(response)
        if (response && response.status === 200) {
          this.notification.showNotification({
            notificationType: 'success',
            Message: "Algo Status changed successfully",
            verticalPosition: 'top',
          });
          this.getAlgoStatus()
          this.ngxLoader.stop()

        }
      },
      (error: any) => {
        this.notification.showNotification({
          notificationType: 'error',
          Message: "failed to change Algo Status",
          verticalPosition: 'top',
        });
        this.ngxLoader.stop()
        this.getAlgoStatus()

      });

  }



  getAlgoStatus() {
    console.log("getting Algo status")
    this.ngxLoader.start()
    // alert("getting Algo status")
    // this.apiService.getSync({ endpoint: "AngelTotalHoldingSummary/getallholdingportfoliosingle?userId=5", isAuthRequired: true }).subscribe(
    this.apiService.getSync({ endpoint: "GetQucikAlgoActivation/getquickalgoactivestatussingle", isAuthRequired: true, isUserIdRequired: true }).subscribe(
      (response: any) => {
        console.log("getting Algo status", response);
        if (response && response.status === 200) {
          this.actions[0].isOn = response.data.data[0].value
          this.actions[1].isOn = response.data.data[1].value
          this.actions[2].isOn = response.data.data[2].value
          // this.DisplayTableData.tableData.columns[0] = this.DisplayTableData.tableData.columns[0].toLowerCase()
          // this.DisplayTableData.tableData.data = response.data.data
          console.log(this.actions);
        }
        this.ngxLoader.stop()
      },
      (error: any) => {
        console.error(error);
        this.ngxLoader.stop()
      }
    );

  }



  getChartDetails() {
    console.log("getting chart details")
    this.ngxLoader.start()
    // alert("getting Algo status")
    // this.apiService.getSync({ endpoint: "AngelTotalHoldingSummary/getallholdingportfoliosingle?userId=5", isAuthRequired: true }).subscribe(
    this.apiService.getSync({ endpoint: "AngelTotalHoldingSummaryList/getpercentageprofitloossingle", isAuthRequired: true, isUserIdRequired: true }).subscribe(
      (response: any) => {
        console.log("getting chart details", response);
        if (response && response.status === 200) {

          let NumValue = Math.abs(Number(response.data.data[0].value)); // Remove sign by taking the absolute value
          const neutralValue = 100 - NumValue;

          this.chartOptions.series = [NumValue, neutralValue];

          if (response.data.data[0].outcome == "L") {
            this.chartOptions.labels = [`Overall Loss`, "Neutral"];
            this.chartOptions.fill.colors = ['#dc3545', '#5085A5'];
            if (this.chartOptions.legend?.markers) {
              this.chartOptions.legend.markers.fillColors = ['#dc3545', '#5085A5'];
            }
          }
          else {
            this.chartOptions.labels = ['Overall Profit', "Neutral"];
            this.chartOptions.fill.colors = ['#28a745', '#5085A5'];
            if (this.chartOptions.legend?.markers) {
              this.chartOptions.legend.markers.fillColors = ['#28a745', '#5085A5'];
            }

          }
          // this.DisplayTableData.tableData.columns[0] = this.DisplayTableData.tableData.columns[0].toLowerCase()
          // this.DisplayTableData.tableData.data = response.data.data
          console.log(this.actions);
          this.ngxLoader.stop()
        }
      },
      (error: any) => {
        console.error(error);
        this.ngxLoader.stop()
      }
    );

  }








  DisplayTableData = {
    summary: [
      // {name:"Total P&L", value:125, Outcome:"P"},
      // {name:"Total investment", value:125.2365,  Outcome:"N"},
      // {name:"Total Holding Value", value:619280.00, Outcome:"N"},
      // {name:"TotalInvValue", value:690205.00, Outcome:"N"},
      //     {name:"totalProfitAndLoss", value:70924.79,  Outcome:"P"},
    ],
    tableData: {
      columns: [],
      data: [
        // { noData: 'No data'},
      ]
    }
  };




  getSummaryInformation() {
    console.log("getting running trades data")
    this.ngxLoader.start()
    this.apiService.getSync({ endpoint: "AngelTotalHoldingSummaryList/getholdinsummarylistsingle", isAuthRequired: true, isUserIdRequired: true }).subscribe(
      (response: any) => {
        console.log("holding summary", response);
        if (response && response.status === 200) {
          this.DisplayTableData.summary = response.data.data
          console.log(this.DisplayTableData);
        }
        this.ngxLoader.stop()
      },
      (error: any) => {
        console.error(error);
        this.ngxLoader.stop()
      }
    );
  }

  getTableData() {
    console.log("getting running trades data")
    this.ngxLoader.start()
    // this.apiService.getSync({ endpoint: "AngelTotalHoldingSummary/getallholdingportfoliosingle?userId=5", isAuthRequired: true }).subscribe(
    this.apiService.getSync({ endpoint: "AngelTotalHoldingSummary/getallholdingportfoliosingle?pageNumber=1&pageSize=10500", isAuthRequired: true, isUserIdRequired: true }).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.status === 200) {
          this.DisplayTableData.tableData.columns = response.data.columns
          // this.DisplayTableData.tableData.columns[0] = this.DisplayTableData.tableData.columns[0].toLowerCase()
          this.DisplayTableData.tableData.data = response.data.data
          console.log(this.DisplayTableData);
          this.ngxLoader.stop()
        }
      },
      (error: any) => {
        console.error(error);
        this.ngxLoader.stop()
      }
    );
  }
}