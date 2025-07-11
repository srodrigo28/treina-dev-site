import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, ChevronRight, Code, Monitor, XCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper'; // Importe o tipo Swiper da biblioteca base
import { Navigation, Pagination, Keyboard, Mousewheel, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import 'swiper/css/thumbs'; // Thumbs styles
import Image from 'next/image';

// --- 1. Definindo o Tipo de Dados para Projetos ---
// ESTA DEFINIÇÃO DEVE ESTAR AQUI NO TOPO
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  coverImageUrl: string; // Imagem da capa principal do projeto no carrossel
  screenshots: string[]; // Array de URLs para as imagens detalhadas do carrossel interno
  projectUrl?: string; // Opcional: link para o projeto online ou repositório
};

// --- 2. Dados de Exemplo de Projetos ---
const projects: Project[] = [
  {
    id: 1,
    title: 'Dashboard Financeiro AI',
    description: 'Sistema de gestão financeira completo com integração de inteligência artificial para projeções de mercado e análises de dados avançadas. Desenvolvido para otimizar tomadas de decisão.',
    technologies: ['React', 'Node.js', 'Python (IA)', 'Tailwind CSS', 'PostgreSQL'],
    coverImageUrl: 'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-dashboard-cover.png', // Exemplo de capa
    screenshots: [
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-dashboard-screen1.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-dashboard-screen2.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-dashboard-screen3.png',
    ],
    projectUrl: 'https://example.com/dashboard-financeiro',
  },
  {
    id: 2,
    title: 'App de Receitas Saudáveis',
    description: 'Aplicativo mobile intuitivo com receitas personalizadas baseadas em preferências dietéticas, lista de compras inteligente e um rastreador de calorias integrado para uma vida mais saudável.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Expo'],
    coverImageUrl: 'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-recipes-cover.png',
    screenshots: [
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-recipes-screen1.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-recipes-screen2.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-recipes-screen3.png',
    ],
    projectUrl: 'https://example.com/app-receitas',
  },
  {
    id: 3,
    title: 'E-commerce de Produtos Artesanais',
    description: 'Plataforma de vendas online elegante e responsiva, dedicada a produtos artesanais únicos. Inclui carrinho de compras robusto, integração de pagamentos e painel de vendedor.',
    technologies: ['Next.js', 'Stripe API', 'Prisma', 'MongoDB', 'Vercel'],
    coverImageUrl: 'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-ecommerce-cover.png',
    screenshots: [
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-ecommerce-screen1.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-ecommerce-screen2.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-ecommerce-screen3.png',
    ],
    projectUrl: 'https://example.com/ecommerce-artesanal',
  },
  {
    id: 4,
    title: 'Plataforma de Cursos Online',
    description: 'Sistema completo para gestão e entrega de cursos online, com área de alunos personalizada, dashboard de progresso intuitivo e ferramentas para professores. Perfeito para educação à distância.',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
    coverImageUrl: 'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-lms-cover.png',
    screenshots: [
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-lms-screen1.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-lms-screen2.png',
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/project-lms-screen3.png',
    ],
    projectUrl: 'https://example.com/cursos-online',
  },
];

// --- 3. Componente de Modal/Detalhes do Projeto ---
function ProjectDetailsModal({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: Project | null }) {
  // Use o tipo SwiperCore para 'thumbsSwiper'
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay de fundo */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Conteúdo do Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-800 p-6 
        shadow-2xl transform transition-all scale-100 opacity-100">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-3xl font-bold text-white">{project.title}</Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition"
              aria-label="Fechar"
            >
              <XCircle className="w-7 h-7" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carrossel de Imagens (Screenshots) */}
            <div>
              <Swiper
                spaceBetween={10}
                navigation={{ nextEl: '.swiper-button-next-main', prevEl: '.swiper-button-prev-main' }}
                // Agora o TypeScript entende que thumbsSwiper pode ser uma instância de SwiperCore
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs, Keyboard, Mousewheel, Pagination]}
                keyboard={{ enabled: true }}
                mousewheel={{ invert: true }}
                pagination={{ clickable: true }}
                className="mySwiper2 rounded-lg overflow-hidden mb-2"
              >
                {project.screenshots.map((screenshot, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={screenshot}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      className="w-full h-auto object-contain max-h-[400px]" // Ajustado para melhor visualização
                      onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Imagem+indisponível`; }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Botões de navegação customizados para o carrossel principal */}
              <div className="flex justify-between mt-2">
                <button className="swiper-button-prev-main p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 
                transition-colors" aria-label="Anterior">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="swiper-button-next-main p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 
                transition-colors" aria-label="Próximo">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carrossel de miniaturas (Thumbs) */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-2"
              >
                {project.screenshots.map((screenshot, index) => (
                  <SwiperSlide key={index} className="rounded-md overflow-hidden cursor-pointer border border-transparent
                  hover:border-sky-500 transition-all">
                    <Image
                      src={screenshot}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Detalhes do Projeto (Texto) */}
            <div className="text-gray-200">
              <p className="mb-4 text-lg leading-relaxed">{project.description}</p>
              <h4 className="text-xl font-semibold mb-2 text-white">Tecnologias Utilizadas:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-blue-600/20 px-3 py-1 text-sm 
                  font-medium text-blue-300">
                    <Code className="w-4 h-4 mr-1" /> {tech}
                  </span>
                ))}
              </div>
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 
                  px-6 rounded-lg transition-colors shadow-md"
                >
                  <Monitor className="mr-2 w-5 h-5" /> Ver Projeto Online
                </a>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// --- 4. Componente Principal de Portfólio (ProjectsShowcase) ---
export default function ProjectsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 w-full text-white">
      <section className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Explore nossos <span className="text-sky-400">Projetos</span> Incríveis
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Descubra o que é possível criar! Clique em um projeto para ver detalhes e telas.
        </p>
      </section>

      {/* Carrossel Principal de Capas de Projetos */}
      <div className="relative mb-16">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: '.swiper-button-next-projects', prevEl: '.swiper-button-prev-projects' }}
          pagination={{ clickable: true, dynamicBullets: true }}
          keyboard={{ enabled: true }}
          mousewheel={{ invert: true }}
          modules={[Navigation, Pagination, Keyboard, Mousewheel]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper-projects pb-12" // Adicionado padding-bottom para a paginação
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div
                className="group relative h-80 rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer 
                transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-500/50"
                onClick={() => openModal(project)}
              >
                <Image
                  src={project.coverImageUrl}
                  alt={`Capa do projeto ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Capa+Indisponível`; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6 group-hover:bg-opacity-80 
                transition-all duration-300">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p> {/* Limita a descrição em 2 linhas */}
                    <span className="mt-3 inline-flex items-center text-sky-300 font-semibold text-sm">
                      Ver Detalhes <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navegação Carrossel Principal */}
        {/* Removido 'hidden' para que os botões apareçam em mobile */}
        <div className="swiper-button-prev-projects absolute top-1/2 -left-4 -translate-y-1/2 z-10 p-3 bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="swiper-button-next-projects absolute top-1/2 -right-4 -translate-y-1/2 z-10 p-3 
        bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors flex 
        items-center justify-center shadow-lg">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>

      {/* Modal de Detalhes do Projeto */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </main>
  );
}