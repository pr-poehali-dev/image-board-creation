import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  category: string;
}

const boards: Board[] = [
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

const categories = [
  'Японская Культура',
  'Интересы', 
  'Творчество',
  'Другое'
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'board' | 'rules'>('home');
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 329512350,
      author: 'Anonymous',
      date: '05/20/11(Fri)16:28:32',
      content: 'Its that time again guys,\n\nhttp://www[]textuploader[]com/?p=6&id=sml7o\n\ni5 bombs but mostly long ad clicks today please',
      replies: [
        {
          id: 329516328,
          author: 'Anonymous',
          date: '05/20/11(Fri)17:00:57',
          content: '>>329513164\n>>329513245\n>>329514133\n\ni got you guys..\nhttp://www[]textuploader[]com/?p=6&id=sml7o\ni5 bombs but mostly long ad clicks today please'
        }
      ]
    }
  ]);
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadImage, setNewThreadImage] = useState<string>('');
  const [newReplyContent, setNewReplyContent] = useState<{[key: number]: string}>({});
  const [newReplyImage, setNewReplyImage] = useState<{[key: number]: string}>({});

  const handleBoardClick = (boardId: string) => {
    setSelectedBoard(boardId);
    setCurrentView('board');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'thread' | 'reply', postId?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (type === 'thread') {
        setNewThreadImage(result);
      } else if (type === 'reply' && postId) {
        setNewReplyImage({ ...newReplyImage, [postId]: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNewThread = () => {
    if (!newThreadContent.trim()) return;
    
    const newPost: Post = {
      id: Math.floor(Math.random() * 1000000000),
      author: 'Anonymous',
      date: new Date().toLocaleString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      content: newThreadContent,
      image: newThreadImage || undefined,
      replies: []
    };
    
    setPosts([newPost, ...posts]);
    setNewThreadContent('');
    setNewThreadImage('');
  };

  const handleReply = (postId: number) => {
    const replyText = newReplyContent[postId];
    if (!replyText?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, {
            id: Math.floor(Math.random() * 1000000000),
            author: 'Anonymous',
            date: new Date().toLocaleString('en-US', { 
              month: '2-digit', 
              day: '2-digit', 
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
            content: replyText,
            image: newReplyImage[postId] || undefined
          }]
        };
      }
      return post;
    }));

    setNewReplyContent({ ...newReplyContent, [postId]: '' });
    setNewReplyImage({ ...newReplyImage, [postId]: '' });
  };

  if (currentView === 'home') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center mb-6 pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-5xl">🍀</span>
              <h1 className="text-4xl font-bold" style={{ color: '#800000' }}>
                4chan
              </h1>
            </div>
          </div>

          <Card 
            className="mb-6 p-4"
            style={{ backgroundColor: '#F0E0D6', borderColor: '#D9BFB7' }}
          >
            <div className="flex items-start gap-2">
              <div 
                className="px-2 py-1 font-bold text-white text-sm"
                style={{ backgroundColor: '#800000' }}
              >
                Что такое 4chan?
              </div>
              <button 
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-800">
              <p className="mb-2">
                4chan - это простая имиджборда, где можно постить картинки и обсуждать различные темы. 
                Здесь есть доски для всего: от японской анимации и культуры до видеоигр, музыки и фотографии.
              </p>
              <p>
                Не нужно регистрироваться! Кликайте на доску ниже, которая вас интересует, и читайте FAQ если хотите узнать больше о том, как пользоваться сайтом.
              </p>
            </div>
          </Card>

          <Card 
            className="p-0 overflow-hidden"
            style={{ borderColor: '#D9BFB7' }}
          >
            <div 
              className="px-3 py-2 font-bold text-white flex items-center justify-between"
              style={{ backgroundColor: '#800000' }}
            >
              <span>Доски</span>
              <span className="text-sm cursor-pointer hover:underline">Blur ▼</span>
            </div>

            <div className="grid grid-cols-4 gap-0 border-t" style={{ borderColor: '#D9BFB7' }}>
              {categories.map((category, idx) => (
                <div 
                  key={category}
                  className={idx < categories.length - 1 ? 'border-r' : ''}
                  style={{ borderColor: '#D9BFB7', backgroundColor: '#F0E0D6' }}
                >
                  <div 
                    className="px-3 py-2 font-bold text-sm border-b"
                    style={{ color: '#800000', borderColor: '#D9BFB7', backgroundColor: '#FFFFEE' }}
                  >
                    {category}
                  </div>
                  <div className="p-3">
                    {boards
                      .filter(b => b.category === category)
                      .map(board => (
                        <div key={board.id} className="mb-1">
                          <span 
                            className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold"
                            onClick={() => handleBoardClick(board.id)}
                          >
                            {board.name}
                          </span>
                          <span className="text-gray-700 text-sm ml-1">
                            {board.description}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card 
            className="mt-6 p-0 overflow-hidden"
            style={{ borderColor: '#D9BFB7' }}
          >
            <div 
              className="px-3 py-2 font-bold text-white flex items-center justify-between"
              style={{ backgroundColor: '#800000' }}
            >
              <span>Популярные Треды</span>
              <span className="text-sm cursor-pointer hover:underline">Options ▼</span>
            </div>
            <div className="p-4" style={{ backgroundColor: '#F0E0D6' }}>
              <div className="grid grid-cols-4 gap-4">
                {['Virtual YouTubers', 'Weapons', 'Technology', 'International'].map((topic) => (
                  <div key={topic}>
                    <div className="text-sm font-semibold mb-2" style={{ color: '#800000' }}>
                      {topic}
                    </div>
                    <div 
                      className="w-full aspect-square bg-black mb-2 flex items-center justify-center text-white text-xs"
                    >
                      [изображение]
                    </div>
                    <div className="text-xs text-gray-700">
                      Sample thread description here...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card 
            className="mt-6 p-0 overflow-hidden"
            style={{ borderColor: '#D9BFB7' }}
          >
            <div 
              className="px-3 py-2 font-bold text-white"
              style={{ backgroundColor: '#800000' }}
            >
              Stats
            </div>
            <div className="p-3 text-sm" style={{ backgroundColor: '#F0E0D6' }}>
              <div className="flex justify-between mb-1">
                <span>Total Posts:</span>
                <span className="font-semibold">2,048,913,972</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Current Users:</span>
                <span className="font-semibold">212,922</span>
              </div>
              <div className="flex justify-between">
                <span>Active Content:</span>
                <span className="font-semibold">1113 GB</span>
              </div>
            </div>
          </Card>

          <div className="text-center mt-6 text-sm text-gray-600 space-x-3">
            <a href="#" className="text-blue-600 hover:underline">Home</a>
            <a href="#" className="text-blue-600 hover:underline">News</a>
            <a href="#" className="text-blue-600 hover:underline">Blog</a>
            <a href="#" className="text-blue-600 hover:underline">FAQ</a>
            <span 
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setCurrentView('rules')}
            >
              Rules
            </span>
            <a href="#" className="text-blue-600 hover:underline">Support 4chan</a>
            <a href="#" className="text-blue-600 hover:underline">Advertise</a>
            <a href="#" className="text-blue-600 hover:underline">Press</a>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'rules') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentView('home')}
              style={{ color: '#800000' }}
            >
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </Button>
          </div>

          <Card 
            className="p-6"
            style={{ backgroundColor: '#F0E0D6', borderColor: '#D9BFB7' }}
          >
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#800000' }}>
              Правила имиджборда
            </h1>
            
            <div className="space-y-4 text-gray-800">
              <div>
                <h2 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>1. Общие правила</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Будьте вежливы с другими пользователями</li>
                  <li>Не публикуйте личную информацию</li>
                  <li>Запрещен спам и флуд</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>2. Контент</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Постите контент в соответствующие разделы</li>
                  <li>Запрещен незаконный контент</li>
                  <li>Уважайте авторские права</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2" style={{ color: '#800000' }}>3. Форматирование</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Используйте &gt;&gt;номер для цитирования постов</li>
                  <li>Все посты анонимны по умолчанию</li>
                  <li>Можно прикреплять изображения к постам</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('home')}
            style={{ color: '#800000' }}
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад
          </Button>
          
          <h1 className="text-3xl font-bold" style={{ color: '#800000' }}>
            /{selectedBoard}/ - {boards.find(b => b.id === selectedBoard)?.description}
          </h1>
          
          <Button
            variant="outline"
            onClick={() => setCurrentView('rules')}
            style={{ borderColor: '#D9BFB7', color: '#800000' }}
          >
            Правила
          </Button>
        </div>

        <Card 
          className="p-4 mb-6"
          style={{ backgroundColor: '#F0E0D6', borderColor: '#D9BFB7' }}
        >
          <h3 className="font-bold mb-2" style={{ color: '#800000' }}>Начать новый тред</h3>
          <div className="mb-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'thread')}
              className="mb-2"
              style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
            />
            {newThreadImage && (
              <div className="mb-2">
                <img src={newThreadImage} alt="Preview" className="max-w-xs max-h-48 object-contain" />
              </div>
            )}
          </div>
          <Textarea
            placeholder="Ваше сообщение..."
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
            className="mb-2 font-mono"
            style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
          />
          <Button
            onClick={handleNewThread}
            style={{ backgroundColor: '#800000', color: '#FFFFEE' }}
          >
            Отправить
          </Button>
        </Card>

        <div className="space-y-4">
          {posts.map(post => (
            <Card 
              key={post.id}
              className="p-4"
              style={{ backgroundColor: '#F0E0D6', borderColor: '#D9BFB7' }}
            >
              <div className="mb-2">
                <span className="font-bold" style={{ color: '#117743' }}>{post.author}</span>
                <span className="mx-2 text-gray-600">{post.date}</span>
                <span className="text-blue-600">No.{post.id}</span>
              </div>
              
              {post.image && (
                <div className="mb-3">
                  <img src={post.image} alt="Post" className="max-w-md max-h-96 object-contain" />
                </div>
              )}
              
              <div className="mb-3 font-mono text-sm whitespace-pre-wrap">
                {post.content}
              </div>

              {post.replies.length > 0 && (
                <div className="ml-6 space-y-2 mb-3">
                  {post.replies.map(reply => (
                    <div 
                      key={reply.id}
                      className="p-3 rounded"
                      style={{ backgroundColor: '#FFFFEE', borderLeft: '3px solid #D9BFB7' }}
                    >
                      <div className="mb-2">
                        <span className="font-bold" style={{ color: '#117743' }}>{reply.author}</span>
                        <span className="mx-2 text-gray-600">{reply.date}</span>
                        <span className="text-blue-600">No.{reply.id}</span>
                      </div>
                      {reply.image && (
                        <div className="mb-2">
                          <img src={reply.image} alt="Reply" className="max-w-xs max-h-64 object-contain" />
                        </div>
                      )}
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'reply', post.id)}
                  className="text-sm"
                  style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
                />
                {newReplyImage[post.id] && (
                  <div>
                    <img src={newReplyImage[post.id]} alt="Preview" className="max-w-xs max-h-32 object-contain" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ваш ответ..."
                    value={newReplyContent[post.id] || ''}
                    onChange={(e) => setNewReplyContent({ ...newReplyContent, [post.id]: e.target.value })}
                    className="font-mono text-sm"
                    style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleReply(post.id)}
                    style={{ backgroundColor: '#800000', color: '#FFFFEE' }}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;