import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts  from 'highcharts' ;
import { HighchartsChartModule } from 'highcharts-angular';
import { BillingServiceService } from 'src/app/service/billing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  start_date:any;
  end_date:any
  Highcharts: typeof Highcharts = Highcharts; 
  PiechartOptions: any = {}; 
  SaleschartOptions: any ={};
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true;
  salesPieSeries :any =[];
  salesLineSeries: any;
  constructor(private billingservice : BillingServiceService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    let date = new Date();
    let start_date = new Date(date.getFullYear(), date.getMonth(), 1);
    let end_date = new Date(date.getFullYear(), date.getMonth()+1, 0);
    this.getgraphData(start_date, end_date);
    
  }

  GetData()
  {
    this.getgraphData(this.start_date,this.end_date);
  }

  getgraphData(start_date:any,end_date:any)
  {
    let data:any={
      start_date :this.datepipe.transform(start_date, 'yyyy-MM-dd'),
      end_date : this.datepipe.transform(end_date, 'yyyy-MM-dd')
     }
     this.billingservice.getAnalyticsPieGraph(data).subscribe(data => {
       console.log(data);
       if(data.status == 'success')
       {
          this.salesPieSeries = data.SalesPieData;
          this.salesLineSeries = data.SalesSeriesDate;
          this.InitPieChart();
          this.InitLineChart();
          this.updateFlag = true;
       }
     }) 
  }

  InitPieChart()
  {
    this.PiechartOptions = {
          chart: {
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Total Sales Share percentage',
              align: 'center'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                  }
              }
          },
          series: [{
            name: 'Rupees',
            colorByPoint: true,
            data:this.getFomattedSeriesforPie(this.salesPieSeries)
        }]
      }
    }

  InitLineChart()
  {
    this.SaleschartOptions = {
      chart: {
        type: 'spline'
    },
      title: {
          text: 'Total Sales Per Day',
          align: 'center'
      },
  
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
      },
      yAxis: {
        title: {
            text: 'Sales (Rs)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      },
      plotOptions: {
          series: {
              marker: {
                  enabled: true,
                  radius: 2.5
              }
          }
      },
      legend: {
          // layout: '',
          align: 'center',
          verticalAlign: 'bottom'
      },
  
  
      series: this.getFormattedSeriesForLine(this.salesLineSeries)
    }
  
  }

    getFomattedSeriesforPie(data:any)
    {
      let pieseriesdata:any = [];
      data.forEach((element:any,index:number) => {
        if(index==1)
        {
          pieseriesdata.push({
            name : element.desc,
            y : parseInt(element.Total),
            sliced: true,
            selected: true
          })
        }
        else{
          pieseriesdata.push({
            name : element.desc,
            y : parseInt(element.Total)
          })
        }
      });
      return pieseriesdata;
    }

    getFormattedSeriesForLine(data:any)
    {
      let series:any=[];
      data.forEach((element:any,index:any) => {
        
        if(series.filter((a:any)=>a.name == element.desc).length!=0)
        {
          // console.log(series.filter((a:any)=>a.name == element.desc))
          let date1 = new Date(element.Date) 
          let point:any = [Date.UTC(date1.getFullYear(), date1.getMonth(),  date1.getDate()), parseInt(element.Total)];
          series.filter((a:any)=>a.name == element.desc)[0].data.push(point)
        }
        else
        {
          let item:any = {
            name: element.desc,
            data : []
          }
          // console.log(new Date(element.Date))
          let date1 = new Date(element.Date) 
          let point:any = [Date.UTC(date1.getFullYear(), date1.getMonth(),  date1.getDate()), parseInt(element.Total)];

          item.data.push(point);
          series.push(item);
        }
        
      });
      console.log(series);
      return series;
    }
}

