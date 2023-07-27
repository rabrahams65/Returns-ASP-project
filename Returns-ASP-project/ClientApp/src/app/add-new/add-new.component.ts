import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  batchDateToggle = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleBatch() {
    this.batchDateToggle = !this.batchDateToggle;
  }

}
