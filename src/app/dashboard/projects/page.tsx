'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, FolderGit2, Trash2, Edit3, ExternalLink, Star, Upload } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, ConfirmDialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Project } from '@/types';
import { sanitizeUrl, isSafeUrl, validateImageFile } from '@/lib/validation';

export default function ProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const { success, error } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featured, setFeatured] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const check = validateImageFile(file);
    if (!check.valid) {
      error(check.error || 'Invalid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
        success('Project cover image uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setImage('');
    setUrl('');
    setGithubUrl('');
    setTechInput('');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setImage(proj.image || '');
    setUrl(proj.url || '');
    setGithubUrl(proj.githubUrl || '');
    setTechInput(proj.technologies ? proj.technologies.join(', ') : '');
    setFeatured(proj.featured);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      error('Title and description are required');
      return;
    }

    const cleanDemoUrl = url ? sanitizeUrl(url) : undefined;
    const cleanGitUrl = githubUrl ? sanitizeUrl(githubUrl) : undefined;

    if (cleanDemoUrl && !isSafeUrl(cleanDemoUrl)) {
      error('Please enter a valid live demo URL');
      return;
    }

    if (cleanGitUrl && !isSafeUrl(cleanGitUrl)) {
      error('Please enter a valid GitHub repository URL');
      return;
    }

    const technologies = techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        title: title.trim(),
        description: description.trim(),
        image: image.trim() || undefined,
        url: cleanDemoUrl,
        githubUrl: cleanGitUrl,
        technologies,
        featured,
      });
      success('Project updated successfully!');
    } else {
      addProject({
        title: title.trim(),
        description: description.trim(),
        image: image.trim() || undefined,
        url: cleanDemoUrl,
        githubUrl: cleanGitUrl,
        technologies,
        featured,
        sortOrder: projects.length,
      });
      success('Project added to your portfolio!');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deletingProjectId) {
      deleteProject(deletingProjectId);
      setDeletingProjectId(null);
      success('Project removed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Highlight your top open-source repositories, client apps, and SaaS ventures.
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">No projects added yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Showcase what you have built to attract recruiters, clients, and collaborators.
          </p>
          <Button size="sm" onClick={openAddModal} className="gap-2 mt-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Project</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(proj => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Image */}
                {proj.image ? (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4 bg-zinc-800 border border-zinc-800">
                    <Image src={proj.image} alt={proj.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    {proj.featured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-2xl bg-zinc-800/50 border border-zinc-800 mb-4 flex items-center justify-center text-zinc-500">
                    <FolderGit2 className="w-8 h-8 opacity-40" />
                  </div>
                )}

                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-3 text-xs">
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingProjectId(proj.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        description="Share a featured case study or repository on your profile."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. PropertyLedge SaaS"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="What does this project do, what problem did it solve, and what impact did it make?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <div>
            <Input
              label="Cover Image URL"
              placeholder="https://images.unsplash.com/photo-..."
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => imageInputRef.current?.click()}
                className="gap-1.5 text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Cover Image</span>
              </Button>
              {image && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setImage('')}
                  className="text-xs text-zinc-500 hover:text-red-400"
                >
                  Remove
                </Button>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Live Demo URL"
              placeholder="https://myproject.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <Input
              label="GitHub Repository URL"
              placeholder="https://github.com/username/repo"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
            />
          </div>

          <Input
            label="Technologies (Comma separated)"
            placeholder="Next.js 15, Supabase, Tailwind CSS, TypeScript"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
          />

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
            <span className="text-zinc-300 font-medium">Feature prominently on profile</span>
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-zinc-800 border-zinc-700 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingProject ? 'Save Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingProjectId}
        onClose={() => setDeletingProjectId(null)}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to remove this project from your profile?"
        confirmText="Delete Project"
      />
    </div>
  );
}
