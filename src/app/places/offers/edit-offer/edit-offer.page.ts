import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form!: FormGroup;
  placeId!: string;
  place: any;
  private sub!: Subscription;
  isLoading!: boolean;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placeService: PlacesService,
    private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/offers');
        return;
      }
      this.placeId = paramMap.get('placeId')!;
      this.isLoading = true;
      this.sub = this.placeService.getPlace(this.placeId).subscribe(
        (place) => {
          this.place = place;
          this.buildform();

          this.isLoading = false;
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'An error occurred!',
              message: 'Place could not be fetched. Please try again later.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/places/offers']);
                  },
                },
              ],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      );
    });
  }
  goBack() {
    this.navCtrl.navigateBack(['places/offers', this.place.id]);
  }
  buildform() {
    this.form = this.fb.group({
      title: [this.place?.title, [Validators.required]],
      description: [
        this.place?.description,
        [Validators.required, Validators.maxLength(180)],
      ],
    });
  }
  onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['places/offers']);
          });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
