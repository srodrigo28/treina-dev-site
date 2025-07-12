'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Edit2, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { addOrUpdateProject, addProjectScreenshot, deleteProjectScreenshot } from '../actions/actions';

// 1. Definição dos Tipos de Dados
type Project = {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    cover_image_url: string;
    project_url?: string;
    screenshots: {
        id: number;
        image_url: string;
    }[] | null;
};

// 2. Componente de Página de Administração
export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    
    const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
    const [previewCoverUrl, setPreviewCoverUrl] = useState<string | null>(null);

    // Novos estados para os screenshots
    const [screenshots, setScreenshots] = useState<{ id: number; image_url: string; }[]>([]);
    const [newScreenshots, setNewScreenshots] = useState<File[]>([]);

    // 3. Função para Buscar Projetos
    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    id,
                    title,
                    description,
                    technologies,
                    cover_image_url,
                    project_url,
                    screenshots:project_screenshots(id, image_url)
                `)
                .order('id', { ascending: true });
            
            if (error) throw error;
            setProjects(data as Project[] || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // 4. Lógica de Upload e Preview
    const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedCoverFile(file);
            setPreviewCoverUrl(URL.createObjectURL(file));
        }
    };

    // const handleCoverUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setCoverImageUrl(e.target.value);
    //     setPreviewCoverUrl(e.target.value);
    //     setSelectedCoverFile(null);
    // };

    // Nova lógica para screenshots
    const handleScreenshotFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewScreenshots([...newScreenshots, ...Array.from(e.target.files)]);
        }
    };

    const uploadImage = async (file: File, folder: string) => {
        const filename = `${uuidv4()}-${file.name}`;
        const { data, error } = await supabase.storage.from('box').upload(`portifolio/${folder}/${filename}`, file);
        if (error) throw error;
        const publicUrl = supabase.storage.from('box').getPublicUrl(data.path).data.publicUrl;
        return publicUrl;
    };

    // 5. Funções de CRUD
    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza de que deseja excluir este projeto e todas as suas imagens?')) {
            try {
                // Remove todos os screenshots primeiro
                const { error: screenshotsError } = await supabase.from('project_screenshots').delete().eq('project_id', id);
                if (screenshotsError) throw screenshotsError;

                // Remove o projeto principal
                const { error } = await supabase.from('projects').delete().eq('id', id);
                if (error) throw error;
                
                // Atualiza a UI
                setProjects(projects.filter(p => p.id !== id));
                window.location.reload(); 
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocorreu um erro desconhecido.');
                }
            }
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setTitle(project.title);
        setDescription(project.description);
        setTechnologies(project.technologies.join(', '));
        setCoverImageUrl(project.cover_image_url);
        setProjectUrl(project.project_url || '');
        setPreviewCoverUrl(project.cover_image_url);
        setScreenshots(project.screenshots || []);
        setNewScreenshots([]);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setCurrentProject(null);
        setTitle('');
        setDescription('');
        setTechnologies('');
        setCoverImageUrl('');
        setProjectUrl('');
        setSelectedCoverFile(null);
        setPreviewCoverUrl(null);
        setScreenshots([]);
        setNewScreenshots([]);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        let coverUrl = coverImageUrl;

        try {
            if (selectedCoverFile) {
                coverUrl = await uploadImage(selectedCoverFile, 'project-covers');
            }

            const projectData = {
                title,
                description,
                technologies: technologies.split(',').map(tech => tech.trim()),
                cover_image_url: coverUrl,
                project_url: projectUrl,
            };

            const result = await addOrUpdateProject(projectData, currentProject ? currentProject.id : null);
            let projectId = currentProject?.id;

            if (result.success) {
                if (!projectId) {
                    const { data } = await supabase.from('projects').select('id').order('id', { ascending: false }).limit(1);
                    if (data && data.length > 0) {
                        projectId = data[0].id;
                    }
                }
            } else {
                throw new Error(result.error);
            }

            // Lógica para UPLOAD DE NOVOS SCREENSHOTS
            if (projectId && newScreenshots.length > 0) {
                for (const file of newScreenshots) {
                    const screenshotUrl = await uploadImage(file, 'project-screenshots');
                    await addProjectScreenshot(projectId, screenshotUrl);
                }
            }
            
            // Finalização do formulário
            await fetchProjects();
            setIsFormOpen(false);
            window.location.reload(); 
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleRemoveScreenshot = async (screenshotId: number, imageUrl: string) => {
        if (window.confirm('Tem certeza de que deseja remover esta imagem?')) {
            try {
                // Deleta a imagem do Storage
                const storagePath = imageUrl.split('portifolio/')[1];
                const { error: storageError } = await supabase.storage.from('box').remove([`portifolio/${storagePath}`]);
                if (storageError) throw storageError;

                // Deleta a entrada do banco de dados
                await deleteProjectScreenshot(screenshotId);

                // Atualiza a UI
                setScreenshots(screenshots.filter(s => s.id !== screenshotId));
                window.location.reload(); 
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocorreu um erro desconhecido.');
                }
            }
        }
    };

    // 6. Renderização do Componente
    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-100">Gerenciamento de Projetos</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors font-semibold"
                    >
                        <PlusCircle size={20} /> Adicionar Projeto
                    </button>
                </div>

                {error && (
                    <div className="bg-red-900 text-red-300 p-4 rounded-lg mb-6">
                        <p>Erro: {error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl text-gray-400 animate-pulse">Carregando...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-xl">
                        <table className="min-w-full bg-gray-900 border-collapse">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-300">Título</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-300">Capa</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-300">Tecnologias</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-300">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                            <td className="py-4 px-4 font-medium">{project.title}</td>
                                            <td className="py-4 px-4">
                                                <Image 
                                                    src={project.cover_image_url} 
                                                    alt={`Capa de ${project.title}`} 
                                                    width={64} 
                                                    height={48} 
                                                    className="rounded-md object-cover" 
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-gray-400">
                                                {project.technologies.join(', ')}
                                            </td>
                                            <td className="py-4 px-4 flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                                    aria-label={`Editar ${project.title}`}
                                                >
                                                    <Edit2 size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="text-red-500 hover:text-red-400 transition-colors"
                                                    aria-label={`Excluir ${project.title}`}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-400">Nenhum projeto encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {isFormOpen && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-100">{currentProject ? 'Editar Projeto' : 'Novo Projeto'}</h2>
                                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Fechar formulário">
                                    <XCircle size={28} />
                                </button>
                            </div>
                            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Seção 1: Dados do Projeto */}
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título</label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="technologies" className="block text-sm font-medium text-gray-300">Tecnologias (separadas por vírgula)</label>
                                        <input
                                            type="text"
                                            id="technologies"
                                            value={technologies}
                                            onChange={(e) => setTechnologies(e.target.value)}
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="project_url" className="block text-sm font-medium text-gray-300">URL do Projeto</label>
                                        <input
                                            type="url"
                                            id="project_url"
                                            value={projectUrl}
                                            onChange={(e) => setProjectUrl(e.target.value)}
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                        />
                                    </div>
                                </div>
                                
                                {/* Seção 2: Imagens do Projeto */}
                                <div className="space-y-6">
                                    {/* Campo da Imagem de Capa */}
                                    <div>
                                        <label htmlFor="cover_image" className="block text-sm font-medium text-gray-300">Capa do Projeto</label>
                                        <div className="flex items-center gap-4 mt-1">
                                            <input
                                                type="file"
                                                id="cover_image"
                                                onChange={handleCoverFileChange}
                                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                                            />
                                            {previewCoverUrl && (
                                                <Image 
                                                    src={previewCoverUrl} 
                                                    alt="Pré-visualização da Capa" 
                                                    width={100} 
                                                    height={75} 
                                                    className="rounded-md object-cover flex-shrink-0" 
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Seção de Screenshots */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Imagens do Projeto (Screenshots)</label>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleScreenshotFileChange}
                                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                        />
                                    </div>

                                    {/* Pré-visualização e Remoção de Screenshots Existentes */}
                                    {screenshots.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-400">Imagens Salvas:</p>
                                            <div className="flex flex-wrap gap-3">
                                                {screenshots.map((screenshot) => (
                                                    <div key={screenshot.id} className="relative group w-24 h-24 rounded-md overflow-hidden">
                                                        <Image src={screenshot.image_url} alt="Screenshot Salvo" width={96} height={96} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveScreenshot(screenshot.id, screenshot.image_url)}
                                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 size={24} className="text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Pré-visualização de Novos Screenshots */}
                                    {newScreenshots.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-400">Imagens para Upload:</p>
                                            <div className="flex flex-wrap gap-3">
                                                {newScreenshots.map((file, index) => (
                                                    <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border border-sky-400">
                                                        <Image src={URL.createObjectURL(file)} alt="Novo Screenshot" width={96} height={96} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        <XCircle size={18} /> Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            'Salvando...'
                                        ) : (
                                            <>
                                                <CheckCircle size={18} /> Salvar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}