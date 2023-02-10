import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PindataService } from '../pindata.service';
import { ViewModalComponent } from '../view-modal/view-modal.component';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.css']
})
export class PinModalComponent {

  @Input() data: any;
  @Input() pin: any;
  @Input() id: any;
  @Input() pins: any;

  openViewModal(){
    const modalRef = this.modalService.open(ViewModalComponent, {size: 'xl', modalDialogClass: 'modal-dialog-centered'});
    modalRef.componentInstance.pin = this.pin;
    modalRef.componentInstance.pins = this.pins;
  }

  renderPins(){
    this.pinDataService.getAllPins().subscribe(data=>{
      this.pins=data;
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 35, lng: 5 },
        zoom: 3,
        minZoom: 2,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        restriction: {
          latLngBounds: {
              north: 85,
              south: -85,
              west: -180,
              east: 180
          }
        }
      });

      for (let i = 0; i<this.pins.length; i++) {
        if (this.pins[i].userId === Number(sessionStorage.getItem("currentUserId"))) {
        let marker = new google.maps.Marker({
          position: { lat: Number(this.pins[i].lat), lng: Number(this.pins[i].lng) },
          map,
          icon: "https://img.icons8.com/tiny-color/32/null/map-pin.png",
        })
          marker.addListener("click", () => {
          this.pin.id=this.pins[i].id;
          this.pin.name=this.pins[i].name;
          this.pin.departDate=this.pins[i].departDate;
          this.pin.log=this.pins[i].log;
          this.pin.title=this.pins[i].title;
          this.pin.lat=this.pins[i].lat;
          this.pin.lng=this.pins[i].lng;
          this.pin.imageUrl1=this.pins[i].imageUrl1;
          this.pin.imageUrl2=this.pins[i].imageUrl2;
          this.pin.imageUrl3=this.pins[i].imageUrl3;
          this.openViewModal();
          })  
        }
      }
    })
  }


  constructor(private pinDataService: PindataService, public activeModalService: NgbActiveModal, public modalService: NgbModal){}

  ngOnInit(): void {
    this.pinDataService.getPinById(this.pin.id).subscribe({
      next: (data) => {
        this.pin = data;
      }, 
    })
  }

  onSubmit(){
    this.pinDataService.savePin(this.pin).subscribe({
      next: (data) => {
        alert("Pin saved!");
        this.activeModalService.dismiss();
        this.renderPins();
      },
      error: (error) => {
        alert("There was a problem saving this pin.");
      }
    }) 
  }
}