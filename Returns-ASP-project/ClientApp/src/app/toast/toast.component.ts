import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Output() closeHit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: string = 'Toast'
  @Input() message: string = 'Enter a message'

  fromChild = 'Message from the child components (toastComponent)'

  constructor() { }

  ngOnInit(): void {
    
    console.log("displayToast method ran")
    var toaster = [].slice.call(document.querySelectorAll('.toast'))
    toaster.map(function (toastEl) {
      return new bootstrap.Toast(toastEl, {})
    })

    

  }

  displayToast () {
    
  }

  anotherMethod() {
    console.log("Another method ran")
  }

}
