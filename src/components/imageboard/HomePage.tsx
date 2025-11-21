import { Card } from '@/components/ui/card';
import { boards, categories } from './types';

interface HomePageProps {
  onBoardClick: (boardId: string) => void;
  onRulesClick: () => void;
}

const HomePage = ({ onBoardClick, onRulesClick }: HomePageProps) => {
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
                          onClick={() => onBoardClick(board.id)}
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
            onClick={onRulesClick}
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
};

export default HomePage;
