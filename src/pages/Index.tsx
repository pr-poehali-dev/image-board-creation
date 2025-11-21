import { useState } from 'react';
import HomePage from '@/components/imageboard/HomePage';
import BoardPage from '@/components/imageboard/BoardPage';
import RulesPage from '@/components/imageboard/RulesPage';
import { Post } from '@/components/imageboard/types';

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
      <HomePage 
        onBoardClick={handleBoardClick}
        onRulesClick={() => setCurrentView('rules')}
      />
    );
  }

  if (currentView === 'rules') {
    return (
      <RulesPage 
        onBackClick={() => setCurrentView('home')}
      />
    );
  }

  return (
    <BoardPage
      selectedBoard={selectedBoard}
      posts={posts}
      newThreadContent={newThreadContent}
      newThreadImage={newThreadImage}
      newReplyContent={newReplyContent}
      newReplyImage={newReplyImage}
      onBackClick={() => setCurrentView('home')}
      onRulesClick={() => setCurrentView('rules')}
      onThreadContentChange={setNewThreadContent}
      onThreadImageUpload={(e) => handleImageUpload(e, 'thread')}
      onNewThread={handleNewThread}
      onReplyContentChange={(postId, content) => setNewReplyContent({ ...newReplyContent, [postId]: content })}
      onReplyImageUpload={(e, postId) => handleImageUpload(e, 'reply', postId)}
      onReply={handleReply}
    />
  );
};

export default Index;
