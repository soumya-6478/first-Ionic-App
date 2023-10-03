import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: any;
  private sub!: Subscription;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/offers');
        return;
      }
      this.sub = this.placeService
        .getPlace(paramMap.get('placeId')!)
        .subscribe((place) => {
          this.place = place;
        });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
