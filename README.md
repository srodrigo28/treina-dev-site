#### Link
```
https://vercel.com/srodrigo28s-projects?repo=https://github.com/srodrigo28/treina-dev-site
```

# Página de Vendas - Cursos de Desenvolvimento de Apps (Next.js 15)

## 🚀 Sobre o Projeto

Esta é uma página de vendas moderna e persuasiva criada especificamente para cursos de desenvolvimento de aplicativos. A página foi desenvolvida com **Next.js 15**, **TypeScript** e **Tailwind CSS**, oferecendo uma experiência visual impactante, totalmente responsiva e com performance otimizada.

## ✨ Características Principais

### ✅ Elementos Implementados
- **Header Fixo**: Navegação sempre visível com logo e menu
- **Vídeo Principal Fullscreen**: Vídeo do YouTube ocupando toda a tela como fundo
- **Títulos Sobrepostos**: Títulos e textos posicionados sobre o vídeo com overlay escuro
- **Botão Call-to-Action**: "Faça Parte da Nossa Comunidade GRÁTIS" destacado
- **Cards de Vídeos**: 3 cards responsivos com vídeos do YouTube
- **Botão WhatsApp**: Flutuante com link direto para o número 62 998579084
- **Footer Completo**: Com redes sociais (Instagram, TikTok, YouTube)
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Indicador de Scroll**: Animação sutil indicando que há mais conteúdo abaixo

### 🎨 Design Features
- Gradientes modernos em roxo e rosa
- Animações suaves e efeitos hover
- Tipografia hierárquica e legível
- Ícones profissionais (Lucide React)
- Layout responsivo com Tailwind CSS
- Otimizações de performance do Next.js

### 🔧 Tecnologias Utilizadas
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **Class Variance Authority**: Gerenciamento de variantes de componentes
- **Radix UI**: Componentes acessíveis

## 🛠️ Como Usar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start
```

Acesse: http://localhost:3000

### Personalizar Conteúdo

#### 1. Alterar Vídeos do YouTube
No arquivo `src/app/page.tsx`, procure por:
```tsx
src="https://www.youtube.com/embed/dQw4w9WgXcQ"
```
Substitua `dQw4w9WgXcQ` pelo ID do seu vídeo do YouTube.

#### 2. Alterar Número do WhatsApp
Procure por:
```tsx
href="https://wa.me/5562998579084"
```
Substitua pelo seu número (formato: 55 + DDD + número).

#### 3. Alterar Links das Redes Sociais
No footer, procure por:
```tsx
href="https://instagram.com"
href="https://tiktok.com" 
href="https://youtube.com"
```
Substitua pelos seus perfis reais.

#### 4. Personalizar Textos
- **Título Principal**: Linha 45-50
- **Descrição**: Linha 51-55
- **Cards de Cursos**: Linhas 90-200
- **Footer**: Linhas 220-280

#### 5. Alterar Metadados
No arquivo `src/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: "Seu Título Aqui",
  description: "Sua descrição aqui",
};
```

#### 6. Personalizar Cores
Use as classes Tailwind diretamente no JSX ou customize o arquivo `tailwind.config.ts`.

## 📱 Responsividade

A página foi desenvolvida com abordagem "mobile-first":
- **Desktop**: Layout em 3 colunas para os cards
- **Tablet**: Layout adaptativo
- **Mobile**: Cards empilhados verticalmente

## 🎯 Elementos Persuasivos

### Copywriting Otimizado
- Headlines impactantes
- Benefícios claros
- Prova social ("+10.000 desenvolvedores")
- Call-to-actions estratégicos

### Psicologia de Vendas
- Cores que transmitem confiança (roxo/azul)
- Botões com contraste alto
- Hierarquia visual clara
- Senso de urgência e exclusividade

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas
O projeto está pronto para deploy em:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📞 Contato Rápido

O botão do WhatsApp está configurado para o número **62 998579084** e abrirá automaticamente uma conversa no WhatsApp Web ou app.

## ⚡ Performance

### Otimizações Incluídas
- **Server-Side Rendering (SSR)**: Carregamento inicial mais rápido
- **Automatic Code Splitting**: Carregamento otimizado de JavaScript
- **Image Optimization**: Otimização automática de imagens
- **Font Optimization**: Carregamento otimizado de fontes
- **Bundle Analysis**: Análise de tamanho do bundle

### Comandos de Análise
```bash
# Analisar bundle
npm run build && npm run analyze

# Lighthouse audit
npm run lighthouse
```

## 🔧 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   └── ui/
│       └── button.tsx       # Componente Button
└── lib/
    └── utils.ts             # Utilitários
```

## 📈 Próximos Passos

Para maximizar conversões, considere adicionar:
- Formulário de captura de leads
- Depoimentos de alunos
- Contador de vagas limitadas
- Chat ao vivo
- Pixels de tracking (Facebook, Google)
- Analytics (Google Analytics, Hotjar)
- A/B Testing

## 🔄 Migração do React

Este projeto foi migrado do React (Vite) para Next.js 15 mantendo:
- ✅ Todas as funcionalidades originais
- ✅ Design idêntico
- ✅ Responsividade
- ✅ Performance melhorada
- ✅ SEO otimizado
- ✅ TypeScript para maior segurança

---

**Desenvolvido com ❤️ usando Next.js 15, TypeScript e Tailwind CSS para maximizar suas vendas de cursos!**

