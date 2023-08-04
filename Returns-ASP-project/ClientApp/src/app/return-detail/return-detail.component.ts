import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnRm } from '../api/models/return-rm';
import { ReturnService } from '../api/services';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private returnService: ReturnService) { }

  returnId: string = 'not loaded';
  batchDateDisable = false;
  return: ReturnRm = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => this.findReturn(p.get("returnId")));

    console.log(this.returnId);
    console.log(this.return);

  }

  private findReturn = (returnId: string | null) => {
    this.returnId = returnId ?? 'not passed';

    this.returnService.findReturn({ id : this.returnId }).subscribe(r => this.return = r);
  }

  toggleBatch() {
    this.batchDateDisable = !this.batchDateDisable;
  }


}
