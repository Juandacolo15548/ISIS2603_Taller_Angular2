import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {
  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cityName: string = '';
  selectedCountryId: number | null = null;
  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(c => this.countries = c);
  }

  isValid(): boolean {
    return this.cityName.trim().length > 0 && this.selectedCountryId !== null;
  }

  save(): void {
    if (!this.isValid()) return;
    this.cityService.createCity(this.selectedCountryId!, { name: this.cityName })
      .subscribe(() => this.cityCreated.emit());
  }
}