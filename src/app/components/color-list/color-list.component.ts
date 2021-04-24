import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];
  color: Color;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  deleteColor(color: Color) {
    this.colorService.delete(color).subscribe((response) => {
      this.color = response.data;
      this.toastrService.success(response.message);
      this.getColors();
    });
  }

  updateColor(color: Color) {
    this.colorService.update(color).subscribe();
    this.toastrService.success('Markalar Başarılı Güncellendi');
  }

}

