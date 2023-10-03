import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  relavantPlaces: Place[] = [];
  listedLoadedPlaces: Place[] = [];
  private sub!: Subscription;
  isLoading!: boolean;
  constructor(
    private placeService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.placeService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.relavantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
      console.log(this.listedLoadedPlaces);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placeService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }
  openMenu() {
    this.menuCtrl.toggle();
  }
  onTabChange(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.relavantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
      console.log(this.listedLoadedPlaces);
    } else {
      this.relavantPlaces = this.loadedPlaces.filter(
        (place) => place.userId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
      console.log(this.listedLoadedPlaces);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
