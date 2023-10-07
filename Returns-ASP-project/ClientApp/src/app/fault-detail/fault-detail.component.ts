import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaultRm } from '../api/models';
import { FaultService } from '../api/services';

@Component({
  selector: 'app-fault-detail',
  templateUrl: './fault-detail.component.html',
  styleUrls: ['./fault-detail.component.css']
})
export class FaultDetailComponent implements OnInit {

  constructor(private faultService: FaultService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private router: Router) { }
  fault: FaultRm = {}
  showToast = false
  message = ''
  faultAlreadyExists = 'Fault already exists'
  faultIdFromTemplate = ''
  faultList: FaultRm[] = []

  form = this.fb.group({
    faultName: [''],
    description: ['']
  })


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(p => this.findFault(p.get("faultId")))
    this.faultService.searchFault().subscribe(f => this.faultList = f)
  }

  findFault = (faultId: string | null) => {
    this.faultService.findFault({ id: faultId! }).subscribe(f => {
      this.fault = f;
      this.form.controls.faultName.setValue(f.name!)
      this.form.controls.description.setValue(f.description!)
    })
  }

  update() {

    if (this.faultIdFromTemplate == this.faultAlreadyExists) {
      return
    }

    let editedFault: FaultRm = {
      id: this.fault.id,
      name: this.form.controls.faultName.value,
      description: this.form.controls.description.value
    }

    this.faultService.updateFault({ id: this.fault.id!, body: editedFault }).subscribe(() => {
      this.faultService.findFault({ id: this.fault.id! }).subscribe(f => {
        if (f.id == editedFault.id && f.name == editedFault.name && f.description == editedFault.description) {
          this.showToast = true
          if (this.form.valid) {
            this.message = 'Fault updated successfully'
            console.log('Fault updated successfully')
          }
          else if (this.form.valid && !this.form.touched && !this.form.dirty) {
            this.message = 'Nothing updated'
            console.log('Nothing updated')
          }
          //this.appService.setMessage(this.message);
          //this.appService.showToast(this.showToast)
          this.router.navigate(['/faults'])
        }
      })
    })
  }

  faultExists(faultName: string) {
    this.faultIdFromTemplate = ''
    if (this.fault.name?.toLowerCase().trim() != faultName.toLowerCase().trim()) {
      let faultFound = this.faultList.filter(f => f.name?.toLowerCase().trim() == faultName.toLowerCase().trim())
      if (faultFound.length > 0) {
        this.faultIdFromTemplate = this.faultAlreadyExists
      }
    }
  }

}
