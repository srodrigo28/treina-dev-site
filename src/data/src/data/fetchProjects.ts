import { supabase } from "@/lib/supabaseClient";


// 1. Define a estrutura de dados que a query do Supabase retorna.
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  cover_image_url: string;
  project_url?: string;
  screenshots: {
    image_url: string;
  }[] | null;
};

// 2. Define o tipo da função para retornar um array de projetos ou um array vazio.
export const fetchProjects = async (): Promise<Project[]> => {
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
        screenshots:project_screenshots(image_url)
      `);

    if (error) {
      // Usa uma instância de Error para um tratamento mais seguro
      throw new Error(error.message);
    }

    return (data as Project[]) || [];
  } catch (err: unknown) {
    // Corrigido: Usamos 'unknown' e verificamos o tipo do erro
    if (err instanceof Error) {
      console.error('Erro ao buscar projetos:', err.message);
      // Aqui você pode tratar o erro de forma mais específica se necessário
    } else {
      console.error('Um erro desconhecido ocorreu.');
    }
    return [];
  }
};