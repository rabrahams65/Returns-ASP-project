import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRm } from '../api/models';
import { OwnerService } from '../api/services';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {

  constructor(private ownerService: OwnerService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private appService: AppService) { }

  ownerId = ''
  owner: OwnerRm = {}
  message = 'Something went wrong...'
  showToast = false;

  form = this.fb.group({
    firstName: [''],
    lastName: ['']
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(f => this.findOwner(f.get("ownerId")))

  }

  findOwner = (faultId: string | null) => {
    this.ownerService.findOwner({ id: faultId! }).subscribe(o => {
      this.owner = o
      this.form.controls.firstName.setValue(o.firstName!)
      this.form.controls.lastName.setValue(o.lastName!)
    })

  }

  save() {
    console.log('First Name: ' + this.getFormFirstName.value)
    console.log('Last Name: ' + this.getFormLastName.value)

    let newOwner: OwnerRm = {
      id: this.owner.id,
      firstName: this.getFormFirstName.value,
      lastName: this.getFormLastName.value
    }

    this.ownerService.createOwner({body: newOwner }).subscribe(() => {
      this.showToast = true
      if (this.form.valid) {
        this.message = 'Owner added successfully'
        console.log('Owner added successfully')
      }
      else if (this.form.valid && !this.form.touched && !this.form.dirty) {
        this.message = 'Nothing added'
        console.log('Nothing added')
      }
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      this.router.navigate(['/owners'])
    })
  }

  //getters
  get getFormFirstName() {
    return this.form.controls.firstName
  }

  get getFormLastName() {
    return this.form.controls.lastName
  }

}
