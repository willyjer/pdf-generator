export interface Reading {
  id: string;
  title: string;
  headline: string;
  subheadline: string;
  icon: string;
  details: string;
  price: number;
}

export const readings: Reading[] = [
  {
    id: 'vocation',
    title: '🧭 Life Direction & Vocation Blueprint',
    headline: 'Your Soul’s Work in the World',
    subheadline: 'Your chart’s deeper guidance on purpose, career, and calling.',
    icon: '🧭',
    details: [
      'Reveals core purpose through MC, North Node & Saturn',
      'Uncovers natural talents and callings from Sun & Rising',
      'Highlights ideal roles, work rhythms, and life structure',
      'Personalized PDF (1200 words) + your printed chart'
    ].join('\n'),
    price: 5,
  },
  {
    id: 'manifestation',
    title: '🔮 Manifestation Potential & Blocks',
    headline: 'Unlock Your Manifestation Power',
    subheadline: 'How you attract abundance—and what secretly blocks it.',
    icon: '🔮',
    details: [
      'Pinpoints your 3 core manifesting strengths',
      'Reveals karmic blocks, doubts, or emotional patterns',
      'Includes practical tools to unlock aligned action',
      'Personalized PDF (1200 words) + your printed chart'
    ].join('\n'),
    price: 5,
  },
  {
    id: 'coreWound',
    title: '🩹 Core Wounds & Healing Path',
    headline: 'Understand Your Deepest Pain',
    subheadline: 'And how when healing unfolds your real power emerges.',
    icon: '🩹',
    details: [
      'Chiron shows lifelong wounds and their sacred meaning',
      'Saturn, Moon & 12th house show patterns that repeat',
      'Nodes and outer planets trace karmic imprints',
      'Personalized PDF (1200 words) + your printed chart'
    ].join('\n'),
    price: 5,
  },
];

export const backDetailsMap: Record<string, string[]> = {
  vocation: [
    'Midheaven and its ruler for outer path and career style',
    'North Node for soul direction and evolution themes',
    'Saturn reveals your life mastery and long-term growth',
    'Sun and 2nd/6th house for strengths and values',
    'Personalized guidance on aligning your life direction',
  ],
  manifestation: [
    'Jupiter & Venus reveal your natural abundance flow',
    'Moon, Neptune, & Pluto uncover hidden blocks',
    'North Node & Chiron for aligned/misaligned desires',
    'Saturn & 2nd/8th house show karmic scarcity patterns',
    'Guidance for manifesting through your personal chart',
  ],
  coreWound: [
    'Chiron sign + house describe your core pain',
    'Behavioral patterns: Saturn, Moon & 12 house',
    'Ancestral imprints via outer-planets & Nodes',
    'Healing: from your Sun, Moon, Jupiter, and North Node',
    'Who you become through healing aspects',
  ],
  
}; 