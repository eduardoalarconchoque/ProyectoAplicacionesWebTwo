import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: false,
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrls: ['./acerca-de-nosotros.component.scss']
})
export class AcercaDeNosotrosComponent implements  OnInit{
  
  slides: any[] = [];

  banner = [
    {image: '/icons/banner_02.png',},
    
    {image: '/icons/banner_03.png',},

    {image: '/icons/banner_05.png',},

    {image: '/icons/banner_06.png',},
    
    { image: '/icons/banner_01.png',},
    
    {image: '/icons/banner_02.png',},
    
    {image: '/icons/banner_03.png',},

    {image: '/icons/banner_05.png',}
  ];



  products = [
    {
      name: 'Camisa casual 1',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
      image: '/icons/camisa1.jpg'
    },
    {
      name: 'Camisa casual 2',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
          image:'/icons/camisa2.jpg'
    },
    {
      name: 'Camisa casual 3',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
     image: '/icons/camisa3.jpg'
    },
    {
      name: 'Camisa casual 4',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
        image: '/icons/camisa4.jpg'
    },
    {
      name: 'Camisa casual 5',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
      image: '/icons/camisa5.jpg'
    },
    {
      name: 'Camisa casual 6',
      description: 'Camisa de algodón de alta calidad, ideal para uso diario.',
      price: 59.99,
      stock: 12,
      image: '/icons/camisa7.jpg'
    },
    //-------------------------------------------------------------------------------------//
    {
      name: 'Polo deportivo 1',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
      image: '/icons/polo1.jpeg'
    },
    {
      name: 'Polo deportivo 2',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
      image: '/icons/polo2.jpeg'
    },
    {
      name: 'Polo deportivo 3',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
      image: '/icons/polo3.jpg'
    },
    {
      name: 'Polo deportivo 4',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
    image: '/icons/polo4.jpg'
    },
    {
      name: 'Polo deportivo 5',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
       image: '/icons/polo5.jpg'
    },
    {
      name: 'Polo deportivo 6',
      description: 'Polo ligero y transpirable para actividades deportivas.',
      price: 39.99,
      stock: 8,
      image: '/icons/polo7.jpg'
    },


//----------------------------------------------------------------//

    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
      image: '/icons/p1.jpg'
    },
    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
       image: '/icons/p2.jpg'
    },
    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
       image: '/icons/p3.jpg'
    },
    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
       image: '/icons/p4.jpg'
    },
    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
       image: '/icons/p5.jpg'
    },
    {
      name: 'Pantalón jeans',
      description: 'Jeans clásicos de corte moderno y excelente acabado.',
      price: 79.99,
      stock: 20,
       image: '/icons/p6.jpg'
    },
//---------------------------------------------------------------------------------
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca1.jpeg'
    },
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca2.jpeg'
    },
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca3.jpg'
    },
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca4.jpeg'
    },
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca5.jpeg'
    },
    {
      name: 'Casaca impermeable',
      description: 'Casaca resistente al agua perfecta para días lluviosos.',
      price: 99.99,
      stock: 5,
      image: '/icons/casaca6.jpeg'
    },

    //---------------------------------------------------------------//
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
      image: '/icons/zapa1.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
      image: '/icons/zapa2.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
      image: '/icons/zapa3.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
      image: '/icons/zapa4.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
      image: '/icons/zapa5.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
     image: '/icons/zapa6.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
     image: '/icons/zapa7.jpg'
    },
    {
      name: 'Zapatillas',
      description: 'Frescas y comodas',
      price: 99.99,
      stock: 5,
     image: '/icons/zapa8.jpg'
    }
  ];
  constructor(private router: Router) {}

  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide(); 
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

  nextSlide() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products.length - 1;
    }
  }

  
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide(); 
    }, 3000); 
  }

  redirigirAlRegistro() {
    this.router.navigate(['/registro']);
  }

}
