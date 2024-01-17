import { Component, OnInit } from '@angular/core';
import { MovieSearchServiceService } from '../../services/movie-search-service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, PaginationComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchMoviesForm: FormGroup;
  page: number = 1;
  query: string = '';
  movies: any[] = [];
  totalPages?: number;
  totalResults?: number;

  constructor(
    private movieSearchService: MovieSearchServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.searchMoviesForm = this.formBuilder.group({
      movieQuery: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.page = Number(params['page'] || 1);
      if (this.query) {
        this.getMovies();
      }
    });
  }

  onSearch() {
    this.query = this.searchMoviesForm.value.movieQuery;
    this.page = 1;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { page: this.page, query: this.query },
    });
  }

  onPageChanged(page: number) {
    this.page = page;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { page: this.page, query: this.query },
    });
  }

  getMovies() {
    this.movieSearchService
      .getMovies(this.query, this.page)
      .subscribe((data) => {
        console.log(data);
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.totalResults = data.total_results;
      });
  }
}
