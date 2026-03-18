import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Location } from '@shared/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationServiceService {
  private url = new URL(`${environment.apiUrl}/api/v1/locations`);


  async getAllLocations(origin: string): Promise<Location[]> {
    if (!origin) return new Promise(resolve => resolve([]));
    this.url.searchParams.set('origin', origin);
    const data = await fetch(this.url.toString());
    return await data.json();
  }
}
