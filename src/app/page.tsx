'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Users, Smartphone, Code, Instagram, Youtube } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Cards from './components/Cards'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-green-600 to-slate-900">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-white">Treina-dev</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#contato" className="text-blue-400 hover:text-green-500 transition-colors duration-300">Nossos Cursos:</a>
            <a href="#contato" className="text-gray-300 hover:text-green-500 transition-colors duration-300">FlutterFlow</a>
            <a href="#sobre" className="text-gray-300 hover:text-green-500 transition-colors duration-300">Java</a>
            <a href="#cursos" className="text-gray-300 hover:text-green-500 transition-colors duration-300">ReactJS</a>
            <a href="#cursos" className="text-gray-300 hover:text-green-500 transition-colors duration-300">React Native</a>
            <a href="#contato" className="text-gray-300 hover:text-green-500 transition-colors duration-300">NextJS</a>
          </nav>
          <a
            href="https://wa.me/5562998579084"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">Começar Agora</Button>
          </a>
        </div>
      </header>

      {/* Hero Section com Vídeo Fullscreen */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Vídeo de Fundo */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            width="90%"
            height="80%"
            className="mx-auto mt-28"
            src="https://www.youtube.com/embed/syskoNXbua4?autoplay=1&mute=1&loop=1&playlist=syskoNXbua4&controls=0&showinfo=0&rel=0&iv_load_policy=3"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Transforme suas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">
                ideias
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto drop-shadow-lg">
              Aprenda a desenvolver aplicativos profissionais do zero ao avançado.
              Domine IA com uma velocidade incrível.
            </p>

            <p className="text-xl md:text-md bg-sky-500 w-fit px-5 rounded-full lg:text-xl mb-12 mx-auto animate-pulse text-white">
              Agende uma aula teste grátis
            </p>

            {/* Botão Principal */}
            <div className="space-y-6">
              <a
                href="https://wa.me/5562998579084"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r cursor-pointer animate-pulse from-green-600 to-orange-600 hover:from-sky-600 hover:to-orange-700 
                  text-white text-md md:text-2xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 drop-shadow-xl"
                >
                  <Users className="mr-3 h-8 w-4" />
                  Inscreva-se na comunidade GRÁTIS
                </Button>
              </a>
              <p className="text-gray-300 mt-7 text-lg drop-shadow-md">
                Mais de 2.000 desenvolvedores só em 2025.
              </p>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuação vem na próxima resposta (cards e footer) */}

      {/* Seção de Cards de Cursos */}
      <Cards />

      {/* Cards de Vídeos */}
      <section id="cursos" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Nossos Cursos em Destaque
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Conteúdo prático e atualizado para você dominar o desenvolvimento de aplicativos
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/pqdA_Db7pbI?si=PXrC5NUudsTVhoxV"
                  title="Java Moderno"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">React Native Completo</h3>
                <p className="text-gray-300 mb-4">
                  Desenvolva apps nativos para iOS e Android com uma única base de código. 
                  Aprenda desde o básico até funcionalidades avançadas.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-500 font-semibold">40+ horas de conteúdo</span>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/5xUbr58icBI?si=M3WERyKCWoHqqWw_"
                  title="FlutterFlow Avançado"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">FlutterFlow Profissional</h3>
                <p className="text-gray-300 mb-4">
                  Domine o framework do Google para criar apps incríveis. 
                  Animações, performance e arquitetura de alto nível.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-500 font-semibold">35+ horas de conteúdo</span>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-green-400/20 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-video bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dsGFv-zYljs?si=KGmuW3IiNRB1OmhK"
                  title="Backend para Apps"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">Backend & APIs</h3>
                <p className="text-gray-300 mb-4">
                  Construa backends robustos para seus apps. Java & Node.js, bancos de dados, 
                  APIs prontas para sua nova experiência.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-500 font-semibold">30+ horas de conteúdo</span>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão WhatsApp Flutuante */}
      <a
        href="https://wa.me/5562998579084"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl 
        transform hover:scale-110 transition-all duration-300 animate-pulse"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>

      {/* Rodapé */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-white">Treina-dev</span>
              </div>
              <p className="text-gray-400">
                Transformando vidas através da educação em tecnologia. 
                Aprenda a desenvolver apps e construa sua carreira tech.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#cursos" className="text-gray-400 hover:text-green-500 transition-colors">Cursos</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-green-500 transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-green-500 transition-colors">Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/aulastreinadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@treinadev?lang=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-3 rounded-full hover:scale-110 transition-transform duration-300 border border-white"
                >
                  <Smartphone className="h-6 w-6 text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@treina-dev/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Youtube className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Treina-dev. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
