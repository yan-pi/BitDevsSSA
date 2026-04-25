# Salvador BitDevs

Site Jekyll do grupo Salvador BitDevs — hospeda os links e roteiros dos
seminários socráticos passados e futuros.

## Desenvolvimento

Requer Ruby (3.3+) e Bundler. A versão é fixada via [mise](https://mise.jdx.dev/).

```sh
mise install
bundle install
make preview   # serve em http://localhost:4000
```

## Criando um post

Copie `_posts/_template.md` para `_posts/YYYY-MM-DD-titulo.md` e preencha o
front-matter:

```md
---
layout: post
type: socratic
title: "Nome do encontro"
event_url: "https://event.so/<grupo>/<evento>"
---
```

Marque `published: false` enquanto rascunha; remova ao publicar.

## Configuração do site

Configurações ficam em `_config.yml` e `_data/settings.yml`. Alguns valores
estão duplicados pela forma como Jekyll injeta variáveis — atualize ambos.

## Deploy

`master` é publicada automaticamente em `https://salvadorbitdevs.org` pelo
workflow `.github/workflows/jekyll.yml` (GitHub Pages via Actions).

## Atribuições

Forkado do [jekyll-starter-kit](https://github.com/LeNPaul/jekyll-starter-kit)
do LeNPaul.
