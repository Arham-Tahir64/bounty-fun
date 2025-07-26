"use client"

import React, { useState, useEffect } from "react";
import { AlertCircle, Upload } from 'lucide-react';
import './profile.css';

interface ProfileFormData {
  displayName: string;
  bio: string;
  profilePicture: string;
}

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProfileFormData) => void;
  initialData?: ProfileFormData | null;
}

export function ProfileDialog({ open, onOpenChange, onSubmit, initialData }: ProfileDialogProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: "",
    bio: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        displayName: initialData.displayName || "",
        bio: initialData.bio || "",
        profilePicture: initialData.profilePicture || "",
      });
    } else {
      setFormData({
        displayName: "",
        bio: "",
        profilePicture: "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    if (!formData.displayName.trim()) return "Display name is required";
    if (formData.displayName.length > 50) return "Display name must be 50 characters or less";
    if (formData.bio.length > 200) return "Bio must be 200 characters or less";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      onSubmit(formData);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Form submission failed:", err);
      setError(err.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, profilePicture: e.target?.result as string }));
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  if (!open) return null;

  return (
    <div className="profile-modal-backdrop" onClick={() => onOpenChange(false)}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>{initialData ? "Edit Profile" : "Create Profile"}</h2>
          <p>{initialData ? "Update your profile information" : "Create your profile to get started"}</p>
        </div>

        {error && (
          <div className="profile-alert-destructive">
            <AlertCircle className="h-4 w-4" />
            <p className="profile-alert-description">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form space-y-5">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <img 
                src={formData.profilePicture || "https://placehold.co/80x80/cccccc/333333?text=U"} 
                alt="Profile" 
                className="profile-avatar-image" 
                onError={(e) => (e.currentTarget.src = "https://placehold.co/80x80/cccccc/333333?text=U")} 
              />
              <div className="profile-avatar-fallback">
                {formData.displayName.slice(0, 2).toUpperCase() || "U"}
              </div>
            </div>

            <label className="cursor-pointer">
              <button type="button" className="profile-upload-button">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </button>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="displayName">Display Name *</label>
            <input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
              placeholder="Your display name"
              maxLength={50}
              required
            />
            <p className="char-count">{formData.displayName.length}/50 characters</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
              maxLength={200}
            />
            <p className="char-count">{formData.bio.length}/200 characters</p>
          </div>

          <div className="modal-buttons">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => onOpenChange(false)} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
            >
              {loading ? "Saving..." : initialData ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
