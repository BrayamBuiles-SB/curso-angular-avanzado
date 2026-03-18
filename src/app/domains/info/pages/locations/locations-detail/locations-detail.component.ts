import {
  afterNextRender,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { LocationServiceService } from '@shared/services/location-service.service';

@Component({
  selector: 'app-locations-detail',
  imports: [],
  templateUrl: './locations-detail.component.html',
  styleUrl: './locations-detail.component.css',
})
export default class LocationsDetailComponent {
  locationService = inject(LocationServiceService);
  origin = signal('');

  constructor() {
    afterNextRender(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.origin.set(origin);
      });
    });
  }

  location = resource({
    request: () => this.origin(),
    loader: async ({ request }) =>
      this.locationService.getAllLocations(request),
  });
}
