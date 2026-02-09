export interface Artifact {
  id: string;
  name: string;
  url: string;
  lore: string;
  slot: 'utile' | 'nawak' | 'inutile';
  itemType: 'weapon' | 'armor' | 'accessory' | 'relic';
  rarity: 'legendary' | 'epic' | 'rare';
  durability: number;
  genre: 'metal' | 'rock' | 'blues' | 'classical';
}

export const artifacts: Artifact[] = [
  {
    id: '1',
    name: 'The Useless Web',
    url: 'https://theuselessweb.com',
    lore: 'A powerful curse that transports the bearer to random useless domains. Grants -100 Productivity. This curse cannot be removed once equipped.',
    slot: 'inutile',
    itemType: 'weapon',
    rarity: 'legendary',
    durability: 2012,
    genre: 'metal',
  },
  {
    id: '2',
    name: 'Neal.fun',
    url: 'https://neal.fun',
    lore: 'An enchanted collection of pointless wonders. Each use may cause uncontrollable joy. Forbidden in serious workplaces across the realm.',
    slot: 'nawak',
    itemType: 'armor',
    rarity: 'epic',
    durability: 2023,
    genre: 'rock',
  },
  {
    id: '3',
    name: 'Awwwards',
    url: 'https://www.awwwards.com',
    lore: 'The sacred hall of design excellence. Where legendary artisans showcase their masterworks. Prolonged exposure may cause feelings of inadequacy.',
    slot: 'utile',
    itemType: 'relic',
    rarity: 'legendary',
    durability: 2023,
    genre: 'classical',
  },
  {
    id: '4',
    name: 'CSS Tricks',
    url: 'https://css-tricks.com',
    lore: 'An ancient grimoire containing forbidden knowledge of the cascade. Studying its pages grants +50 CSS Mastery, but -10 SAN.',
    slot: 'utile',
    itemType: 'accessory',
    rarity: 'rare',
    durability: 2022,
    genre: 'blues',
  },
  {
    id: '5',
    name: 'Stripe',
    url: 'https://stripe.com',
    lore: 'A legendary forging hammer used by merchants across the realm. Its documentation is said to be blessed by the gods themselves.',
    slot: 'utile',
    itemType: 'weapon',
    rarity: 'legendary',
    durability: 2023,
    genre: 'metal',
  },
  {
    id: '6',
    name: 'Bureau of Digital',
    url: 'https://bureauofdigital.com',
    lore: 'A gathering place for guild masters. Old wisdom is shared here, far from the noise of public squares. Like LinkedIn, but actually useful.',
    slot: 'nawak',
    itemType: 'accessory',
    rarity: 'rare',
    durability: 2024,
    genre: 'blues',
  },
  {
    id: '7',
    name: 'Product Hunt',
    url: 'https://www.producthunt.com',
    lore: 'A daily bazaar where artisans showcase their creations. Discover your next legendary artifact, or realize everything has already been forged.',
    slot: 'utile',
    itemType: 'armor',
    rarity: 'epic',
    durability: 2023,
    genre: 'rock',
  },
  {
    id: '8',
    name: 'Hype Machine',
    url: 'https://hypem.com',
    lore: 'A mystical orb that channels the musical collective consciousness. Digital crate digging for the modern age. Hipper than Spotify.',
    slot: 'inutile',
    itemType: 'accessory',
    rarity: 'rare',
    durability: 2022,
    genre: 'blues',
  },
  {
    id: '9',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    lore: 'A realm where designers project their fantasies into the ether. Most artifacts shown here shall never be forged in reality. The Pinterest of dreams.',
    slot: 'nawak',
    itemType: 'relic',
    rarity: 'epic',
    durability: 2023,
    genre: 'classical',
  },
  {
    id: '10',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    lore: 'An ancient forum where wisdom is debated by those smarter than you. The Reddit for those who built Reddit. Approach with humility.',
    slot: 'utile',
    itemType: 'weapon',
    rarity: 'legendary',
    durability: 2024,
    genre: 'metal',
  },
];

export const genreNodes = [
  { id: 'all', name: 'TOUT', symbol: '[+]' },
  { id: 'metal', name: 'METAL', symbol: '[X]' },
  { id: 'rock', name: 'ROCK', symbol: '[O]' },
  { id: 'blues', name: 'BLUES', symbol: '[~]' },
  { id: 'classical', name: 'CLASSIQUE', symbol: '[*]' },
] as const;

export const slotFilters = [
  { id: 'all', name: 'TOUS' },
  { id: 'utile', name: 'UTILE' },
  { id: 'nawak', name: 'NAWAK' },
  { id: 'inutile', name: 'INUTILE' },
] as const;

export const rarityOrder = ['legendary', 'epic', 'rare'] as const;

export const itemTypeLabels = {
  weapon: 'ARME',
  armor: 'ARMURE',
  accessory: 'ACCESSOIRE',
  relic: 'RELIQUE',
} as const;
