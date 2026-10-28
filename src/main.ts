import './style.css'
import { MODELS, type Model } from './models'

type Lang = 'ja' | 'en'
const store = localStorage
let lang: Lang = (store.getItem('os-lang') as Lang) || 'ja'
let big = store.getItem('os-big') === '1'
let largeText = store.getItem('os-large') === '1'
let model: Model | null = null
let step = 0

const T = {
  ja: { title: 'おりがみステップ', sub: '定番のおりがみを一歩ずつ', back: 'もどる', next: 'つぎへ', list: '一覧へ', big: '大きいステップ', large: '大きい文字', step: 'ステップ', of: '/', done: 'できた！', again: 'もう一度', lv: ['', 'かんたん', 'ふつう', 'むずかしい'], key: '--- 谷折り　-・- 山折り　→ 折る向き', turn: 'うらがえす' },
  en: { title: 'Origami Steps', sub: 'Classic origami, one step at a time', back: 'Back', next: 'Next', list: 'All models', big: 'Big steps', large: 'Large text', step: 'Step', of: 'of', done: 'Done!', again: 'Start again', lv: ['', 'Easy', 'Medium', 'Harder'], key: '--- valley fold   -·- mountain fold   → fold direction', turn: 'turn over' },
}

const app = document.getElementById('app')!

function svg(d: string, thumb = false): string {
  let out = ''
  for (const raw of d.split(';')) {
    const [k, ...r] = raw.trim().split(' ')
    if (k === 'f' || k === 'b') out += `<polygon points="${r.join(' ')}" class="${k === 'f' ? 'pf' : 'pb'}"/>`
    else if (!thumb && (k === 'v' || k === 'm')) {
      const [a, b] = r; const [x1, y1] = a.split(','); const [x2, y2] = b.split(',')
      out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${k}"/>`
    } else if (!thumb && k === 'a') {
      const [x1, y1] = r[0].split(',').map(Number); const [x2, y2] = r[1].split(',').map(Number)
      const mx = (x1 + x2) / 2 - (y2 - y1) * 0.25, my = (y1 + y2) / 2 + (x2 - x1) * 0.25
      out += `<path d="M${x1},${y1} Q${mx},${my} ${x2},${y2}" class="ar" marker-end="url(#hd)"/>`
    } else if (!thumb && k === 't') {
      out += `<g class="turn"><path d="M80,92 A8,8 0 1 1 94,86" class="ar" marker-end="url(#hd)"/><text x="62" y="99">${T[lang].turn}</text></g>`
    }
  }
  return `<svg viewBox="0 0 100 100" role="img"><defs><marker id="hd" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#6f5b5e"/></marker></defs>${out}</svg>`
}

function bar(): string {
  return `<div class="bar">
    <button data-a="lang" class="pill">${lang === 'ja' ? 'English' : '日本語'}</button>
    <label class="pill"><input type="checkbox" data-a="large" ${largeText ? 'checked' : ''}> ${T[lang].large}</label>
    <label class="pill"><input type="checkbox" data-a="big" ${big ? 'checked' : ''}> ${T[lang].big}</label>
  </div>`
}

function render() {
  document.documentElement.lang = lang
  document.body.classList.toggle('large', largeText)
  document.body.classList.toggle('big', big)
  const t = T[lang]
  if (!model) {
    app.innerHTML = `<header><h1>${t.title}</h1><p>${t.sub}</p></header>${bar()}
      <main class="grid">${MODELS.map(m => `<button class="card" data-m="${m.id}">
        ${svg(m.steps[m.steps.length - 1].d, true)}
        <b>${m[lang]}</b><small>${t.lv[m.level]} · ${m.steps.length} ${lang === 'ja' ? 'ステップ' : 'steps'}</small></button>`).join('')}</main>
      <footer>${lang === 'ja' ? '広告なし・ログインなし・オフラインで使えます' : 'No ads, no login, works offline'}</footer>`
  } else {
    const s = model.steps[step], last = step === model.steps.length - 1
    app.innerHTML = `<header class="row"><button data-a="home" class="pill">← ${t.list}</button><h2>${model[lang]}</h2></header>${bar()}
      <main class="step">
        <div class="dots">${model.steps.map((_, i) => `<span class="${i === step ? 'on' : i < step ? 'past' : ''}"></span>`).join('')}</div>
        <div class="count">${t.step} ${step + 1} ${t.of} ${model.steps.length}</div>
        <div class="dia" data-a="tapnext">${svg(s.d)}</div>
        <p class="say">${s[lang]}</p>
        ${last ? `<p class="done">${t.done}</p>` : ''}
        <p class="key">${t.key}</p>
      </main>
      <nav><button data-a="prev" ${step === 0 ? 'disabled' : ''}>← ${t.back}</button>
      ${last ? `<button data-a="again">${t.again}</button>` : `<button data-a="next" class="go">${t.next} →</button>`}</nav>`
  }
}

app.addEventListener('click', e => {
  const el = (e.target as HTMLElement).closest('[data-a],[data-m]') as HTMLElement | null
  if (!el) return
  const m = el.dataset.m
  if (m) { model = MODELS.find(x => x.id === m) || null; step = 0; render(); scrollTo(0, 0); return }
  switch (el.dataset.a) {
    case 'lang': lang = lang === 'ja' ? 'en' : 'ja'; store.setItem('os-lang', lang); break
    case 'home': model = null; break
    case 'prev': step = Math.max(0, step - 1); break
    case 'next': step++; break
    case 'tapnext': if (big && model && step < model.steps.length - 1) step++; else return; break
    case 'again': step = 0; break
    default: return
  }
  render()
})
app.addEventListener('change', e => {
  const el = e.target as HTMLInputElement
  if (el.dataset.a === 'large') { largeText = el.checked; store.setItem('os-large', largeText ? '1' : '0') }
  if (el.dataset.a === 'big') { big = el.checked; store.setItem('os-big', big ? '1' : '0') }
  render()
})
addEventListener('keydown', e => {
  if (!model) return
  if (e.key === 'ArrowRight' && step < model.steps.length - 1) step++
  else if (e.key === 'ArrowLeft' && step > 0) step--
  else return
  render()
})
render()
