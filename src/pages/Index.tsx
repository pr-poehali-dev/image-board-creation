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
}

interface Board {
  id: string;
  name: string;
  description: string;
}

const boards: Board[] = [
  { id: 'b', name: '/b/', description: 'Случайное' },
  { id: 'a', name: '/a/', description: 'Аниме и Манга' },
  { id: 'v', name: '/v/', description: 'Видеоигры' },
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
  const [newReplyContent, setNewReplyContent] = useState<{[key: number]: string}>({});

  const handleBoardClick = (boardId: string) => {
    setSelectedBoard(boardId);
    setCurrentView('board');
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
      replies: []
    };
    
    setPosts([newPost, ...posts]);
    setNewThreadContent('');
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
            content: replyText
          }]
        };
      }
      return post;
    }));

    setNewReplyContent({ ...newReplyContent, [postId]: '' });
  };

  if (currentView === 'home') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#800000' }}>
              Добро пожаловать на имиджборд
            </h1>
            <p className="text-gray-600">Выберите доску для продолжения</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#800000' }}>Доски</h2>
            <div className="space-y-2">
              {boards.map(board => (
                <Card 
                  key={board.id}
                  className="p-4 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#F0E0D6', borderColor: '#D9BFB7' }}
                  onClick={() => handleBoardClick(board.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold" style={{ color: '#800000' }}>
                      {board.name}
                    </span>
                    <span className="text-gray-700">{board.description}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentView('rules')}
              style={{ borderColor: '#D9BFB7', color: '#800000' }}
            >
              Правила
            </Button>
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
                      <div className="font-mono text-sm whitespace-pre-wrap">
                        {reply.content}
                      </div>
                    </div>
                  ))}
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
