import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceLocation } from '../../location.model';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private placeService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(180)]],
      price: [null, [Validators.required, Validators.min(1)]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      location: [null, [Validators.required]],
    });
  }

  ngOnInit() {}
  onCreateOffer() {
    this.loadingCtrl
      .create({
        message: 'Creating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeService
          .addPlace(
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.fromDate),
            new Date(this.form.value.toDate),
            this.form.value.location
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['places/offers']);
          });
      });
  }
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }
}
