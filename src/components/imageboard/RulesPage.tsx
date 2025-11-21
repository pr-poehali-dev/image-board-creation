import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RulesPageProps {
  onBackClick: () => void;
}

const RulesPage = ({ onBackClick }: RulesPageProps) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={onBackClick}
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
};

export default RulesPage;
