export interface Post {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const boards: Board[] = [
  { id: 'a', name: '/a/', description: 'Аниме и Манга', category: 'Японская Культура' },
  { id: 'c', name: '/c/', description: 'Аниме/Милое', category: 'Японская Культура' },
  { id: 'w', name: '/w/', description: 'Обои Аниме', category: 'Японская Культура' },
  { id: 'm', name: '/m/', description: 'Меха', category: 'Японская Культура' },
  { id: 'cgl', name: '/cgl/', description: 'Косплей и EGL', category: 'Японская Культура' },
  { id: 'cm', name: '/cm/', description: 'Милые Парни', category: 'Японская Культура' },
  { id: 'co', name: '/co/', description: 'Комиксы и Мультфильмы', category: 'Интересы' },
  { id: 'v', name: '/v/', description: 'Видеоигры', category: 'Интересы' },
  { id: 'vg', name: '/vg/', description: 'Треды Видеоигр', category: 'Интересы' },
  { id: 'tv', name: '/tv/', description: 'ТВ и Фильмы', category: 'Интересы' },
  { id: 'k', name: '/k/', description: 'Оружие', category: 'Интересы' },
  { id: 'o', name: '/o/', description: 'Авто', category: 'Интересы' },
  { id: 'an', name: '/an/', description: 'Животные', category: 'Интересы' },
  { id: 'tg', name: '/tg/', description: 'Настольные Игры', category: 'Интересы' },
  { id: 'sp', name: '/sp/', description: 'Спорт', category: 'Интересы' },
  { id: 'g', name: '/g/', description: 'Технологии', category: 'Творчество' },
  { id: 'diy', name: '/diy/', description: 'Сделай Сам', category: 'Творчество' },
  { id: 'wg', name: '/wg/', description: 'Обои', category: 'Творчество' },
  { id: 'i', name: '/i/', description: 'Обои', category: 'Творчество' },
  { id: 'po', name: '/po/', description: 'Оригами', category: 'Творчество' },
  { id: 'p', name: '/p/', description: 'Фото', category: 'Творчество' },
  { id: 'b', name: '/b/', description: 'Случайное', category: 'Другое' },
  { id: 'r9k', name: '/r9k/', description: 'ROBOT9001', category: 'Другое' },
  { id: 'pol', name: '/pol/', description: 'Политика', category: 'Другое' },
  { id: 'biz', name: '/biz/', description: 'Бизнес и Финансы', category: 'Другое' },
  { id: 'int', name: '/int/', description: 'Международный', category: 'Другое' },
];

export const categories = [
  'Японская Культура',
  'Интересы', 
  'Творчество',
  'Другое'
];
