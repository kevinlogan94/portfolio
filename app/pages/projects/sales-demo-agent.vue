<script setup lang="ts">
type FunnelStageId = 'entry' | 'experience' | 'outcome'
type ArchNodeId
  = | 'chat-panel'
    | 'browser-view'
    | 'conv-svc'
    | 'speak-svc'
    | 'browser-svc'
    | 'elevenlabs'
    | 'browserbase'

interface FunnelBeam {
  key: string
  from: FunnelStageId
  to: FunnelStageId
  color: string
  leftD: string
  centerD: string
  rightD: string
  trapD: string
}

interface ArchCurve {
  key: string
  from: ArchNodeId
  to: ArchNodeId
  color: string
  d: string
}

const GITHUB_URL = 'https://github.com/kevinlogan94/sales-demo-agent'

useSeoMeta({
  title: 'Alex — 24/7 AI Sales Demo Agent',
  ogTitle: 'Alex — 24/7 AI Sales Demo Agent',
  description: 'Solves the \'schedule a demo\' wall by letting curious visitors jump straight into a live AI product demo.',
  ogDescription: 'Solves the \'schedule a demo\' wall by letting curious visitors jump straight into a live AI product demo.',
  ogImage: '/images/projects/sales-demo-agent/banner.jpg'
})

const BG_CURRENTS = [
  { d: 'M 0 144 H 288 L 336 192 H 768 L 816 144 H 1440', color: '#60a5fa', speed: 'bg-grid-current', delay: '0s' },
  { d: 'M 1440 336 H 1008 L 960 384 H 480 L 432 336 H 0', color: '#3b82f6', speed: 'bg-grid-current-fast', delay: '-1.8s' },
  { d: 'M 0 576 H 384 L 432 528 H 912 L 960 576 H 1440', color: '#93c5fd', speed: 'bg-grid-current-slow', delay: '-3.4s' },
  { d: 'M 1440 768 H 1104 L 1056 720 H 576 L 528 768 H 0', color: '#2563eb', speed: 'bg-grid-current', delay: '-4.2s' },
  { d: 'M 240 0 V 240 L 288 288 V 624 L 240 672 V 900', color: '#60a5fa', speed: 'bg-grid-current-slow', delay: '-1.1s' },
  { d: 'M 672 900 V 624 L 720 576 V 240 L 672 192 V 0', color: '#3b82f6', speed: 'bg-grid-current', delay: '-2.7s' },
  { d: 'M 1152 0 V 288 L 1104 336 V 672 L 1152 720 V 900', color: '#93c5fd', speed: 'bg-grid-current-fast', delay: '-5.1s' }
] as const

const FUNNEL_EDGES: ReadonlyArray<{ from: FunnelStageId, to: FunnelStageId, oldColor: string, newColor: string }> = [
  { from: 'entry', to: 'experience', oldColor: '#fb7185', newColor: '#60a5fa' },
  { from: 'experience', to: 'outcome', oldColor: '#f43f5e', newColor: '#3b82f6' }
]

const FUNNEL_ORDER: readonly FunnelStageId[] = ['entry', 'experience', 'outcome']

const FUNNEL_STAGES: Record<FunnelStageId, {
  step: string
  oldTitle: string
  oldSub: string
  oldBadge: string
  oldWidth: string
  newTitle: string
  newSub: string
  newBadge: string
  newWidth: string
  talkTrack: string
}> = {
  entry: {
    step: 'STEP 01',
    oldTitle: '"Schedule a Demo" Form',
    oldSub: 'Email back-and-forth · 3-5 day wait',
    oldBadge: 'FRICTION WALL',
    oldWidth: 'w-full',
    newTitle: 'Instant Live Access',
    newSub: 'Enter work email · Launches in 10s',
    newBadge: '0 WAIT TIME',
    newWidth: 'w-full',
    talkTrack: 'Normally a visitor hits a \'Schedule a Demo\' button and leaves because they don\'t want to email someone just to set up a time. With Alex, they enter their email and are inside the live product in 10 seconds.'
  },
  experience: {
    step: 'STEP 02',
    oldTitle: '30-Min Sales Discovery Call',
    oldSub: 'Pressured by a salesperson on Zoom',
    oldBadge: 'HIGH PRESSURE',
    oldWidth: 'w-full md:w-[74%]',
    newTitle: '3-Min Pressure-Free AI Tour',
    newSub: 'Alex drives the live app · Ask anything',
    newBadge: '0 SALES PRESSURE',
    newWidth: 'w-full md:w-[88%]',
    talkTrack: 'Instead of being trapped on a 30-minute call getting pitched by a rep, buyers explore a live workspace with Alex at zero pressure and ask honest questions.'
  },
  outcome: {
    step: 'STEP 03',
    oldTitle: 'Most Visitors Drop Off',
    oldSub: 'Lost pipeline & cold AE calendar burn',
    oldBadge: 'LOST LEADS',
    oldWidth: 'w-full md:w-[46%]',
    newTitle: 'Pre-Sold Buyer + Warm AE Handoff',
    newSub: 'Session activity + questions captured for Sales',
    newBadge: 'MORE CONVERSIONS',
    newWidth: 'w-full md:w-[76%]',
    talkTrack: 'Removing sales pressure captures far more leads and hands AEs buyers who already know the product.'
  }
}

const ARCH_EDGES: ReadonlyArray<{ from: ArchNodeId, to: ArchNodeId, color: string }> = [
  { from: 'chat-panel', to: 'conv-svc', color: '#60a5fa' },
  { from: 'chat-panel', to: 'speak-svc', color: '#60a5fa' },
  { from: 'chat-panel', to: 'browser-svc', color: '#3b82f6' },
  { from: 'browser-view', to: 'browser-svc', color: '#60a5fa' },
  { from: 'conv-svc', to: 'elevenlabs', color: '#a855f7' },
  { from: 'speak-svc', to: 'elevenlabs', color: '#a855f7' },
  { from: 'browser-svc', to: 'browserbase', color: '#3b82f6' }
]

const TOOL_LOOP_NODES = new Set<ArchNodeId>(['elevenlabs', 'conv-svc', 'chat-panel', 'browser-svc', 'browserbase'])

const ARCH_COPY: Record<ArchNodeId, { title: string, detail: string }> = {
  'chat-panel': {
    title: 'AI Chat Panel (Client · Tool Bridge)',
    detail: 'Bridges ElevenLabs and BrowserBase: waits for active TTS to finish, receives searchGoogle() tool calls over WebSocket, posts to Browser Service (/api/browser), and returns scraped SERP results back to the LLM.'
  },
  'browser-view': {
    title: 'Google Search Browser View (Client)',
    detail: 'Embeds the live 1280x800 watch-only BrowserBase stream orchestrated by Browser Service so visitors watch Alex type and search hands-free.'
  },
  'conv-svc': {
    title: 'Conversation Service (Internal Server · /api/conversation)',
    detail: 'Mints signed ElevenLabs WebSocket URLs so the client establishes a bi-directional session where the LLM sends text and invokes searchGoogle().'
  },
  'speak-svc': {
    title: 'Speak Service (Internal Server · /api/speak)',
    detail: 'Sends Alex\'s clean reply text to ElevenLabs Flash v2.5 TTS and streams MP3 audio back to the serialized client Web Audio queue.'
  },
  'browser-svc': {
    title: 'Browser Service (Internal Server · /api/browser)',
    detail: 'Connects the LLM to BrowserBase: executes searchGoogle() via Playwright CDP, moves the smooth cursor to the search box, scrapes live SERP titles and snippets, and returns them to Alex.'
  },
  'elevenlabs': {
    title: 'ElevenLabs LLM ↔ BrowserBase Loop',
    detail: 'When Alex runs a search, the LLM calls searchGoogle() -> AI Chat Panel -> Browser Service -> BrowserBase types into Google and scrapes #search h3 titles & .VwiC3b snippets -> returns live SERP text to the LLM.'
  },
  'browserbase': {
    title: 'BrowserBase ↔ ElevenLabs LLM Loop',
    detail: 'Playwright drives google.com in cloud Chromium with a smooth persistent cursor, scrapes the top 5 visible SERP titles and snippets, and sends that snapshot back to the ElevenLabs LLM.'
  }
}

const CLIENT_NODES: ReadonlyArray<{ id: ArchNodeId, title: string, badge: string, desc: string }> = [
  { id: 'chat-panel', title: 'AI Chat Panel', badge: 'Voice + Text', desc: 'Starter prompts, live transcript, and serialized Web Audio MP3 playback.' },
  { id: 'browser-view', title: 'Google Search Browser View', badge: 'Watch-Only', desc: 'Live 1280x800 stream where Alex types into google.com hands-free.' }
]

const SERVER_NODES: ReadonlyArray<{ id: ArchNodeId, title: string, badge: string, desc: string }> = [
  { id: 'conv-svc', title: 'Conversation Service', badge: '/api/conversation', desc: 'Mints signed WebSocket URLs so the client connects securely.' },
  { id: 'speak-svc', title: 'Speak Service', badge: '/api/speak', desc: 'Streams low-latency MP3 speech for Alex\'s clean replies.' },
  { id: 'browser-svc', title: 'Browser Service', badge: '/api/browser', desc: 'Playwright CDP typing, smooth cursor movement, and live SERP scraping.' }
]

const ELEVENLABS_CHIPS = ['Agent Persona', 'Voice Model', 'Large Language Model', 'searchGoogle Tool'] as const

const activeStage = ref<FunnelStageId | null>('outcome')
const oldCanvasRef = ref<HTMLDivElement | null>(null)
const newCanvasRef = ref<HTMLDivElement | null>(null)
const oldRefs = reactive<Partial<Record<FunnelStageId, HTMLButtonElement | null>>>({})
const newRefs = reactive<Partial<Record<FunnelStageId, HTMLButtonElement | null>>>({})
const oldBeams = ref<FunnelBeam[]>([])
const newBeams = ref<FunnelBeam[]>([])

const activeNode = ref<ArchNodeId | null>('browserbase')
const archCanvasRef = ref<HTMLDivElement | null>(null)
const archNodeRefs = reactive<Partial<Record<ArchNodeId, HTMLButtonElement | null>>>({})
const archCurves = ref<ArchCurve[]>([])

function buildFunnelBeams(
  container: HTMLDivElement | null,
  refs: Partial<Record<FunnelStageId, HTMLButtonElement | null>>,
  side: 'old' | 'new'
): FunnelBeam[] {
  if (!container) return []
  const cRect = container.getBoundingClientRect()
  if (!cRect.width) return []
  const list: FunnelBeam[] = []
  for (const edge of FUNNEL_EDGES) {
    const fromEl = refs[edge.from]
    const toEl = refs[edge.to]
    if (!fromEl || !toEl) continue
    const a = fromEl.getBoundingClientRect()
    const b = toEl.getBoundingClientRect()

    const aLeft = Math.round(a.left - cRect.left + 16)
    const aRight = Math.round(a.right - cRect.left - 16)
    const aCenter = Math.round((aLeft + aRight) / 2)
    const y1 = Math.round(a.bottom - cRect.top)

    const bLeft = Math.round(b.left - cRect.left + 16)
    const bRight = Math.round(b.right - cRect.left - 16)
    const bCenter = Math.round((bLeft + bRight) / 2)
    const y2 = Math.round(b.top - cRect.top)
    const dy = Math.round(Math.abs(y2 - y1) * 0.5)

    list.push({
      key: `${side}-${edge.from}-${edge.to}`,
      from: edge.from,
      to: edge.to,
      color: side === 'old' ? edge.oldColor : edge.newColor,
      leftD: `M ${aLeft} ${y1} C ${aLeft} ${y1 + dy}, ${bLeft} ${y2 - dy}, ${bLeft} ${y2}`,
      centerD: `M ${aCenter} ${y1} L ${bCenter} ${y2}`,
      rightD: `M ${aRight} ${y1} C ${aRight} ${y1 + dy}, ${bRight} ${y2 - dy}, ${bRight} ${y2}`,
      trapD: `M ${aLeft} ${y1} L ${aRight} ${y1} L ${bRight} ${y2} L ${bLeft} ${y2} Z`
    })
  }
  return list
}

function buildArchCurves(): ArchCurve[] {
  const el = archCanvasRef.value
  if (!el) return []
  const cRect = el.getBoundingClientRect()
  if (!cRect.width) return []
  const next: ArchCurve[] = []
  for (const edge of ARCH_EDGES) {
    const fromEl = archNodeRefs[edge.from]
    const toEl = archNodeRefs[edge.to]
    if (!fromEl || !toEl) continue
    const a = fromEl.getBoundingClientRect()
    const b = toEl.getBoundingClientRect()
    const x1 = Math.round(a.left - cRect.left + a.width / 2)
    const y1 = Math.round(a.bottom - cRect.top)
    const x2 = Math.round(b.left - cRect.left + b.width / 2)
    const y2 = Math.round(b.top - cRect.top)
    const dy = Math.round(Math.abs(y2 - y1) * 0.5)
    next.push({
      key: `${edge.from}-${edge.to}`,
      from: edge.from,
      to: edge.to,
      color: edge.color,
      d: `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`
    })
  }
  return next
}

function measureAll() {
  oldBeams.value = buildFunnelBeams(oldCanvasRef.value, oldRefs, 'old')
  newBeams.value = buildFunnelBeams(newCanvasRef.value, newRefs, 'new')
  archCurves.value = buildArchCurves()
}

onMounted(() => {
  measureAll()
  const ro = new ResizeObserver(measureAll)
  if (oldCanvasRef.value) ro.observe(oldCanvasRef.value)
  if (newCanvasRef.value) ro.observe(newCanvasRef.value)
  if (archCanvasRef.value) ro.observe(archCanvasRef.value)
  window.addEventListener('resize', measureAll)
  onUnmounted(() => {
    ro.disconnect()
    window.removeEventListener('resize', measureAll)
  })
})

function isBeamHot(from: FunnelStageId, to: FunnelStageId) {
  return activeStage.value !== null && (activeStage.value === from || activeStage.value === to)
}

const funnelInfo = computed(() => (activeStage.value ? FUNNEL_STAGES[activeStage.value] : null))
const inToolLoop = computed(() => activeNode.value === 'elevenlabs' || activeNode.value === 'browserbase')
const archInfo = computed(() => (activeNode.value ? ARCH_COPY[activeNode.value] : null))

function isEdgeHighlighted(from: ArchNodeId, to: ArchNodeId) {
  if (!activeNode.value) return false
  if (inToolLoop.value && ((from === 'conv-svc' && to === 'elevenlabs') || (from === 'chat-panel' && to === 'conv-svc') || (from === 'chat-panel' && to === 'browser-svc') || (from === 'browser-svc' && to === 'browserbase'))) {
    return true
  }
  return from === activeNode.value || to === activeNode.value
}

function isNeighbor(id: ArchNodeId) {
  if (!activeNode.value) return false
  if (inToolLoop.value && TOOL_LOOP_NODES.has(id)) return true
  return ARCH_EDGES.some(e => (e.from === activeNode.value && e.to === id) || (e.to === activeNode.value && e.from === id))
}

function nodeStateClass(id: ArchNodeId, focusTone: string) {
  if (!activeNode.value) return 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-white/15 dark:bg-neutral-900/90 dark:hover:border-white/35'
  if (activeNode.value === id) return `-translate-y-0.5 ${focusTone}`
  if (isNeighbor(id)) return 'border-blue-500/50 bg-blue-50/50 dark:border-blue-400/50 dark:bg-neutral-900/95'
  return 'border-neutral-200 bg-white/60 opacity-35 dark:border-white/10 dark:bg-neutral-900/60 dark:opacity-30'
}
</script>

<template>
  <div class="demo-hero-surface relative z-0 -mx-4 -mt-14 flex flex-col pt-14 text-neutral-900 sm:-mx-6 lg:-mx-8 dark:text-white">
    <!-- Hero -->
    <div class="relative z-10 flex min-h-[80dvh] flex-col justify-between overflow-hidden border-b border-neutral-200 dark:border-white/10">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          class="h-full w-full"
        >
          <defs>
            <filter
              id="bg-current-glow-hero"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur
                stdDeviation="3.5"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            v-for="(c, idx) in BG_CURRENTS"
            :key="idx"
          >
            <path
              :d="c.d"
              fill="none"
              :stroke="c.color"
              stroke-opacity="0.12"
              stroke-width="1"
              stroke-dasharray="4 4"
            />
            <path
              :d="c.d"
              pathLength="100"
              fill="none"
              :stroke="c.color"
              stroke-opacity="0.65"
              stroke-width="2"
              stroke-linecap="round"
              filter="url(#bg-current-glow-hero)"
              :style="{ animationDelay: c.delay }"
              :class="c.speed"
            />
          </g>
        </svg>
      </div>

      <section class="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <UBadge
          color="warning"
          variant="subtle"
          size="md"
          icon="i-lucide-trophy"
          label="Winner · Best Agent, Fastbreak AI Hackathon"
          class="mb-6 bg-amber-100/90 text-amber-900 ring-amber-400/60 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/25"
        />

        <h1 class="text-5xl font-bold tracking-tight text-balance text-neutral-900 sm:text-7xl dark:text-white">
          Meet <span class="font-serif font-normal italic text-blue-600 dark:text-blue-400">Alex</span>.
          <span class="mt-2 block text-3xl font-semibold text-neutral-700 sm:text-5xl dark:text-neutral-200">
            The 24/7 Sales Demo Agent.
          </span>
        </h1>

        <p class="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
          Accelerate conversions and capture leads like never before.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <UButton
            :to="GITHUB_URL"
            target="_blank"
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
            label="View on GitHub"
            class="rounded-full"
          />
        </div>
      </section>

      <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center pb-8">
        <a
          href="#why-ai-demos"
          class="inline-flex flex-col items-center gap-2 font-mono text-xs tracking-wider text-neutral-500 uppercase transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <span>Scroll down</span>
          <UIcon
            name="i-lucide-arrow-down"
            class="size-4 animate-bounce"
          />
        </a>
      </div>
    </div>

    <!-- Section 01: Value Funnel -->
    <section
      id="why-ai-demos"
      class="relative z-10 scroll-mt-6 overflow-hidden border-t border-neutral-200 py-16 dark:border-white/10"
    >
      <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="space-y-1.5">
            <p class="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
              01 · Why AI Sales Demos Convert
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Remove &ldquo;Schedule a Demo&rdquo; pressure and convert more buyers
            </h2>
            <p class="max-w-xl text-sm text-neutral-600 dark:text-neutral-300">
              Replace calendar walls and sales call pressure with an instant, watch-only AI product tour.
            </p>
          </div>
        </div>

        <div
          class="mt-8 overflow-hidden rounded-2xl border border-blue-500/20 bg-white/85 p-5 text-neutral-900 shadow-xl backdrop-blur-sm sm:p-7 dark:border-blue-400/20 dark:bg-neutral-950/80 dark:text-white"
          @mouseleave="activeStage = null"
        >
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Old Way -->
            <div class="flex flex-col rounded-xl border border-rose-500/25 bg-rose-50/50 p-4 dark:bg-neutral-900/60">
              <div class="mb-4 flex items-center justify-between gap-2 border-b border-neutral-200 pb-3 dark:border-white/10">
                <div class="flex items-center gap-2">
                  <span class="flex size-6 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/15 text-rose-600 dark:border-rose-400/40 dark:bg-rose-500/20 dark:text-rose-300">
                    <UIcon
                      name="i-lucide-x"
                      class="size-3.5"
                    />
                  </span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">
                    Old Way · &ldquo;Schedule a Demo&rdquo;
                  </span>
                </div>
                <span class="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-rose-700 uppercase dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200">
                  High Drop-Off
                </span>
              </div>

              <div
                ref="oldCanvasRef"
                class="relative flex flex-1 flex-col items-center gap-5"
              >
                <svg
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible md:block"
                >
                  <g
                    v-for="b in oldBeams"
                    :key="b.key"
                  >
                    <path
                      :d="b.trapD"
                      :fill="b.color"
                      class="transition-opacity duration-200"
                      :class="isBeamHot(b.from, b.to) ? 'opacity-15' : activeStage !== null ? 'opacity-[0.02]' : 'opacity-[0.08]'"
                    />
                    <template
                      v-for="(d, idx) in [b.leftD, b.centerD, b.rightD]"
                      :key="idx"
                    >
                      <path
                        :d="d"
                        fill="none"
                        :stroke="isBeamHot(b.from, b.to) ? 'rgba(59,130,246,0.35)' : 'rgba(163,163,163,0.28)'"
                        stroke-width="1.5"
                        :stroke-dasharray="isBeamHot(b.from, b.to) ? undefined : '4 4'"
                        class="transition-opacity duration-200"
                        :class="activeStage !== null && !isBeamHot(b.from, b.to) ? 'opacity-15' : 'opacity-100'"
                      />
                      <path
                        :d="d"
                        pathLength="100"
                        fill="none"
                        :stroke="b.color"
                        :stroke-width="isBeamHot(b.from, b.to) ? 3 : 2.2"
                        stroke-linecap="round"
                        :data-hot="isBeamHot(b.from, b.to) ? 'true' : 'false'"
                        class="arch-beam-line transition-opacity duration-200"
                        :class="isBeamHot(b.from, b.to) ? 'opacity-100' : activeStage !== null ? 'opacity-15' : 'opacity-65'"
                      />
                    </template>
                  </g>
                </svg>

                <button
                  v-for="id in FUNNEL_ORDER"
                  :key="`old-${id}`"
                  :ref="(el) => { oldRefs[id] = el as HTMLButtonElement | null }"
                  type="button"
                  class="relative z-20 flex flex-col gap-1.5 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="[
                    FUNNEL_STAGES[id].oldWidth,
                    activeStage === id
                      ? '-translate-y-0.5 border-rose-500 bg-rose-50 shadow-[0_0_24px_-6px_rgba(244,63,94,0.25)] dark:border-rose-400 dark:bg-rose-950/55 dark:shadow-[0_0_24px_-6px_rgba(244,63,94,0.45)]'
                      : activeStage !== null
                        ? 'border-neutral-200 bg-white/60 opacity-45 dark:border-white/10 dark:bg-neutral-900/50 dark:opacity-40'
                        : 'border-neutral-200 bg-white hover:border-rose-400/60 dark:border-white/15 dark:bg-neutral-900/85 dark:hover:border-rose-400/50'
                  ]"
                  @mouseenter="activeStage = id"
                  @focus="activeStage = id"
                  @click="activeStage = id"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-rose-600 dark:text-rose-300">
                      <UIcon
                        name="i-lucide-x"
                        class="size-3.5 shrink-0 text-rose-500 dark:text-rose-400"
                      />
                      {{ FUNNEL_STAGES[id].step }}
                    </span>
                    <span class="rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200">
                      {{ FUNNEL_STAGES[id].oldBadge }}
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900 dark:text-white">
                    {{ FUNNEL_STAGES[id].oldTitle }}
                  </p>
                  <p class="font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                    {{ FUNNEL_STAGES[id].oldSub }}
                  </p>
                </button>
              </div>
            </div>

            <!-- New Way -->
            <div class="flex flex-col rounded-xl border border-blue-500/25 bg-blue-50/50 p-4 dark:border-blue-400/30 dark:bg-neutral-900/60">
              <div class="mb-4 flex items-center justify-between gap-2 border-b border-neutral-200 pb-3 dark:border-white/10">
                <div class="flex items-center gap-2">
                  <span class="flex size-6 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15 text-blue-600 dark:border-blue-400/40 dark:bg-blue-500/20 dark:text-blue-300">
                    <UIcon
                      name="i-lucide-check"
                      class="size-3.5"
                    />
                  </span>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">
                    New Way · AI Sales Demo Agent
                  </span>
                </div>
                <span class="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700 uppercase dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-200">
                  Proven Enterprise Pattern
                </span>
              </div>

              <div
                ref="newCanvasRef"
                class="relative flex flex-1 flex-col items-center gap-5"
              >
                <svg
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible md:block"
                >
                  <g
                    v-for="b in newBeams"
                    :key="b.key"
                  >
                    <path
                      :d="b.trapD"
                      :fill="b.color"
                      class="transition-opacity duration-200"
                      :class="isBeamHot(b.from, b.to) ? 'opacity-15' : activeStage !== null ? 'opacity-[0.02]' : 'opacity-[0.08]'"
                    />
                    <template
                      v-for="(d, idx) in [b.leftD, b.centerD, b.rightD]"
                      :key="idx"
                    >
                      <path
                        :d="d"
                        fill="none"
                        :stroke="isBeamHot(b.from, b.to) ? 'rgba(59,130,246,0.35)' : 'rgba(163,163,163,0.28)'"
                        stroke-width="1.5"
                        :stroke-dasharray="isBeamHot(b.from, b.to) ? undefined : '4 4'"
                        class="transition-opacity duration-200"
                        :class="activeStage !== null && !isBeamHot(b.from, b.to) ? 'opacity-15' : 'opacity-100'"
                      />
                      <path
                        :d="d"
                        pathLength="100"
                        fill="none"
                        :stroke="b.color"
                        :stroke-width="isBeamHot(b.from, b.to) ? 3 : 2.2"
                        stroke-linecap="round"
                        :data-hot="isBeamHot(b.from, b.to) ? 'true' : 'false'"
                        class="arch-beam-line transition-opacity duration-200"
                        :class="isBeamHot(b.from, b.to) ? 'opacity-100' : activeStage !== null ? 'opacity-15' : 'opacity-65'"
                      />
                    </template>
                  </g>
                </svg>

                <button
                  v-for="id in FUNNEL_ORDER"
                  :key="`new-${id}`"
                  :ref="(el) => { newRefs[id] = el as HTMLButtonElement | null }"
                  type="button"
                  class="relative z-20 flex flex-col gap-1.5 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="[
                    FUNNEL_STAGES[id].newWidth,
                    activeStage === id
                      ? '-translate-y-0.5 border-blue-500 bg-blue-50 shadow-[0_0_24px_-6px_rgba(59,130,246,0.25)] dark:border-blue-400 dark:bg-blue-950/55 dark:shadow-[0_0_24px_-6px_rgba(59,130,246,0.45)]'
                      : activeStage !== null
                        ? 'border-neutral-200 bg-white/60 opacity-45 dark:border-white/10 dark:bg-neutral-900/50 dark:opacity-40'
                        : 'border-neutral-200 bg-white hover:border-blue-400/60 dark:border-white/15 dark:bg-neutral-900/85 dark:hover:border-blue-400/50'
                  ]"
                  @mouseenter="activeStage = id"
                  @focus="activeStage = id"
                  @click="activeStage = id"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-300">
                      <UIcon
                        name="i-lucide-check"
                        class="size-3.5 shrink-0 text-blue-500 dark:text-blue-400"
                      />
                      {{ FUNNEL_STAGES[id].step }}
                    </span>
                    <span class="rounded border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/15 dark:text-blue-200">
                      {{ FUNNEL_STAGES[id].newBadge }}
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900 dark:text-white">
                    {{ FUNNEL_STAGES[id].newTitle }}
                  </p>
                  <p class="font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                    {{ FUNNEL_STAGES[id].newSub }}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-5 rounded-xl border border-blue-500/20 bg-neutral-50 px-4 py-3 text-xs leading-relaxed text-neutral-600 dark:border-blue-400/25 dark:bg-neutral-900/80 dark:text-neutral-300">
            <strong class="text-neutral-900 dark:text-white">
              {{ funnelInfo ? `${funnelInfo.step} Comparison: ` : '20-Second Takeaway: ' }}
            </strong>
            <span>
              {{ funnelInfo ? funnelInfo.talkTrack : "Hover any step to compare both funnels: replacing the 'Schedule a Demo' wall with a zero-pressure AI product tour converts far more buyers." }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: System Architecture -->
    <section
      id="architecture"
      class="relative z-10 scroll-mt-6 overflow-hidden border-t border-neutral-200 py-16 dark:border-white/10"
    >
      <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="space-y-1.5">
            <p class="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
              02 · System Architecture
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              How the AI Sales Demo Agent works
            </h2>
            <p class="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              Hover or click any component across the Client, Internal Server, and External Cloud Services tiers to trace live connections.
            </p>
          </div>
          <UButton
            :to="GITHUB_URL"
            target="_blank"
            size="sm"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
            label="Explore Source"
            class="rounded-full"
          />
        </div>

        <div class="mt-8 overflow-hidden rounded-2xl border border-blue-500/20 bg-white/85 p-5 text-neutral-900 shadow-xl backdrop-blur-sm sm:p-7 dark:border-blue-400/20 dark:bg-neutral-950/80 dark:text-white">
          <div
            ref="archCanvasRef"
            class="relative flex flex-col gap-7"
            @mouseleave="activeNode = null"
          >
            <svg
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible md:block"
            >
              <g
                v-for="c in archCurves"
                :key="c.key"
              >
                <path
                  :d="c.d"
                  fill="none"
                  :stroke="isEdgeHighlighted(c.from, c.to) ? 'rgba(59,130,246,0.4)' : 'rgba(163,163,163,0.28)'"
                  stroke-width="1.5"
                  :stroke-dasharray="isEdgeHighlighted(c.from, c.to) ? undefined : '4 4'"
                  class="transition-opacity duration-200"
                  :class="activeNode !== null && !isEdgeHighlighted(c.from, c.to) ? 'opacity-10' : 'opacity-100'"
                />
                <path
                  :d="c.d"
                  pathLength="100"
                  fill="none"
                  :stroke="c.color"
                  :stroke-width="isEdgeHighlighted(c.from, c.to) ? 3 : 2.2"
                  stroke-linecap="round"
                  :data-hot="isEdgeHighlighted(c.from, c.to) ? 'true' : 'false'"
                  class="arch-beam-line transition-opacity duration-200"
                  :class="isEdgeHighlighted(c.from, c.to) ? 'opacity-100' : activeNode !== null ? 'opacity-10' : 'opacity-55'"
                />
              </g>
            </svg>

            <!-- Tier 1: Client -->
            <div class="relative z-20 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 dark:border-white/15 dark:bg-neutral-950/55">
              <div class="mb-3 flex items-center justify-between">
                <span class="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-300">
                  <span class="size-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                  Client
                </span>
                <span class="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  Visitor Browser · React 19 + Web Audio
                </span>
              </div>
              <div class="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  v-for="node in CLIENT_NODES"
                  :key="node.id"
                  :ref="(el) => { archNodeRefs[node.id] = el as HTMLButtonElement | null }"
                  type="button"
                  class="flex flex-col gap-2 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="nodeStateClass(node.id, 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/50')"
                  @mouseenter="activeNode = node.id"
                  @focus="activeNode = node.id"
                  @click="activeNode = node.id"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ node.title }}</span>
                    <span class="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-blue-700 dark:bg-white/10 dark:text-blue-300">
                      {{ node.badge }}
                    </span>
                  </div>
                  <p class="text-xs text-neutral-600 dark:text-neutral-300">
                    {{ node.desc }}
                  </p>
                </button>
              </div>
            </div>

            <!-- Tier 2: Internal Server -->
            <div class="relative z-20 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 dark:border-white/15 dark:bg-neutral-950/55">
              <div class="mb-3 flex items-center justify-between">
                <span class="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-300">
                  <span class="size-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                  Internal Server
                </span>
                <span class="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  Next.js 16 App Router API Services
                </span>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <button
                  v-for="node in SERVER_NODES"
                  :key="node.id"
                  :ref="(el) => { archNodeRefs[node.id] = el as HTMLButtonElement | null }"
                  type="button"
                  class="flex flex-col gap-2 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="nodeStateClass(node.id, 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/45')"
                  @mouseenter="activeNode = node.id"
                  @focus="activeNode = node.id"
                  @click="activeNode = node.id"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ node.title }}</span>
                    <span class="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-blue-700 dark:bg-white/10 dark:text-blue-300">
                      {{ node.badge }}
                    </span>
                  </div>
                  <p class="text-xs text-neutral-600 dark:text-neutral-300">
                    {{ node.desc }}
                  </p>
                </button>
              </div>
            </div>

            <!-- Tier 3: External Cloud Services -->
            <div class="relative z-20 rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 dark:border-white/15 dark:bg-neutral-950/55">
              <div class="mb-3 flex items-center justify-between">
                <span class="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-purple-600 uppercase dark:text-purple-300">
                  <span class="size-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                  External Cloud Services
                </span>
                <span class="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  Conversational AI &amp; Cloud Chromium
                </span>
              </div>
              <div class="mx-auto grid max-w-3xl grid-cols-1 items-start gap-4 md:grid-cols-2">
                <button
                  :ref="(el) => { archNodeRefs.elevenlabs = el as HTMLButtonElement | null }"
                  type="button"
                  class="flex flex-col gap-2.5 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="nodeStateClass('elevenlabs', 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950/45')"
                  @mouseenter="activeNode = 'elevenlabs'"
                  @focus="activeNode = 'elevenlabs'"
                  @click="activeNode = 'elevenlabs'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white">ElevenLabs</span>
                    <span
                      class="inline-flex items-center gap-1.5 rounded bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-purple-700 dark:bg-white/10 dark:text-purple-300"
                      :class="{ 'demo-speaking': activeNode === 'elevenlabs' }"
                    >
                      <span
                        class="demo-wave"
                        aria-hidden="true"
                      >
                        <i /><i /><i /><i />
                      </span>
                      ConvAI
                    </span>
                  </div>
                  <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-white/10 dark:bg-neutral-950/75">
                    <div class="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
                      <span>Demo Agent (&ldquo;Alex&rdquo;)</span>
                      <span class="font-mono text-[11px] text-purple-600 dark:text-purple-300">Flash v2.5</span>
                    </div>
                    <div class="mt-2 grid grid-cols-2 gap-1.5 text-center font-mono text-[11px]">
                      <span
                        v-for="chip in ELEVENLABS_CHIPS"
                        :key="chip"
                        class="rounded border px-2 py-1 transition-colors"
                        :class="activeNode === 'elevenlabs' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:border-purple-400 dark:bg-purple-500/30 dark:text-white' : 'border-purple-500/25 bg-purple-500/10 text-purple-700 dark:border-purple-400/25 dark:text-purple-200'"
                      >
                        {{ chip }}
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  :ref="(el) => { archNodeRefs.browserbase = el as HTMLButtonElement | null }"
                  type="button"
                  class="flex flex-col gap-2.5 rounded-xl border p-3.5 text-left transition-all duration-200"
                  :class="nodeStateClass('browserbase', 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/50')"
                  @mouseenter="activeNode = 'browserbase'"
                  @focus="activeNode = 'browserbase'"
                  @click="activeNode = 'browserbase'"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-sm font-semibold text-neutral-900 dark:text-white">BrowserBase</span>
                    <span class="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-blue-700 dark:bg-white/10 dark:text-blue-300">
                      Chromium CDP
                    </span>
                  </div>
                  <div class="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-white/10 dark:bg-neutral-950/75">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-semibold text-neutral-900 dark:text-white">google.com</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="transition-transform duration-300"
                        :class="activeNode === 'browserbase' ? '-translate-x-2 -translate-y-1' : 'translate-x-1 translate-y-0.5'"
                      >
                        <path
                          d="M3 2L3 19L7.8 14.4L11.2 21.5L13.9 20.2L10.5 13.1L17 13.1L3 2Z"
                          fill="#60a5fa"
                          stroke="#ffffff"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>
                    <div class="flex flex-wrap gap-1 font-mono text-[11px]">
                      <span class="rounded bg-neutral-200/70 px-1.5 py-0.5 text-neutral-700 dark:bg-white/10 dark:text-neutral-300">1280x800</span>
                      <span
                        class="rounded px-1.5 py-0.5 transition-colors"
                        :class="activeNode === 'browserbase' ? 'bg-blue-500/20 text-blue-900 dark:bg-blue-500/35 dark:text-white' : 'bg-neutral-200/70 text-neutral-700 dark:bg-white/10 dark:text-neutral-300'"
                      >
                        SERP Titles
                      </span>
                      <span class="rounded bg-neutral-200/70 px-1.5 py-0.5 text-neutral-700 dark:bg-white/10 dark:text-neutral-300">Snippets</span>
                    </div>
                    <p class="font-mono text-[11px] text-blue-600 dark:text-blue-300">
                      searchGoogle() · live SERP scraping → LLM
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-5 flex flex-col gap-2 rounded-xl border border-blue-500/20 bg-neutral-50 px-4 py-3 text-xs text-neutral-600 dark:border-blue-400/25 dark:bg-neutral-900/80 dark:text-neutral-300">
            <div class="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              <span class="text-blue-600 dark:text-blue-300">LLM ↔ BrowserBase Loop:</span>
              <span class="rounded bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200">
                1. ElevenLabs LLM calls searchGoogle()
              </span>
              <span class="text-neutral-400 dark:text-neutral-500">→</span>
              <span class="rounded bg-blue-500/15 px-2 py-0.5 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                2. AI Chat Panel bridges to Browser Service
              </span>
              <span class="text-neutral-400 dark:text-neutral-500">→</span>
              <span class="rounded bg-blue-500/15 px-2 py-0.5 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                3. BrowserBase scrapes SERP titles &amp; snippets for LLM
              </span>
            </div>
            <div class="min-h-[2.5rem] leading-relaxed">
              <strong class="text-neutral-900 dark:text-white">
                {{ archInfo ? `${archInfo.title}: ` : 'All 3 Tiers Connected: ' }}
              </strong>
              <span>
                {{ archInfo ? archInfo.detail : 'Hover any component in Client, Internal Server, or External Cloud Services to inspect its role and trace live data beams.' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.demo-hero-surface {
  background:
    radial-gradient(1100px circle at 82% 16%, rgba(59, 130, 246, 0.12), transparent 55%),
    radial-gradient(800px circle at 16% 52%, rgba(96, 165, 250, 0.08), transparent 55%),
    radial-gradient(900px circle at 78% 88%, rgba(37, 99, 235, 0.09), transparent 55%),
    linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
}

.dark .demo-hero-surface {
  background:
    radial-gradient(1100px circle at 82% 16%, rgba(59, 130, 246, 0.16), transparent 55%),
    radial-gradient(800px circle at 16% 52%, rgba(96, 165, 250, 0.1), transparent 55%),
    radial-gradient(900px circle at 78% 88%, rgba(37, 99, 235, 0.12), transparent 55%),
    linear-gradient(180deg, #0a0a0a 0%, #171717 100%);
}

.demo-hero-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.dark .demo-hero-surface::before {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
}

@keyframes demo-wave {
  50% {
    transform: scaleY(3.2);
  }
}

.demo-wave {
  display: inline-flex;
  gap: 2px;
  align-items: center;
  height: 14px;
}

.demo-wave i {
  width: 2.5px;
  height: 4px;
  border-radius: 2px;
  background: currentColor;
  transform-origin: center;
}

.demo-speaking .demo-wave i {
  animation: demo-wave 0.75s infinite cubic-bezier(0.22, 1, 0.36, 1);
}

.demo-wave i:nth-child(2) { animation-delay: 0.1s; }
.demo-wave i:nth-child(3) { animation-delay: 0.2s; }
.demo-wave i:nth-child(4) { animation-delay: 0.3s; }

@keyframes arch-beam-flow {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: -100; }
}

.arch-beam-line {
  stroke-dasharray: 18 82;
  animation: arch-beam-flow 2.6s linear infinite;
}

.arch-beam-line[data-hot="true"] {
  stroke-dasharray: 28 72;
  animation-duration: 1.05s;
}

.bg-grid-current {
  stroke-dasharray: 12 88;
  animation: arch-beam-flow 7s linear infinite;
}

.bg-grid-current-fast {
  stroke-dasharray: 16 84;
  animation: arch-beam-flow 5s linear infinite;
}

.bg-grid-current-slow {
  stroke-dasharray: 10 90;
  animation: arch-beam-flow 9.5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .demo-speaking .demo-wave i,
  .arch-beam-line,
  .bg-grid-current,
  .bg-grid-current-fast,
  .bg-grid-current-slow {
    animation: none;
  }
}
</style>
