import { Component, OnInit } from '@angular/core';
import { OwnerRm } from '../api/models';
import { OwnerService } from '../api/services';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  constructor(private ownerService: OwnerService  ) { }

  ownerList: OwnerRm[] = []

  ngOnInit(): void {
    this.ownerService.searchOwner().subscribe( o => this.ownerList = o, this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}
