import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/services/all.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  email: any = '';
  signatures: any[] = [];
  signatureSelecteds: any[] = [];

  constructor(private service: AllService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.getSignatures();
  }

  getSignatures() {
    this.service.getSignatures(this.email).subscribe((data: any) => {
      this.signatures = data;
      for (const s of this.signatures) {
        if (s.selected) {
          this.signatureSelecteds.push(s);
        }
      }
    }, err => {
      return Swal.fire('', err.message, 'error');
    });
  }

  selectSignature(signature: any) {
    if (!signature.selected) {
      let pos = this.signatures.indexOf(signature);
      this.signatures[pos].selected = true;
      this.signatureSelecteds.push(signature);
    } else {
      let pos = this.signatures.indexOf(signature);
      this.signatures[pos].selected = false;
      let pos2 = this.signatureSelecteds.indexOf(signature);
      this.signatureSelecteds.splice(pos2, 1);
    }
  }

  saveSing() {
    let signatrues = [];
    for (const s of this.signatureSelecteds) {
      signatrues.push(s.id);
    }
    let body = {
      email: this.email,
      signature: signatrues
    };
    this.service.saveSing(body).subscribe((data: any) => {
      return Swal.fire('', data.message, 'success');
    }, err => {
      return Swal.fire('', err.message, 'error');
    });
  }

  close() {
    this.router.navigate(['']);
    localStorage.removeItem('email');
  }

}
