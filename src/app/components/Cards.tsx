import Image from 'next/image';
import React from 'react';

// Define o tipo Formation
type Formation = {
  id: number;
  title: string;
  urlPromocao: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  tag?: 'LANÇAMENTO' | 'nova' | 'atualizada';
  image: string; // URL absoluta ou caminho local da miniatura
};

// Dados de exemplo das formações
const formations: Formation[] = [
  {
    id: 1,
    title: 'FlutterFlow',
    urlPromocao:
      'https://www.udemy.com/course/flutterflow-do-zero-2025-desenvolvimento-mobile-low-code/?referralCode=00180599DBC74FFBFA2A',
    level: 'iniciante',
    tag: 'LANÇAMENTO',
    image:
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/flutterflow-card.png',
  },
  {
    id: 2,
    title: 'Java do Zero',
    urlPromocao:
      'https://www.udemy.com/course/java-do-zero-ao-moderno-versao-22-cobre-ate-17/?referralCode=C145C167DCA0AD0AD4B1',
    level: 'iniciante',
    tag: 'nova',
    image:
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/java-card.png',
  },
  {
    id: 3,
    title: 'NextJs do Zero',
    urlPromocao:
      'https://www.udemy.com/course/treina-dev-web-2023/?referralCode=2CD72CD1ECAE9DF9476A',
    level: 'iniciante',
    tag: 'nova',
    image:
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/next-cards.png',
  },
  {
    id: 4,
    title: 'React-Expo Mobile',
    urlPromocao:
      'https://www.udemy.com/course/crie-aplicativos-moveis-curso-react-native-do-zero-ao-hero/?referralCode=',
    level: 'iniciante',
    tag: 'nova',
    image:
      'https://qlmmdhklaqyxpdctykjk.supabase.co/storage/v1/object/public/box/site/react-native-cards.png',
  },
];

// Componente que renderiza cada card individual de formação
function FormationCard({ title, level, tag, image, urlPromocao }: Formation) {
  return (
    <a
      href={urlPromocao || '#'} // Fallback to '#' if urlPromocao is empty
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow transition hover:shadow-purple-600/30 block"
      target="_blank"
      rel="noopener noreferrer"
    >
      {tag && (
        <span className="absolute left-3 top-3 z-10 rounded bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
          {tag}
        </span>
      )}

      {/* Imagem do card */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          width={800}
          height={600}
          alt={`Imagem da formação ${title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback image in case of loading error
            e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Erro+na+imagem`;
            e.currentTarget.alt = 'Falha ao carregar imagem';
          }}
        />
      </div>

      {/* Conteúdo do card */}
      <div className="space-y-1 p-4">
        <p className="text-sm capitalize text-purple-400">{level}</p>
        <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
      </div>
    </a>
  );
}

// Componente principal que exibe o título e os cards das formações
export default function Cards() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 w-full">
      <section>
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          Conheça nossas ofertas
        </h2>

        <h3 className="bg-green-500 w-fit mx-auto rounded-full py-3 px-7 
        animate-pulse md:mb-20 text-center text-3xl font-bold tracking-tight 
        text-zinc-100 text-lx md:text-4xl mb-10">
          Super promoção: acesso vitalício.
        </h3>

        {/* Grid responsivo para os cards das formações */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 flex-1">
            {/* Mapeia as formações para renderizar um FormationCard para cada uma */}
            {formations.map((formation) => (
              <FormationCard key={formation.id} {...formation} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
