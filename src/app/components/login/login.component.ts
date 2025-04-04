import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/services/all.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: any = 'login';
  programs: any = [];

  constructor(private service: AllService, private router: Router) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  changeState(state: string) {
    this.state = state;
  }

  getPrograms() {
    this.service.getPrograms().subscribe((data: any) => {
      this.programs = data;
    }, err => {
      return Swal.fire('', err.message, 'error');
    });
  }

  login() {
    const email = (document.getElementById('email') as HTMLInputElement ).value;
    this.service.login({email}).subscribe((data: any) => {
      localStorage.setItem('email', email);
      this.router.navigate(['panel']);
    }, err => {
      return Swal.fire('', err.message, 'error');
    });
  }

  singUp() {
    let body = {
      name: (document.getElementById('name') as HTMLInputElement ).value,
      email: (document.getElementById('email') as HTMLInputElement ).value,
      program: (document.getElementById('program') as HTMLInputElement ).value,
    };
    this.service.singup(body).subscribe((data: any) => {
      this.router.navigate(['panel']);
    }, err => {
      return Swal.fire('', err.message, 'error');
    });
  }

}
