import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages!: number;
  @Input() totalResults!: number;
  @Input() itemsPerPage: number = 20;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  fromItem: number = 1;
  toItem: number = 20;

  initialPages: number[] = [];
  finalPages: number[] = [];

  showSpace: boolean = false;

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(page);
      this.updateItems();
      this.updatePagesShow();
    }
  }

  ngOnInit() {
    this.updateItems();
    this.updatePagesShow();
  }

  updateItems() {
    this.fromItem = 1 + (this.currentPage - 1) * this.itemsPerPage;
    this.toItem = Math.min(
      this.fromItem + this.itemsPerPage,
      this.totalResults,
    );
  }

  updatePagesShow() {
    if (this.totalPages > 6) {
      this.showSpace = true;
    }

    if (this.currentPage <= 3 || this.currentPage >= this.totalPages - 2) {
      this.initialPages = [1, 2, 3];
      this.finalPages = [
        this.totalPages - 2,
        this.totalPages - 1,
        this.totalPages,
      ];
      return;
    }

    this.initialPages = [
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
    ];
    this.finalPages = [
      this.totalPages - 2,
      this.totalPages - 1,
      this.totalPages,
    ];
  }
}
