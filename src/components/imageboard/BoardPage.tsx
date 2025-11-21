import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Post, boards } from './types';

interface BoardPageProps {
  selectedBoard: string;
  posts: Post[];
  newThreadContent: string;
  newThreadImage: string;
  newReplyContent: {[key: number]: string};
  newReplyImage: {[key: number]: string};
  onBackClick: () => void;
  onRulesClick: () => void;
  onThreadContentChange: (content: string) => void;
  onThreadImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewThread: () => void;
  onReplyContentChange: (postId: number, content: string) => void;
  onReplyImageUpload: (e: React.ChangeEvent<HTMLInputElement>, postId: number) => void;
  onReply: (postId: number) => void;
}

const BoardPage = ({
  selectedBoard,
  posts,
  newThreadContent,
  newThreadImage,
  newReplyContent,
  newReplyImage,
  onBackClick,
  onRulesClick,
  onThreadContentChange,
  onThreadImageUpload,
  onNewThread,
  onReplyContentChange,
  onReplyImageUpload,
  onReply
}: BoardPageProps) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFEE' }}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBackClick}
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
            onClick={onRulesClick}
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
              onChange={onThreadImageUpload}
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
            onChange={(e) => onThreadContentChange(e.target.value)}
            className="mb-2 font-mono"
            style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
          />
          <Button
            onClick={onNewThread}
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
                  onChange={(e) => onReplyImageUpload(e, post.id)}
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
                    onChange={(e) => onReplyContentChange(post.id, e.target.value)}
                    className="font-mono text-sm"
                    style={{ backgroundColor: '#FFFFEE', borderColor: '#D9BFB7' }}
                  />
                  <Button
                    size="sm"
                    onClick={() => onReply(post.id)}
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

export default BoardPage;
