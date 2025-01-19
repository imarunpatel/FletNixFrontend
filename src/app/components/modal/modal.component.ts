import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IMedia } from 'src/app/models/media.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Input() data: IMedia | null = null;
  @Output() close = new EventEmitter<void>();
  modifiedData: string[][] = [];


  ngOnChanges(): void {
    if(this.data) {
      for(let [key, value] of Object.entries(this.data)) {
        this.modifiedData.push([key, value])
      }
    }
  }

  onClose() {
    this.close.emit();
  }
}
