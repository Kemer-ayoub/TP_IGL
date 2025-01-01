import { Component,HostListener, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,RouterModule} from '@angular/router';




@Component({
  selector: 'app-new-user',
  imports: [FormsModule,CommonModule,RouterOutlet,RouterLink,RouterModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
   ngOnInit(): void {
      // Initialisation lors du chargement du composant
      this.updateHeight();
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
      // Mettre à jour la hauteur lors du redimensionnement
      this.updateHeight();
    }
  
    private updateHeight(): void {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  user = {
    username: '',
    password: '',
    role: ''
  };
  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;

    // Vérifiez si tous les champs sont remplis avant de continuer
    if (this.user.username && this.user.password && this.user.role) {
      console.log('Form submitted:', this.user);
      alert('Form submitted successfully!');
      // Réinitialisez le formulaire si nécessaire
      this.isSubmitted = false; // Réinitialiser pour masquer les erreurs après soumission
      this.user = { username: '', password: '', role: '' };
    } else {
      console.log('Form is incomplete.');
    }
  }
}
