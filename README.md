# 📚 Paginareum

**Paginareum** é uma plataforma de catálogo e organização de livros digitais. Usuários podem adicionar, classificar, e gerenciar suas leituras com uma interface elegante e intuitiva. O foco principal é oferecer um sistema flexível de categorização com tópicos personalizados, ideal para quem deseja construir sua própria biblioteca digital organizada.

## Demo

Veja a versão hospedada no Vercel:  
[https://appetize-five.vercel.app/](https://paginareum.vercel.app)

# Bibliotheca
<img width="1919" height="915" alt="Screenshot_142" src="https://github.com/user-attachments/assets/bfee74e5-d712-4a52-8871-59c36c18b2e5" />

## 🧠 Visão Geral

O projeto oferece:
- Adição de livros com upload de capa e PDF para o Supabase Storage.
- Organização dos livros com tópicos criados pelo próprio usuário.
- Controle de status de leitura: `unread`, `in_progress`, `read`.
- Página de perfil com estatísticas de leitura.
- Interface moderna com React, Tailwind, animações com tailwind-motion.
- Backend com Supabase (auth, banco de dados e storage).
- Login com providers(Github, Discord)

## ⚙️ Tecnologias

- **Frontend**: React, Next.js, Tailwind CSS, Zustand
- **Backend/Storage**: Supabase (PostgreSQL, Auth, Storage)
- **Outros**: TypeScript (evitando `any`)

## Instalação

1. Clone o repositório  
   ```bash
   git clone https://github.com/2Rovian/Paginareum.git
2. Entre na pasta do projeto

   ```bash
   cd paginareum
3. Instale as dependências
   ```bash
   npm install
4. Rode em modo desenvolvimento
   ```bash
   npm run dev
