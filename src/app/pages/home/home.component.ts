import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IMedia } from 'src/app/models/media.model';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;

  // Pagination Variables
  totalMedia: IMedia[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalItems: number = 1;

  // Search Variables
  selectedType: 'Movie' | 'TV Show' | string = '';
  searchQuery: string = '';
  searchControl = new FormControl();

  selectedMedia: IMedia | null = null;
  isModalOpen = false;
  mediaType = ['All', 'Movie', 'TV Show']


  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    
    this.getMedia(this.currentPage, this.selectedType, this.searchQuery);
    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe((query) => {
        this.searchQuery = query;
        this.currentPage = 1;
        this.getMedia(this.currentPage, this.selectedType, query)
      })
  }

  getMedia(page: number, type: string, query: string) {
    this.loading = true;
    this.mediaService.getMedia(page, type, query).subscribe({
      next: (res) => {
        if(res.success) {
          this.totalMedia = res.data.media;
          this.currentPage = res.data.currentPage;
          this.itemsPerPage = res.data.itemsPerPage;
          this.totalItems = res.data.totalItems
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }

  onTypeChange(option: string) {
    this.selectedType =  option === 'All' ? '' : option;
    this.currentPage = 1;
    this.getMedia(this.currentPage, this.selectedType, this.searchQuery)
  }

  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getMedia(page, this.selectedType, this.searchQuery)
  }
  
  openModal(value: IMedia) {
    this.selectedMedia = value
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  
}
