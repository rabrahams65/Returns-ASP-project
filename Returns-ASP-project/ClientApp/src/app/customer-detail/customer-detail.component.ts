import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {


  }



}
