import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BillingServiceService } from 'src/app/service/billing-service.service';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  start_date:any;
  end_date:any
  BillList:any=[]
  constructor(private billingservice:BillingServiceService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    const today =  new Date();
    const tomorrow =  new Date(today.setDate(today.getDate() + 1));
    let data:any={
      start_date :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      end_date : this.datepipe.transform(tomorrow, 'yyyy-MM-dd')
     }
     this.billingservice.getbills(data).subscribe(data => {
       console.log(data);
       if(data.status == 'success')
       {
         this.BillList=data.data;
       }
     })  

  }
  GetBills()
  {
    let data:any={
     start_date :this.start_date,
     end_date : this.end_date
    }
    this.billingservice.getbills(data).subscribe(data => {
      console.log(data);
      if(data.status == 'success')
      {
        this.BillList=data.data;
      }
    })  
  }
  getTotal()
  {
    return this.BillList.reduce((partialSum:any, a:any) => partialSum + a.Total , 0);
  }
  


}
