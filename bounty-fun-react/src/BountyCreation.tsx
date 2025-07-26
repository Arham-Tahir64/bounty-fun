import { useState } from 'react';
import React from 'react';
import { CreateBountyData } from './types';
import './BountyCreation.css';

export interface BountyCreationProps {
  open: boolean;
  onCreate: (data: CreateBountyData) => void;
  onClose: () => void;
}

export const BountyCreation: React.FC<BountyCreationProps> = ({ open, onCreate, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(0);
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState<File[]>([]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBountyData: CreateBountyData = {
      title,
      description,
      reward,
      category,
      deadline,
      files,
    };
    onCreate(newBountyData);
    setTitle('');
    setDescription('');
    setReward(0);
    setCategory('');
    setDeadline('');
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create a New Bounty</h2>
        <form onSubmit={handleSubmit} className="bounty-form">
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Reward (SOL)
            <input type="number" value={reward} onChange={(e) => setReward(parseFloat(e.target.value))} required />
          </label>
          <label>
            Category
            <input value={category} onChange={(e) => setCategory(e.target.value)} required />
          </label>
          <label>
            Deadline (YYYY-MM-DD HH:MM)
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </label>
          <label>
            Files (Optional)
            <input type="file" multiple onChange={handleFileChange} />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="btn-primary">Create</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
