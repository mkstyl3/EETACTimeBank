import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FileService } from '../../service/file.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
  providers: [FileService]
})
export class ImageuploadComponent implements OnInit {
  imageId: string;
  spinner: string;
  addImage: string;
  activityImageSrc: string;
  @ViewChild('fileImage') fileImage: ElementRef;
  loaded: boolean;


  constructor(private fileService: FileService) {
    this.spinner = environment.urlBackend + '/files/spinner.gif';
    this.addImage = environment.urlBackend + '/files/addfile.png';
    this.activityImageSrc = this.addImage;
   }

  ngOnInit() {
  }

  reset() {
    this.imageId = null;
    this.activityImageSrc = this.addImage;
    this.loaded = false;
  }

  openFileDialog() {
    if (!this.loaded) {
      this.fileImage.nativeElement.click();
    }
  }


  uploadFile(files: FileList) {
    console.log(files[0]);
    if (files) {
      this.fileService.fileUpdate(files[0]).subscribe(event => {
        switch (event.type) {
          case HttpEventType.Sent:
          console.log('envia');
            this.activityImageSrc = this.spinner;
          break;
          case HttpEventType.UploadProgress:
            console.log('carregant');
            break;
          case HttpEventType.Response:
            this.activityImageSrc = environment.urlBackend + '/files/' + event.body['dir'];
            this.imageId = this.activityImageSrc;
            this.loaded = true;
            break;
        }
      }, error => {
        this.activityImageSrc = this.addImage;
        this.imageId = null;
      }
      );
    }
  }

}
