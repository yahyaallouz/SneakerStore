import nikeImg from '../assets/images/nike.png';
import adidasImg from '../assets/images/adidas.png';
import pumaImg from '../assets/images/puma.png';
import nikeAf1 from '../assets/images/nike_af1.png';
import pumaPanda from '../assets/images/puma_panda.png';
import pumaCali from '../assets/images/puma_cali.png';
import adidasStanSmith from '../assets/images/adidas_stan_smith.png';
import nikeAirMax270 from '../assets/images/nike_air_max_270.png';

export const PRODUCTS = [
    // --- MEN'S ---
    {
        id: 1,
        name: 'Air Force 1',
        brand: 'Nike',
        price: 110,
        category: 'men',
        image: nikeAf1,
        description: 'A classic white leather sneaker with a clean design. Timeless style.',
        sizes: [40, 41, 42, 43, 44, 45]
    },
    {
        id: 2,
        name: 'RS-X',
        brand: 'Puma',
        price: 120,
        category: 'men',
        image: pumaImg, // Placeholder
        description: 'A modern, chunky sneaker with a bold black, white, and red colorway.',
        sizes: [41, 42, 43, 44, 45]
    },
    {
        id: 3,
        name: 'Stan Smith',
        brand: 'Adidas',
        price: 100,
        category: 'men',
        image: adidasStanSmith,
        description: 'A timeless tennis shoe in white leather with green accents.',
        sizes: [40, 41, 42, 43, 44]
    },

    // --- WOMEN'S ---
    {
        id: 4,
        name: 'Air Max 270',
        brand: 'Nike',
        price: 150,
        category: 'women',
        image: nikeAirMax270,
        description: 'A popular lifestyle shoe in a feminine pastel pink color.',
        sizes: [36, 37, 38, 39, 40]
    },
    {
        id: 5,
        name: 'Cali',
        brand: 'Puma',
        price: 90,
        category: 'women',
        image: pumaCali,
        description: 'A trendy platform sneaker in white leather with elegant gold details.',
        sizes: [36, 37, 38, 39, 40]
    },
    {
        id: 6,
        name: 'Ultraboost',
        brand: 'Adidas',
        price: 180,
        category: 'women',
        image: adidasImg, // Placeholder
        description: 'A performance running shoe in a stylish light blue and white knit material.',
        sizes: [36, 37, 38, 39, 40]
    },

    // --- KIDS' ---
    {
        id: 7,
        name: 'Revolution 5',
        brand: 'Nike',
        price: 55,
        category: 'kids',
        image: nikeImg, // Placeholder
        description: 'A colorful and practical shoe for kids with easy-to-use Velcro straps.',
        sizes: [36, 37, 38, 39]
    },
    {
        id: 8,
        name: 'Smash v2',
        brand: 'Puma',
        price: 45,
        category: 'kids',
        image: pumaPanda,
        description: 'A fun black sneaker featuring an adorable panda graphic on the side.',
        sizes: [36, 37, 38]
    },
    {
        id: 9,
        name: 'Superstar Kids',
        brand: 'Adidas',
        price: 50,
        category: 'kids',
        image: adidasImg, // Placeholder
        description: 'A classic kids\' shoe with the iconic shell toe and iridescent three stripes.',
        sizes: [36, 37]
    },
];
