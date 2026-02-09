export interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'design' | 'saas' | 'ecommerce' | 'portfolio' | 'nothing' | 'other';
  image: string;
  tags: string[];
}

export const sites: Site[] = [
  {
    id: '1',
    name: 'Nothing',
    description: 'Expérience du vide intersidéral.',
    url: 'https://nothing.oalacea.fr/',
    category: 'nothing',
    image: '/images/void-protocol.jpg',
    tags: ['neon', 'vide']
  }
];
