'use client';

import React, { useState } from 'react';
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

// Definição do Tipo de Dados
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

// Componente de Modal/Detalhes do Projeto
export default function ProjectDetailsModal({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: Project | null }) {
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
                          console.error(`Erro ao carregar screenshot ${index + 1} para o projeto ${project.title}:`, screenshot); // Depuração
                          e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Imagem+indisponível`;
                        }}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  // Quando não há screenshots, exibe uma imagem placeholder
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