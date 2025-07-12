import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, ChevronRight, Code, Monitor, XCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper';
import { Navigation, Pagination, Keyboard, Mousewheel, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

// 1. Definição do Tipo de Dados
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

// 2. Componente de Modal/Detalhes do Projeto
function ProjectDetailsModal({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: Project | null }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    if (!project) return null;

    const screenshotsUrls = project.screenshots?.map(s => s.image_url) || [];
    const hasScreenshots = screenshotsUrls.length > 0;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-800 p-6 shadow-2xl transform transition-all scale-100 opacity-100">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-3xl font-bold text-white">{project.title}</Dialog.Title>
                        <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition" aria-label="Fechar">
                            <XCircle className="w-7 h-7" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Swiper
                                key={project.id}
                                spaceBetween={10}
                                navigation={hasScreenshots ? { nextEl: '.swiper-button-next-main', prevEl: '.swiper-button-prev-main' } : false}
                                thumbs={hasScreenshots && thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                modules={[Navigation, Thumbs, Keyboard, Mousewheel, Pagination]}
                                keyboard={{ enabled: true }}
                                mousewheel={{ invert: true }}
                                pagination={{ clickable: true }}
                                className="mySwiper2 rounded-lg overflow-hidden mb-2"
                            >
                                {screenshotsUrls.length > 0 ? (
                                    screenshotsUrls.map((screenshot, index) => (
                                        <SwiperSlide key={index}>
                                            <Image
                                                src={screenshot}
                                                width={600}
                                                height={400}
                                                alt={`${project.title} - Screenshot ${index + 1}`}
                                                className="w-full h-auto object-contain max-h-[400px]"
                                                onError={(e) => {
                                                    console.error(`Erro ao carregar screenshot ${index + 1} para o projeto ${project.title}:`, screenshot);
                                                    e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Imagem+indisponível`;
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <Image
                                            src={`https://placehold.co/600x400/333/FFF?text=Nenhuma+imagem+disponível`}
                                            width={600}
                                            height={400}
                                            alt="Nenhuma imagem disponível"
                                            className="w-full h-auto object-contain max-h-[400px]"
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            <div className="flex justify-between mt-2">
                                <button className={`swiper-button-prev-main p-2 bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors ${!hasScreenshots ? 'invisible' : ''}`} aria-label="Anterior">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className={`swiper-button-next-main p-2 bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors ${!hasScreenshots ? 'invisible' : ''}`} aria-label="Próximo">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {hasScreenshots && (
                                <Swiper
                                    key={project.id}
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >
                                    {screenshotsUrls.map((screenshot, index) => (
                                        <SwiperSlide key={index} className="rounded-md overflow-hidden cursor-pointer border border-transparent hover:border-sky-500 transition-all">
                                            <Image
                                                width={400} height={200}
                                                src={screenshot}
                                                alt={`Miniatura ${index + 1}`}
                                                className="w-full h-16 object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                        <div className="text-gray-200">
                            <p className="mb-4 text-lg leading-relaxed">{project.description}</p>
                            <h4 className="text-xl font-semibold mb-2 text-white">Tecnologias Utilizadas:</h4>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="inline-flex items-center rounded-full bg-blue-600/20 px-3 py-1 text-sm font-medium text-blue-300">
                                        <Code className="w-4 h-4 mr-1" /> {tech}
                                    </span>
                                ))}
                            </div>
                            {project.project_url && (
                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
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

// 3. Componente Principal de Portfólio (ProjectsShowcase)
export default function ProjectsShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProjects() {
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
                        screenshots:project_screenshots(image_url)
                    `);

                if (error) {
                    throw error;
                }

                if (data) {
                    setProjects(data as Project[]);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Erro ao buscar projetos:', err.message);
                    setError('Não foi possível carregar os projetos. Tente novamente mais tarde.');
                } else {
                    console.error('Um erro desconhecido ocorreu.');
                    setError('Ocorreu um erro desconhecido.');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen text-white">
                <p className="text-2xl animate-pulse">Carregando projetos...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen text-white text-center p-4">
                <p className="text-xl text-red-400 mb-4">{error}</p>
                <p className="text-md text-gray-400">Verifique sua conexão com o Supabase e as permissões da tabela.</p>
            </main>
        );
    }

    if (projects.length === 0) {
        return (
            <main className="flex items-center justify-center min-h-screen text-white">
                <p className="text-xl text-gray-400">Nenhum projeto encontrado.</p>
            </main>
        );
    }

    const placeholderUrl = 'https://placehold.co/600x400/333/FFF?text=Sem+Capa';

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
                    className="mySwiper-projects pb-12"
                >
                    {projects.map((project) => {
                        // Verifica se a URL da capa existe; se não, usa o placeholder
                        const imageUrlToDisplay = project.cover_image_url || placeholderUrl;

                        return (
                            <SwiperSlide key={project.id}>
                                <div
                                    className="group relative h-80 rounded-xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-500/50"
                                    onClick={() => openModal(project)}
                                >
                                    <Image
                                        width={600}
                                        height={400}
                                        src={imageUrlToDisplay}
                                        alt={`Capa do projeto ${project.title}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6 group-hover:bg-opacity-80 transition-all duration-300">
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                                            <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                                            {/* <p className='text-[8px] text-white'>{project.cover_image_url}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="swiper-button-prev-projects absolute top-1/2 -left-4 -translate-y-1/2 z-10 p-3 bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg">
                    <ChevronLeft className="w-6 h-6" />
                </div>
                <div className="swiper-button-next-projects absolute top-1/2 -right-4 -translate-y-1/2 z-10 p-3 bg-gray-700 rounded-full text-white cursor-pointer hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg">
                    <ChevronRight className="w-6 h-6" />
                </div>
            </div>

            <ProjectDetailsModal
                key={selectedProject?.id}
                isOpen={isModalOpen}
                onClose={closeModal}
                project={selectedProject}
            />
        </main>
    );
}