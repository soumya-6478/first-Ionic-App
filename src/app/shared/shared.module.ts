import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [LocationPickerComponent, MapModalComponent],
  exports: [LocationPickerComponent, MapModalComponent],
  //   entryComponents: [MapModalComponent]
})
export class SharedModule {}
