import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMedia } from 'src/app/models/media.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() data: IMedia | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
