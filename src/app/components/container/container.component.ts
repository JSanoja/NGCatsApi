import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  constructor(private httpRequest: HttpClient) {}
  catalog: any;
  currentLimit: string = "10";
  currentPage: number = 0;
  ngOnInit() {
    this.getCats(this.currentLimit, this.currentPage);
  }
  goToNext() {
    this.currentPage = this.currentPage + 1;
    this.getCats(this.currentLimit, this.currentPage);
  }
  goToPrevious() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.getCats(this.currentLimit, this.currentPage);
    }
  }
  getCats(limit, page) {
    this.httpRequest
      .get(
        "https://api.thecatapi.com/v1/breeds?limit=" + limit + "&page=" + page
      )
      .subscribe((data) => {
        console.log(data);
        this.catalog = data;
      });
  }
  limitChange(e) {
    this.currentLimit = e.target.value;
    this.currentPage = 0;
    this.getCats(this.currentLimit, this.currentPage);
  }
}
