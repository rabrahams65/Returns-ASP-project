import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerList: CustomerRm[] = []
  closeResult = ''
  page = 1
  pageSize = 10
  collectionSize = 0
  numberOfResults = 0
  prevPhrase = ''

  constructor(private customerService: CustomerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCustomers()
  }

  private getAllCustomers() {
    this.customerService.searchCustomer({}).subscribe(c => {
      this.customerList = c
      this.collectionSize = c.length
      this.numberOfResults = c.length
    }, this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  deleteCustomer(customerToDeleteId: string) {

    this.customerService.deleteCustomer({ id: customerToDeleteId }).subscribe(c => {
      this.customerList = this.customerList.filter(c => {
        c.id != customerToDeleteId
        this.collectionSize = this.customerList.length
        this.numberOfResults = this.customerList.length
      });
      
    }, this.handleError)
  }

  openDeleteCustModal(content: any, deleteCustomerId: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.deleteCustomer(deleteCustomerId)
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  search(phrase: string) {

    if (phrase == '' || (phrase != this.prevPhrase && this.prevPhrase != '')) {
      this.getAllCustomers()
      console.log(`First IF statement runs. Phrase = ${phrase} and prevPhrase = ${this.prevPhrase}`)
    }
    if (phrase.length > 0 && phrase != '') {
      console.log("Search runs with: " + phrase)
      this.customerList = this.customerList.filter(c => c.customerName?.toLowerCase().includes(phrase.toLowerCase().trim()) || c.shortCode?.toLowerCase().trim().includes(phrase.toLowerCase().trim()))
      this.collectionSize = this.customerList.length
      this.numberOfResults = this.customerList.length
      console.log(`Result: ${this.customerList}`)
      this.prevPhrase = phrase
    }
  }

}
