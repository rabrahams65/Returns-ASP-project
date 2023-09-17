import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaultRm } from '../api/models';
import { FaultService } from '../api/services';

@Component({
  selector: 'app-fault-detail',
  templateUrl: './fault-detail.component.html',
  styleUrls: ['./fault-detail.component.css']
})
export class FaultDetailComponent implements OnInit {

  constructor(private faultService: FaultService, private activatedRoute: ActivatedRoute) { }
  faultId = ''
  fault: FaultRm = {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(p => this.findFault(p.get("faultId")))
  }

  findFault = (faultId: string | null) => {
    this.faultService.findFault({ id: faultId! }).subscribe(f => this.fault = f)
  }

}
