import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { IMedia } from 'src/app/models/media.model';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
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
  private searchSubscription: Subscription = new Subscription();

  selectedMedia: IMedia | null = null;
  isModalOpen = false;
  mediaType = ['All', 'Movie', 'TV Show']


  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getMedia();

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe((query) => {
        this.searchQuery = query;
        this.currentPage = 1;
        this.getMedia()
      })
  }

  ngOnDestroy(): void {
      this.searchSubscription.unsubscribe();
  }

  getMedia() {
    this.loading = true;
    this.mediaService.getMedia(this.currentPage, this.selectedType, this.searchQuery).subscribe({
      next: (res) => {
        if(res.success) {
          this.totalMedia = res.data.media;
          this.currentPage = res.data.currentPage;
          this.itemsPerPage = res.data.itemsPerPage;
          this.totalItems = res.data.totalItems
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  onTypeChange(option: string) {
    this.selectedType =  option === 'All' ? '' : option;
    this.currentPage = 1;
    this.getMedia()
  }

  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getMedia()
  }
  
  openModal(value: IMedia) {
    this.selectedMedia = value
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  
}
