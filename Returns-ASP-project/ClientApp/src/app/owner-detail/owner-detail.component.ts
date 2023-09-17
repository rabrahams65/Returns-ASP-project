import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnerRm } from '../api/models';
import { OwnerService } from '../api/services';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  constructor(private ownerService: OwnerService, private activatedRoute: ActivatedRoute) { }

  ownerId = ''
  owner: OwnerRm = {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(f => this.findOwner(f.get("ownerId")))
  }

  findOwner = (faultId: string | null) => {
    this.ownerService.findOwner({id : faultId!}).subscribe(o => this.owner = o)
  }

}
