import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  CustomerName:string = '';
  SalesManName:string = '';
  ProductList:any=[];
  todayDate= new Date();
  inovicenumber : string | null | undefined='';
  constructor() { 
    if(!localStorage.getItem('InoviceNumber'))
    {
      localStorage.setItem('InoviceNumber','20000')
    }
    this.incrementinovice();
  }

  ngOnInit(): void {
    this.addProduct();
  }
  addProduct()
  {
    let item = {
      desc: '',
      quantity: '',
      rate : '',
    }
    this.ProductList.push(item);
  }
  removeItem(index:any)
  {
    this.ProductList.splice(index,1);
  }
  Print()
  {
    window.print();  
    this.incrementinovice();
  }
  getSubTotal(){
    return ( this.getGrandTotal() / 1.05 );
  }
  getGrandTotal()
  {
    let sum = this.ProductList.reduce((partialSum:any, a:any) => partialSum + (a.quantity * a.rate) , 0);
    return sum;
  }
  getCGST()
  {
    return ( this.getSubTotal() * 0.025 );
  }
  addDesc(event:any,index:any)
  {
    this.ProductList[index].desc=event.target.value;
  }
  addQuantity(event:any,index:any)
  {
    this.ProductList[index].quantity=event.target.value?parseFloat(event.target.value):0;
  }
  addRate(event:any,index:any)
  {
    // console.log(event.target.value)
    this.ProductList[index].rate=event.target.value?parseFloat(event.target.value):0;
    // console.log(this.ProductList);
  }
  resetForm()
  {
    this.CustomerName='';
    this.ProductList=[];
    this.SalesManName='';
    this.addProduct();
    this.incrementinovice();
    this.todayDate= new Date();
  }
  KeyPressValidate(event:any,key:any)
  {
    var inp = String.fromCharCode(event.keyCode);
    // console.log(event.target.selectionStart,event.target.selectionEnd);
    let value = event.target.value.slice(0,event.target.selectionStart)+inp+event.target.value.slice(event.target.selectionEnd)
    let regex:any ;
    if(key=='AlphaNumeric')
    {
      regex = new RegExp('^[A-Za-z0-9-_ ]*$');
    }
    if(key=='int')
    {
      regex = new RegExp('^[0-9]*$')
    }
    if(key=='float')
    {
      regex = new RegExp('^[0-9]*([.]{1}[0-9]*){0,1}$')
    }
    if(regex.test(value))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
  incrementinovice()
  {
    let number = localStorage.getItem('InoviceNumber');
    this.inovicenumber= (parseInt(number?number:'1') + 1).toString();
    localStorage.setItem('InoviceNumber',this.inovicenumber)
  }
}
