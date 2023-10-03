import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[] = [];
  private sub!: Subscription;
  isLoading!: boolean;

  constructor(private placeService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.sub = this.placeService.places.subscribe((places) => {
      this.offers = places;
      console.log(this.offers);
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.placeService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }
  onEdit(placeId: any, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit', placeId]);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
