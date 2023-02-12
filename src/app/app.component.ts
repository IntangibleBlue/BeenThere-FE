import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PinModalComponent } from './pin-modal/pin-modal.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { Pin } from './pin';
import { PindataService } from './pindata.service';
import { ViewModalComponent } from './view-modal/view-modal.component';
import { UpdatePinComponent } from './update-pin/update-pin.component';
import { ListModalComponent } from './list-modal/list-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

// Declare variables

  title = 'frontend';
  pin: Pin = new Pin();
  pins: Pin[]=[];

// Page reload function

  reloadPage(){
    location.reload();
  }

  constructor(private modalService: NgbModal, private pinDataService: PindataService) {}

// Modal functions

  openPinModal() {
    const modalRef = this.modalService.open(PinModalComponent, {size: 'lg', modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.pin = this.pin;
  }

  openLoginModal() {
    this.modalService.open(UserLoginComponent, {size: 'md', backdrop: 'static', modalDialogClass: 'modal-dialog-centered'});
  }

  openViewModal(){
    const modalRef = this.modalService.open(ViewModalComponent, {size: 'xl', modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.pin = this.pin;
    modalRef.componentInstance.pins = this.pins;
  }

  openUpdateModal(){
    const modalRef = this.modalService.open(UpdatePinComponent, {size: 'lg', modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.pin = this.pin;
    modalRef.componentInstance.pins = this.pins;
    modalRef.componentInstance.id = this.pin.id;
  }

  openListModal(){
    const modalRef = this.modalService.open(ListModalComponent, {size: 'lg', modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.pin = this.pin;
    modalRef.componentInstance.pins = this.pins;
    modalRef.componentInstance.id = this.pin.id;
    
  }

//Open login modal on startup

  ngOnInit():void {
    this.openLoginModal();
  }
}   