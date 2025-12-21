"use client"
import { useState } from "react";

// app/components/CommentForm.tsx
export const CommentForms = () => {
  const [text, setText] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Component SENDS data to API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          author: 'Current User', // In real app, get from auth
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to post comment');
      }
      
      console.log('✅ Comment posted:', result.comment);
      setText(''); // Clear form
      
    } catch (error) {
      console.error('❌ Post failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};