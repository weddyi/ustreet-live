export type Category = 'Music' | 'Nightlife' | 'DC Culture' | 'Spicy' | 'Brand'

export interface Question {
  id: string
  text: string
  category: Category
}

export const QUESTIONS: Question[] = [
  // Music
  { id: 'm1', text: 'What song is your anthem right now?', category: 'Music' },
  { id: 'm2', text: "Who's the most underrated artist out of DC?", category: 'Music' },
  { id: 'm3', text: "What's on your playlist tonight?", category: 'Music' },
  { id: 'm4', text: 'If your life was a song, what would it be?', category: 'Music' },
  { id: 'm5', text: 'What song gets the whole room hyped?', category: 'Music' },

  // Nightlife
  { id: 'n1', text: "What's your go-to Friday night spot in DC?", category: 'Nightlife' },
  { id: 'n2', text: 'Best kept secret on U Street?', category: 'Nightlife' },
  { id: 'n3', text: 'Describe your perfect night out in one word', category: 'Nightlife' },
  { id: 'n4', text: 'What makes Chi-Cha different from everywhere else?', category: 'Nightlife' },
  { id: 'n5', text: 'What time does your night really start?', category: 'Nightlife' },

  // DC Culture
  { id: 'd1', text: "What's the most DC thing about you?", category: 'DC Culture' },
  { id: 'd2', text: 'What do you love most about U Street?', category: 'DC Culture' },
  { id: 'd3', text: "How long have you been in DC and what keeps you here?", category: 'DC Culture' },
  { id: 'd4', text: 'What does DC need more of?', category: 'DC Culture' },
  { id: 'd5', text: 'Best neighborhood in DC, go!', category: 'DC Culture' },

  // Spicy
  { id: 's1', text: "What's your hot take about DC nightlife?", category: 'Spicy' },
  { id: 's2', text: 'Be honest — best dressed or worst dressed city?', category: 'Spicy' },
  { id: 's3', text: "What's something you'd only admit after midnight?", category: 'Spicy' },
  { id: 's4', text: 'Rate your confidence tonight 1-10 and explain', category: 'Spicy' },
  { id: 's5', text: "What's your move when you see someone you used to talk to?", category: 'Spicy' },

  // Brand
  { id: 'b1', text: 'If you could start any business tomorrow, what would it be?', category: 'Brand' },
  { id: 'b2', text: "What's your biggest money move this year?", category: 'Brand' },
  { id: 'b3', text: "Have you been to Chi-Cha Lounge? What's your vibe?", category: 'Brand' },
  { id: 'b4', text: 'What app are you opening first thing in the morning?', category: 'Brand' },
  { id: 'b5', text: "What's your side hustle and why isn't it your main hustle yet?", category: 'Brand' },
]

export const CATEGORIES: { id: Category; icon: string }[] = [
  { id: 'Music', icon: '🎵' },
  { id: 'Nightlife', icon: '🍷' },
  { id: 'DC Culture', icon: '🌆' },
  { id: 'Spicy', icon: '🔥' },
  { id: 'Brand', icon: '🏷️' },
]

export function getByCategory(cat: Category): Question[] {
  return QUESTIONS.filter(q => q.category === cat)
}

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}
