import { Home, LayoutGrid, Building2, Palmtree, Castle, Rocket, Waves } from 'lucide-react';
import React from 'react';

export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  price: number;
  bedrooms: number;
  area: number;
  image: string;
  isFeatured?: boolean;
}

export const propertyTypes = [
  { value: 'Casas', label: 'Casas', icon: Home },
  { value: 'Apartamentos', label: 'Apartamentos', icon: Building2 },
  { value: 'Coberturas', label: 'Coberturas', icon: Castle },
  { value: 'Casas em condomínio', label: 'Condomínios', icon: LayoutGrid },
  { value: 'Casas de praia', label: 'Praia', icon: Waves },
  { value: 'Duplex', label: 'Duplex', icon: LayoutGrid },
  { value: 'Chácaras', label: 'Chácaras', icon: Palmtree },
  { value: 'Mansões', label: 'Mansões', icon: Castle },
  { value: 'Lançamentos', label: 'Lançamentos', icon: Rocket },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Edifício Azure',
    type: 'Apartamentos',
    location: 'Ponta Verde, Maceió',
    lat: -9.6644,
    lng: -35.7011,
    price: 3500000,
    bedrooms: 4,
    area: 250,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Casa das Marés',
    type: 'Casas de praia',
    location: 'Barra de São Miguel',
    lat: -9.8458,
    lng: -35.8894,
    price: 8500000,
    bedrooms: 6,
    area: 480,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Condomínio Reserva Alagoas',
    type: 'Casas em condomínio',
    location: 'Marechal Deodoro',
    lat: -9.7111,
    lng: -35.8944,
    price: 2200000,
    bedrooms: 4,
    area: 320,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Paramount Palace',
    type: 'Coberturas',
    location: 'Pajuçara, Maceió',
    lat: -9.6708,
    lng: -35.7203,
    price: 6800000,
    bedrooms: 5,
    area: 410,
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Vila Coral',
    type: 'Casas de praia',
    location: 'Paripueira',
    lat: -9.4772,
    lng: -35.5531,
    price: 1800000,
    bedrooms: 3,
    area: 210,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'Skyline Residence',
    type: 'Lançamentos',
    location: 'Jatiúca, Maceió',
    lat: -9.6547,
    lng: -35.7003,
    price: 1200000,
    bedrooms: 2,
    area: 110,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
  },
];
