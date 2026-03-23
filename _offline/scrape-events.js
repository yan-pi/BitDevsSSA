const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');
const Turndown = require('turndown');

const turndown = new Turndown();
const LIMIT = 200;
const JSON_PATH = path.resolve(__dirname, 'events.json');
const POSTS_PATH = path.resolve(__dirname, '../_posts');
const MEETUP_GROUP = 'BitDevsSSA';

function makeEventFileName(time, title) {
  const date = new Date(time).toISOString().slice(0, 10);
  const name = title.toLowerCase().replace(/\s/g, '-');
  return `${date}-${name}.md`;
}

async function run() {
  let events = [];
  try {
    events = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    console.log(`Loaded ${events.length} events from ${JSON_PATH}`);
  } catch(err) {
    console.log('Failed to load local events, fetching them from API');
    const res = await fetch(`https://api.meetup.com/${MEETUP_GROUP}/events?&sign=true&photo-host=public&page=${LIMIT}&status=past`);
    events = await res.json();
    fs.writeFileSync(JSON_PATH, JSON.stringify(events, null, 2));
    console.log(`Saved ${events.length} events to ${JSON_PATH}`);
  }

  const results = await Promise.all(events.map(async (e) => {
    if (e.name.indexOf('Socrático') === -1 &&
        e.name.indexOf('Socratic') === -1 &&
        e.name.indexOf('Seminário') === -1) {
      return false;
    }
    if (!e.description) {
      return false;
    }

    const title = e.name.split('(')[0].trim();
    const markdown = turndown.turndown(e.description)
      .replace(/\[masked\]/g, '');

    const contents = `---
layout: post
type: socratic
title: "${title}"
meetup: ${e.link}
---

${markdown}
`;

    const filePath = makeEventFileName(e.time, title);
    await fs.writeFile(path.join(POSTS_PATH, filePath), contents);
    return true;
  }));

  console.log(`Created ${results.filter(r => !!r).length} posts!`);
}

run();
