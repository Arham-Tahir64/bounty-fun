import { useState } from 'react';
import React from 'react';
import { BountyData } from './types';


export interface BountyCreationProps {
  onCreate: (bounty: BountyData) => void;
  onCancel: () => void;
}

export const BountyCreation: React.FC<BountyCreationProps> = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(0);
  const [category, setCategory] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBounty: BountyData = {
      id: Date.now().toString(),
      title,
      description,
      reward,
      status: 'open',
      category,
      timeLeft,
      author: 'You'
    };
    onCreate(newBounty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Bounty</h2>
      <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} /></label>
      <label>Reward<input type="number" value={reward} onChange={(e) => setReward(parseFloat(e.target.value))} /></label>
      <label>Category<input value={category} onChange={(e) => setCategory(e.target.value)} /></label>
      <label>Time Left<input value={timeLeft} onChange={(e) => setTimeLeft(e.target.value)} /></label>
      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};
