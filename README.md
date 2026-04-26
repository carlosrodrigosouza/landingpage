# Landing Page Pessoal

Landing page em React, TypeScript e Vite para portfólio pessoal ou profissional. A branch `master` é preparada para ser pública e reutilizável, sem dados pessoais versionados.

## Autor

Criado por Carlos Souza (`275734170+carlosrodrigosouza@users.noreply.github.com`).

## Como O Projeto Funciona

O conteúdo da landing vem de um arquivo local de configuração:

```text
src/siteConfig.ts
```

Esse arquivo não vai para o repositório. A branch `master` inclui apenas o modelo:

```text
src/siteConfig.example.ts
```

Se o site for executado sem `src/siteConfig.ts`, ou com campos obrigatórios em branco, a aplicação exibe uma tela informando quais dados ainda precisam ser preenchidos.

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm install
```

Crie sua configuração local copiando o exemplo:

```bash
cp src/siteConfig.example.ts src/siteConfig.ts
```

No Windows PowerShell:

```powershell
Copy-Item src/siteConfig.example.ts src/siteConfig.ts
```

Depois preencha `src/siteConfig.ts` com seus dados.

## Rodar Localmente

```bash
npm run dev
```

Abra `http://localhost:5173`.

## Configuração

Preencha em `src/siteConfig.ts`:

- `theme`: tema visual (`default`, `bootstrap` ou `minimal`)
- `brand`: nome, nome curto e descrição profissional
- `hero`: título, subtítulo e chamadas principais
- `stats`: destaques rápidos
- `techStack`: tecnologias
- `sections`: textos gerais das seções
- `services`: serviços oferecidos
- `projects`: linhas de entrega ou projetos
- `process`: etapas de trabalho
- `consulting`: bloco de consultoria
- `contact.whatsappParts`: partes do número do WhatsApp
- `contact.whatsappMessage`: mensagem inicial do WhatsApp
- `footer`: texto final

O projeto não exibe e-mail nem telefone em texto público. O contato é feito por um botão de WhatsApp montado a partir da configuração local.

## Validação De Configuração

A aplicação valida a configuração antes de renderizar a landing. Se algo estiver faltando, será exibida uma tela com a lista dos campos pendentes, por exemplo:

```text
brand.name
hero.title
contact.whatsappParts
```

Isso evita tela quebrada quando alguém clona o projeto e esquece de criar ou preencher `src/siteConfig.ts`.

## Console Interativo

A landing inclui um console visual integrado. Comandos disponíveis:

```text
help
stack
servicos
projetos
contato
whatsapp
clear
exit
```

O console não executa comandos reais; ele apenas mostra respostas baseadas no arquivo de configuração.

## Build De Produção

```bash
npm run build
npm run preview
```

## Branches

- `master`: código público reutilizável, sem informações pessoais.
- branch de deploy: pode conter o build publicado com suas informações pessoais já compiladas.

## Deploy No GitHub Pages

Este projeto já inclui:

- `gh-pages`
- script `deploy` no `package.json`
- `base: './'` no `vite.config.ts`

Para publicar:

```bash
npm run deploy
```

Esse comando cria ou atualiza a branch `gh-pages` com o conteúdo de `dist`.

No GitHub:

- Acesse `Settings` -> `Pages`
- Em `Source`, selecione `Deploy from a branch`
- Em `Branch`, selecione `gh-pages`
- Em `Folder`, selecione `/ (root)`

## Subir Para Um Repositório Novo

Use `master` como branch principal:

```bash
git init
git add .
git commit -m "chore: configuração inicial da landing page"
git branch -M master
git remote add origin https://github.com/SEU_USUARIO/landingpage.git
git push -u origin master
```

## Segurança Dos Dados Pessoais

O arquivo `src/siteConfig.ts` está no `.gitignore` e não deve ser commitado. Antes de publicar alterações na branch `master`, verifique:

```bash
git status --short
git ls-files src/siteConfig.ts
```

O segundo comando não deve retornar nada.

## Personalização Visual

Os estilos principais ficam em:

```text
src/style.css
```

Os componentes principais ficam em:

```text
src/App.tsx
src/components/SiteTerminal.tsx
src/components/ServiceFlipCard.tsx
```
