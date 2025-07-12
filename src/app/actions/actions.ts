'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

type Project = {
    id?: number;
    title: string;
    description: string;
    technologies: string[];
    cover_image_url: string;
    project_url?: string;
};

// Nova função para ADICIONAR uma imagem de screenshot
export async function addProjectScreenshot(projectId: number, screenshotUrl: string) {
    const { error } = await supabase
        .from('project_screenshots')
        .insert({
            project_id: projectId,
            image_url: screenshotUrl
        });

    if (error) {
        console.error('Erro ao adicionar screenshot:', error);
        return { success: false, error: 'Erro ao adicionar screenshot.' };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
}

// Nova função para DELETAR uma imagem de screenshot
export async function deleteProjectScreenshot(screenshotId: number) {
    const { error } = await supabase
        .from('project_screenshots')
        .delete()
        .eq('id', screenshotId);

    if (error) {
        console.error('Erro ao deletar screenshot:', error);
        return { success: false, error: 'Erro ao deletar screenshot.' };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
}

// Sua função principal, que agora está perfeita
export async function addOrUpdateProject(project: Project, projectId: number | null) {
    if (projectId) {
        const { error } = await supabase
            .from('projects')
            .update(project)
            .eq('id', projectId);

        if (error) {
            console.error('Erro ao atualizar projeto:', error);
            return { success: false, error: 'Erro ao atualizar o projeto.' };
        }

    } else {
        const { ...newProjectData } = project;
        
        const { error } = await supabase
            .from('projects')
            .insert(newProjectData);

        if (error) {
            console.error('Erro ao adicionar projeto:', error);
            return { success: false, error: 'Erro ao adicionar o projeto.' };
        }
    }

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
}