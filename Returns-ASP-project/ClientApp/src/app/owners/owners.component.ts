import { Component, OnInit } from '@angular/core';
import { OwnerRm } from '../api/models';
import { OwnerService } from '../api/services';
import { AppService } from '../app.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  constructor(private ownerService: OwnerService, private appService: AppService) {
    this.appService.getToast.subscribe(t => {
      this.showToast = t;

      console.log('Message: ' + this.messageFromDetail)
      console.log('Show toast?: ' + this.showToast)

      if (this.showToast == true) {
        this.appService.getMessage.subscribe(m => {
          this.messageFromDetail = m;
          console.log('Message: ' + this.messageFromDetail)
          console.log('Show toast?: ' + this.showToast) })
        setTimeout(() => (this.showToast = false), 3000);
      }
    })
  }

  ownerList: OwnerRm[] = []
  showToast = false;
  messageFromDetail = '';

  ngOnInit(): void {
    this.ownerService.searchOwner().subscribe( o => this.ownerList = o, this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}
