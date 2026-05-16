export interface Property {
  id: number;
  type: 'house' | 'apartment';
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  garage: number;
  area: number;
  image: string;
  featured?: boolean;
}

export const properties: Property[] = [
  {
    id: 1,
    type: 'house',
    name: 'Mansão Ocean Vista',
    location: 'Ipioca, Maceió',
    price: 4500000,
    beds: 5,
    baths: 6,
    garage: 4,
    area: 600,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 2,
    type: 'apartment',
    name: 'Edifício Sky Blue',
    location: 'Ponta Verde, Maceió',
    price: 1200000,
    beds: 3,
    baths: 2,
    garage: 2,
    area: 140,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 3,
    type: 'house',
    name: 'Casa das Palmeiras',
    location: 'Pajuçara, Maceió',
    price: 2800000,
    beds: 4,
    baths: 4,
    garage: 3,
    area: 320,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 4,
    type: 'apartment',
    name: 'Reserve Garden',
    location: 'Jatiúca, Maceió',
    price: 850000,
    beds: 2,
    baths: 2,
    garage: 1,
    area: 95,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: 5,
    type: 'house',
    name: 'Villa Serrana',
    location: 'Guaxuma, Maceió',
    price: 3200000,
    beds: 4,
    baths: 5,
    garage: 4,
    area: 450,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    type: 'house',
    name: 'Residencial Green Park',
    location: 'Serraria, Maceió',
    price: 950000,
    beds: 3,
    baths: 3,
    garage: 2,
    area: 200,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
  }
];

// Generate more data for variety as requested (8 houses, 4 apartments total)
const moreHouses: Property[] = [
  ...properties.filter(p => p.type === 'house'),
  { id: 7, type: 'house' as const, name: 'Refúgio do Sol', location: 'Riacho Doce, Maceió', price: 1500000, beds: 3, baths: 3, garage: 2, area: 240, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800' },
  { id: 8, type: 'house' as const, name: 'Casa Bela Vista', location: 'Cruz das Almas, Maceió', price: 2100000, beds: 4, baths: 4, garage: 3, area: 300, image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=800' },
  { id: 9, type: 'house' as const, name: 'Villa Contemporânea', location: 'Antares, Maceió', price: 1200000, beds: 3, baths: 3, garage: 2, area: 210, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800' },
  { id: 10, type: 'house' as const, name: 'Fazenda Urbana', location: 'Tabuleiro, Maceió', price: 800000, beds: 3, baths: 2, garage: 2, area: 180, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800' }
].slice(0, 8);

const moreApartments: Property[] = [
  ...properties.filter(p => p.type === 'apartment'),
  { id: 11, type: 'apartment' as const, name: 'Páteo Maceió', location: 'Mangabeiras, Maceió', price: 650000, beds: 2, baths: 2, garage: 1, area: 80, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800' },
  { id: 12, type: 'apartment' as const, name: 'Vento Sul Suítes', location: 'Stella Maris, Maceió', price: 1100000, beds: 3, baths: 2, garage: 2, area: 110, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' }
].slice(0, 4);

export const allProperties = [...moreHouses, ...moreApartments];

export const testimonials = [
  {
    id: 1,
    name: 'Ricardo Silva',
    role: 'Empresário',
    text: 'A experiência de comprar minha casa de praia em Maceió foi incrível. Todo o suporte da equipe foi impecável.',
    image: 'https://i.pravatar.cc/150?u=ricardo'
  },
  {
    id: 2,
    name: 'Mariana Costa',
    role: 'Arquiteta',
    text: 'Como arquiteta, sou exigente com detalhes. A imobiliária me surpreendeu com a curadoria de imóveis de alto padrão.',
    image: 'https://i.pravatar.cc/150?u=mariana'
  },
  {
    id: 3,
    name: 'José Oliveira',
    role: 'Investidor',
    text: 'Melhor imobiliária para investidores no Alagoas. Transparência e ótimas oportunidades.',
    image: 'https://i.pravatar.cc/150?u=jose'
  }
];
