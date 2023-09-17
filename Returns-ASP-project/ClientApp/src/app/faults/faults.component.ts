import { Component, OnInit } from '@angular/core';
import { FaultRm } from '../api/models';
import { FaultService } from '../api/services';

@Component({
  selector: 'app-faults',
  templateUrl: './faults.component.html',
  styleUrls: ['./faults.component.css']
})
export class FaultsComponent implements OnInit {

  constructor(private faultService: FaultService) { }
  faultList: FaultRm[] = []

  ngOnInit(): void {
    this.faultService.searchFault().subscribe(f => this.faultList = f, this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}
