import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pin } from '../pin';
import { PindataService } from '../pindata.service';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent {

  @Input() data: any;
  @Input() pin: any;
  @Input() pins: any;
  @Input() id: any;
  @Input() sessionStorage: any;
  currentUserId = Number(sessionStorage.getItem('currentUserId'));
  
  constructor(public activeModalService: NgbActiveModal, private pinDataService: PindataService){}

  sortFn = (a: Pin, b: Pin): number => {
    if (a.departDate < b.departDate) {
      return 1;
    } else if (a.departDate === b.departDate) {
      return 0;
    } else (a.departDate > b.departDate); {
      return -1;
    }
  }

  ngOnInit(): void {
    this.pinDataService.getAllPins().subscribe(data=>{
      this.pins=data;
    })
    const userDetails = JSON.parse(JSON.stringify(this.data));
    sessionStorage.setItem("currentUserId", userDetails.id);
  }


}