import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaultRm } from '../api/models';
import { FaultService } from '../api/services';

@Component({
  selector: 'app-add-fault',
  templateUrl: './add-fault.component.html',
  styleUrls: ['./add-fault.component.css']
})
export class AddFaultComponent implements OnInit {

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
    this.faultService.searchFault().subscribe(f => this.faultList = f)
  }

  save() {

    if (this.faultIdFromTemplate == this.faultAlreadyExists) {
      return
    }

    let editedFault: FaultRm = {
      id: this.fault.id,
      name: this.form.controls.faultName.value,
      description: this.form.controls.description.value
    }

    this.faultService.createFault({ body: editedFault }).subscribe(() => {
      this.showToast = true
      if (this.form.valid) {
        this.message = 'Fault added successfully'
        console.log('Fault added successfully')
      }
      else if (this.form.valid && !this.form.touched && !this.form.dirty) {
        this.message = 'Nothing added'
        console.log('Nothing added')
      }
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      this.router.navigate(['/faults'])
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
