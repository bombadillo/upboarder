import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  image: SafeResourceUrl;
  syncingToConfluence: boolean;
  syncSuccess: boolean;
  showCreateButton: boolean = true;

  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {}

  async takePicture() {
    this.showCreateButton = false;
    this.syncSuccess = false;

    const { Camera } = Plugins;

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    // Example of using the Base64 return type. It's recommended to use CameraResultType.Uri
    // instead for performance reasons when showing large, or a large amount of images.
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.base64Data
    );

    this.syncingToConfluence = true;

    setTimeout(() => {
      this.syncingToConfluence = false;
      this.syncSuccess = true;
      this.showCreateButton = true;
    }, 2000);
  }
}
