<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { Database, Terminal, BookOpen, Layers, Network, Search, Zap, Flame, Braces, ArrowLeft, TerminalSquare, Hourglass, Settings, Command, Binary, Server, Workflow, Waypoints, Menu, X, Monitor, ShieldCheck, Cpu, Code, GitBranch, BarChart3, Wrench } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let activeSection = 'getting-started';
  let isMobileMenuOpen = false;

  const sections = [
    { id: 'why-mairu', title: 'Why Mairu?', icon: Flame },
    { id: 'getting-started', title: 'Getting Started', icon: TerminalSquare },
    { id: 'configuration', title: 'Configuration & State', icon: Settings },
    { id: 'local-embeddings', title: 'Local Embeddings', icon: Cpu },
    { id: 'internal-schema', title: 'Internal: Data Schema', icon: Server },
    { id: 'core-concepts', title: 'The Three Artifacts', icon: Database },
    { id: 'memory-lifecycle', title: 'Memory Lifecycle', icon: Hourglass },
    { id: 'retrieval', title: 'Hybrid Retrieval Engine', icon: Search },
    { id: 'ast-daemon', title: 'AST Daemon & Parsing', icon: Layers },
    { id: 'context-trees', title: 'Context Trees', icon: Network },
    { id: 'browser-extension', title: 'Browser Extension', icon: Monitor },
    { id: 'interfaces', title: 'Interfaces: MCP, TUI & Bots', icon: Terminal },
    { id: 'scraping-ingestion', title: 'Web Scraping & Integrations', icon: BookOpen },
    { id: 'system-utilities', title: 'System & Docker Utilities', icon: Cpu },
    { id: 'ai-dev-toolkit', title: 'AI-Optimized Dev Toolkit', icon: Code },
    { id: 'shell-integration', title: 'Real-Time Shell Integration', icon: Wrench },
    { id: 'git-helpers', title: 'Git Helpers', icon: GitBranch },
    { id: 'quality-guards', title: 'Quality Guards & Testing', icon: ShieldCheck },
    { id: 'internal-vibe', title: 'Internal: The Vibe Router', icon: Waypoints },
    { id: 'agent-integration', title: 'Native Agent & Integrations', icon: Zap },
    { id: 'advanced-cli', title: 'Advanced CLI Usage', icon: Command },
    { id: 'eval-suite', title: 'Eval & Retrieval Suite', icon: BarChart3 },
    { id: 'build-profiles', title: 'Build Profiles', icon: Cpu },
  ];

  function scrollToSection(id: string) {
    activeSection = id;
    isMobileMenuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onMount(() => {
    const handleScroll = () => {
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top < 250) {
          current = section.id;
        }
      }
      if (current && current !== activeSection) {
        activeSection = current;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="min-h-screen bg-[#060205] text-[#e6e0d8] font-sans flex flex-col selection:bg-[#ff1e56] selection:text-white max-w-[100vw] overflow-x-hidden">
  
  <!-- Navigation -->
  <nav class="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-[#060205]/60 backdrop-blur-xl border-b border-white/5">
    <div class="flex items-center gap-4 md:gap-6">
      <button class="md:hidden text-[#8c7a85] hover:text-white" on:click={() => isMobileMenuOpen = !isMobileMenuOpen} aria-label="Toggle Menu">
        {#if isMobileMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </button>
      <a href="#/" aria-label="Return to Home" class="hidden md:flex text-[#8c7a85] hover:text-[#ff1e56] transition-colors items-center gap-2 text-xs tracking-widest uppercase font-mono group">
        <ArrowLeft size={16} class="group-hover:-translate-x-1 transition-transform" aria-hidden="true" /> Return
      </a>
      <div class="hidden md:block w-[1px] h-6 bg-white/10"></div>
      <div class="flex items-center gap-3">
        <Database class="text-[#ff1e56] fever-warp glitch-hover" size={20} aria-hidden="true" />
        <span class="text-xl font-bold tracking-widest text-white font-serif uppercase glitch-hover">
          MAIRU <span class="text-[#ff1e56] italic lowercase text-sm font-mono ml-2 hidden sm:inline">docs</span>
        </span>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <a href="#/" aria-label="Return to Home" class="md:hidden text-xs text-[#8c7a85] hover:text-white tracking-widest uppercase font-mono">
        Home
      </a>
      <a href="https://github.com/enekos/mairu" aria-label="Visit Github repository" target="_blank" class="text-xs text-[#8c7a85] hover:text-white tracking-widest uppercase border border-white/10 px-4 py-1.5 rounded-full transition-colors hover:border-[#ff1e56]">
        GitHub
      </a>
    </div>
  </nav>

  {#if isMobileMenuOpen}
    <div class="fixed inset-0 top-[73px] bg-[#0a030b] z-40 md:hidden overflow-y-auto" transition:slide={{ duration: 300 }}>
      <div class="p-6">
        <div class="text-[10px] text-[#8c7a85] font-bold tracking-[0.2em] uppercase mb-6 font-mono">Contents</div>
        <nav class="space-y-1">
          {#each sections as section}
            <button 
              on:click={() => scrollToSection(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
              class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all border {activeSection === section.id ? 'bg-[#ff1e56]/10 text-white border-[#ff1e56]/30 font-medium' : 'text-[#8c7a85] border-transparent hover:bg-white/5 hover:text-white'}"
            >
              <svelte:component this={section.icon} size={16} aria-hidden="true" class={activeSection === section.id ? 'text-[#ff1e56] fever-warp' : 'text-[#8c7a85]'} />
              <span class={activeSection === section.id ? 'glitch-hover' : ''}>{section.title}</span>
            </button>
          {/each}
        </nav>
      </div>
    </div>
  {/if}

  <div class="flex flex-1 pt-[73px]">
    
    <!-- Sidebar -->
    <aside class="w-72 fixed h-[calc(100vh-73px)] border-r border-white/5 bg-[#0a030b] overflow-y-auto hidden md:block">
      <div class="p-8">
        <div class="text-[10px] text-[#8c7a85] font-bold tracking-[0.2em] uppercase mb-6 font-mono">Contents</div>
        <nav class="space-y-1">
          {#each sections as section}
            <button 
              on:click={() => scrollToSection(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
              class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all border {activeSection === section.id ? 'bg-[#ff1e56]/10 text-white border-[#ff1e56]/30 font-medium' : 'text-[#8c7a85] border-transparent hover:bg-white/5 hover:text-white'}"
            >
              <svelte:component this={section.icon} size={16} aria-hidden="true" class={activeSection === section.id ? 'text-[#ff1e56] fever-warp' : 'text-[#8c7a85]'} />
              <span class={activeSection === section.id ? 'glitch-hover' : ''}>{section.title}</span>
            </button>
          {/each}
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 md:ml-72 p-8 lg:p-16 xl:px-24 max-w-5xl w-full min-w-0">
      <div in:fade={{ duration: 600, delay: 100 }}>
        
        <div class="mb-16 border-b border-white/5 pb-12 relative overflow-hidden group">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 font-serif glitch-hover inline-block max-w-full">
            The <span class="text-[#ff1e56] italic">Codex</span>
          </h1>
          <p class="text-[#8c7a85] text-lg leading-relaxed font-light relative z-10">
            Comprehensive documentation for the Mairu Context System. Learn how to initialize the memory cromlech, integrate it with autonomous agents, and leverage the hybrid retrieval engine.
          </p>
          <div class="scanline"></div>
        </div>

        <div class="space-y-32">

          <!-- Why Mairu? -->
          <section id="why-mairu" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Flame class="text-[#ff1e56]" size={28} /> Why Mairu?
            </h2>

            <div class="bg-[#110515] border border-[#ff1e56]/20 rounded-2xl p-8 mb-8 shadow-[0_0_30px_rgba(255,30,86,0.05)] relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-[#ff1e56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p class="text-[#e6e0d8] leading-relaxed font-light mb-6 relative z-10">
                <strong class="text-white">The Problem:</strong> Every time you open a new chat with an AI coding assistant, it forgets everything. Your codebase structure, architectural decisions, past debugging sessions, why you chose gRPC over REST — all gone. The agent has to re-discover context from scratch, burning tokens and time. This is <em>context entropy</em>, and it gets worse as projects grow.
              </p>
              <p class="text-[#e6e0d8] leading-relaxed font-light relative z-10">
                <strong class="text-white">The Solution:</strong> Mairu is a persistent, searchable, self-maintaining memory layer that lives alongside your code. It hybrid-searches across vector embeddings and full-text, automatically parses your codebase into natural language, logs every terminal command you run, and lets agents query context proactively — so nothing is ever lost between sessions.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">Persist Context</strong>
                <p class="text-[#8c7a85] text-sm font-light">Store architectural decisions, debugging solutions, and project conventions as searchable memories that survive across chat sessions.</p>
              </div>
              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">Automate Understanding</strong>
                <p class="text-[#8c7a85] text-sm font-light">The AST daemon silently watches your codebase and translates code into natural language summaries — no expensive LLM calls required.</p>
              </div>
              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">Never Repeat Yourself</strong>
                <p class="text-[#8c7a85] text-sm font-light">Every shell command is logged, redacted, and indexed. Search semantically: "that docker command that failed yesterday" and find it instantly.</p>
              </div>
            </div>
          </section>
          
          <!-- Getting Started -->
          <section id="getting-started" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <TerminalSquare class="text-[#ff1e56]" size={28} /> Getting Started
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu is a Go binary with an embedded Svelte 5 dashboard. It requires a Meilisearch instance for hybrid search and either a Kimi/Gemini API key or local ONNX Runtime for embeddings.
            </p>

            <div class="bg-[#ff1e56]/5 border border-[#ff1e56]/20 rounded-xl p-6 mb-8 flex gap-4 items-start">
              <Cpu class="text-[#ff1e56] shrink-0 fever-warp" size={24} />
              <div>
                <h4 class="text-white font-medium mb-2 text-sm">Prerequisites</h4>
                <ul class="text-[#8c7a85] text-sm font-light list-disc list-inside space-y-1">
                  <li><strong class="text-white">Go 1.25+</strong> — for building the binary</li>
                  <li><strong class="text-white">Bun 1+</strong> — for the dashboard UI (optional)</li>
                  <li><strong class="text-white">Docker</strong> — optional; bootstrap script can fetch local Meilisearch instead</li>
                  <li><strong class="text-white">Kimi API key</strong> — or ONNX Runtime for local fastembed embeddings</li>
                </ul>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-white font-medium mb-4 text-sm font-mono relative z-10">Step 1: Clone & Bootstrap</h3>
                <pre class="text-[#ff1e56] text-xs font-mono overflow-x-auto relative z-10"><code>$ git clone https://github.com/enekos/mairu.git
$ cd mairu
$ ./bootstrap.sh          # fetches local Meilisearch (no Docker needed)</code></pre>
              </div>

              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-white font-medium mb-4 text-sm font-mono relative z-10">Step 2: Build</h3>
                <pre class="text-[#ff1e56] text-xs font-mono overflow-x-auto relative z-10"><code>$ make mairu-build        # compiles to ./mairu/bin/mairu</code></pre>
              </div>

              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-white font-medium mb-4 text-sm font-mono relative z-10">Step 3: Configure</h3>
                <pre class="text-[#ff1e56] text-xs font-mono overflow-x-auto relative z-10"><code>$ ./mairu/bin/mairu config set api.kimi_api_key "your-key"
$ ./mairu/bin/mairu setup         # creates Meilisearch indexes
$ ./mairu/bin/mairu init --defaults   # creates .mairu.toml in current project</code></pre>
              </div>

              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-white font-medium mb-4 text-sm font-mono relative z-10">Step 4: Verify</h3>
                <pre class="text-[#ff1e56] text-xs font-mono overflow-x-auto relative z-10"><code>$ ./mairu/bin/mairu doctor        # checks connectivity and configuration</code></pre>
              </div>

              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-white font-medium mb-4 text-sm font-mono relative z-10">Step 5: Run</h3>
                <pre class="text-[#ff1e56] text-xs font-mono overflow-x-auto relative z-10"><code>$ ./mairu/bin/mairu tui           # interactive terminal UI
$ ./mairu/bin/mairu web -p 8080   # web interface
$ ./mairu/bin/mairu context-server -p 8788   # centralized API server</code></pre>
              </div>
            </div>

            <div class="mt-8 bg-[#3b00ff]/5 border border-[#3b00ff]/20 rounded p-4 flex gap-3">
              <Binary class="text-[#3b00ff] shrink-0" />
              <p class="text-xs text-[#e6e0d8] font-light"><strong class="text-white">Pro tip:</strong> Add <code class="text-white font-mono bg-white/10 px-1 rounded">./mairu/bin</code> to your <code class="text-white font-mono bg-white/10 px-1 rounded">PATH</code> or symlink <code class="text-white font-mono bg-white/10 px-1 rounded">mairu</code> to a directory already in PATH (e.g. <code class="text-white font-mono bg-white/10 px-1 rounded">/usr/local/bin</code>) so you can run it from anywhere.</p>
            </div>
          </section>

          <!-- Configuration -->
          <section id="configuration" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Settings class="text-white" size={28} /> Configuration & State
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu uses a five-tier TOML configuration cascade instead of rigid environment variables, allowing for global defaults and project-specific overrides.
            </p>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden group">
              <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10">The Configuration Cascade</h3>
              <ul class="text-[#8c7a85] text-sm font-light mb-4 relative z-10 list-decimal list-inside space-y-2">
                <li><strong class="text-white">Hardcoded defaults:</strong> Sane fallbacks for Meilisearch and concurrency.</li>
                <li><strong class="text-white">User config:</strong> <code class="bg-black/50 px-1 rounded font-mono">~/.config/mairu/config.toml</code></li>
                <li><strong class="text-white">Project config:</strong> <code class="bg-black/50 px-1 rounded font-mono">.mairu.toml</code> in project root.</li>
                <li><strong class="text-white">Environment variables:</strong> <code class="bg-black/50 px-1 rounded font-mono">MAIRU_</code> prefix (e.g. <code class="bg-black/50 px-1 rounded font-mono">MAIRU_API_GEMINI_API_KEY</code>).</li>
                <li><strong class="text-white">CLI flags:</strong> Highest priority.</li>
              </ul>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10 mt-4"><code><span class="text-[#8c7a85]"># View your current resolved config cascade</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu config list

<span class="text-[#8c7a85]"># Set global values easily</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu config set api.gemini_api_key "your-key"

<span class="text-[#8c7a85]"># Check system health and missing dependencies</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu doctor</code></pre>
            </div>

            <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8 shadow-lg relative overflow-hidden">
              <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-[#3b00ff]/10 rounded-full blur-[40px] pointer-events-none"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Project Isolation (.mairu.toml)</h3>
              <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">
                While Meilisearch holds all data globally, Mairu isolates contexts using the <code class="text-white">-P &lt;project&gt;</code> flag. 
                You can drop a <code class="text-white">.mairu.toml</code> in your project root using <code class="text-white">mairu init</code> to override settings like output formats.
              </p>
              <div class="bg-[#3b00ff]/5 border border-[#3b00ff]/20 rounded p-4 flex gap-3 relative z-10">
                <Binary class="text-[#3b00ff] shrink-0" />
                <p class="text-xs text-[#e6e0d8] font-light">Make sure to add <code class="text-white font-mono bg-white/10 px-1 rounded">.mairu</code> and <code class="text-white font-mono bg-white/10 px-1 rounded">.mairu.toml</code> to your <code class="text-white font-mono bg-white/10 px-1 rounded">.gitignore</code> file.</p>
              </div>
            </div>
          </section>

          <!-- Local Embeddings -->
          <section id="local-embeddings" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Cpu class="text-[#3b00ff]" size={28} /> Local Embeddings
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              By default, Mairu uses remote APIs (Kimi/Gemini) for generating dense vector embeddings. However, you can run entirely offline using <strong class="text-white">fastembed</strong> and ONNX Runtime — zero API calls, zero latency, full privacy.
            </p>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden group">
              <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10">Setup fastembed</h3>
              <ol class="text-[#8c7a85] text-sm font-light mb-4 relative z-10 list-decimal list-inside space-y-2">
                <li>Install <strong class="text-white">ONNX Runtime</strong> on your system.</li>
                <li>Set the embedding provider to <code class="bg-black/50 px-1 rounded font-mono">fastembed</code> in your config.</li>
                <li>On first run, the model downloads automatically.</li>
              </ol>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10 mt-4"><code><span class="text-[#8c7a85]"># Set provider to local embeddings</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu config set embedding.provider "fastembed"
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu config set embedding.model "fast-all-MiniLM-L6-v2"
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu config set embedding.dimensions 384

<span class="text-[#8c7a85]"># Verify it's working</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu doctor</code></pre>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Privacy-First</strong>
                <p class="text-[#8c7a85] text-sm font-light">Your codebase never leaves your machine. Embeddings are generated locally with no external API calls.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Cost-Free</strong>
                <p class="text-[#8c7a85] text-sm font-light">No API key required. No rate limits. No per-token costs. Scale to millions of embeddings for free.</p>
              </div>
            </div>
          </section>

          <!-- Internal Schema -->
          <section id="internal-schema" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Server class="text-[#ff1e56]" size={28} /> Internal: Data Schema
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu leverages Meilisearch as its primary backing store, relying on its vector store capabilities to index high-dimensional floats generated by Gemini alongside standard text fields.
            </p>

            <div class="bg-[#110515] rounded-2xl border border-white/5 overflow-hidden group mb-8">
              <div class="p-8 relative">
                <div class="absolute inset-0 bg-gradient-to-br from-[#ff1e56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-6 border-b border-white/5 pb-4 relative z-10 glitch-hover inline-block max-w-full">Vector & Text Document Schema</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-6 relative z-10">Every artifact (Memory, Skill, Node) is serialized into this JSON schema before being indexed into Meilisearch. The <code class="text-white">_vectors</code> field is critical for semantic retrieval.</p>
                
                <pre class="bg-black/50 p-6 rounded-xl font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10 shadow-inner"><code>{`
  "id": "uuid-v4",
  "uri": "contextfs://...",
  "content": "Full text content",
  "importance": 8.5,
  "last_accessed": 1712435200,
  "project": "my-project",
  "category": "architecture",
  "_vectors": [
    -0.0142, 0.5123, -0.9912... 
  ]
`}</code></pre>
              </div>
            </div>
          </section>

          <!-- Core Artifacts -->
          <section id="core-concepts" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Database class="text-[#3b00ff]" size={28} /> The Three Artifacts
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              The Mairu knowledge graph is constructed from three distinct types of artifacts, each serving a unique purpose for agent contextual memory.
            </p>

            <div class="grid gap-6">
              <div class="p-8 border border-white/5 bg-[#0a030b] rounded-xl relative overflow-hidden group hover:border-white/20 transition-all">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#ff1e56]"></div>
                <h3 class="text-white font-serif text-2xl mb-3 flex items-center gap-3"><BookOpen size={24} class="text-[#ff1e56] fever-warp"/> Memories</h3>
                <p class="text-[#8c7a85] leading-relaxed font-light">
                  <strong>Definition:</strong> Facts with a category, owner, and importance score (1–10). <br/>
                  <strong>Usage:</strong> Store overarching architectural decisions, user preferences, API keys (if permitted), and observations that persist across multiple sessions. Memories are the bread and butter of generic agent context.
                </p>
              </div>

              <div class="p-8 border border-white/5 bg-[#0a030b] rounded-xl relative overflow-hidden group hover:border-white/20 transition-all">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#3b00ff]"></div>
                <h3 class="text-white font-serif text-2xl mb-3 flex items-center gap-3"><Braces size={24} class="text-[#3b00ff]"/> Skills</h3>
                <p class="text-[#8c7a85] leading-relaxed font-light">
                  <strong>Definition:</strong> Capability name and detailed description pairs. <br/>
                  <strong>Usage:</strong> Skills define the operational bounds of the agent within a specific project. For example, explicitly telling the agent "You can use `npm run test` to verify changes" or "Use the custom internal API for fetching users."
                </p>
              </div>

              <div class="p-8 border border-white/5 bg-[#0a030b] rounded-xl relative overflow-hidden group hover:border-white/20 transition-all">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
                <h3 class="text-white font-serif text-2xl mb-3 flex items-center gap-3"><Network size={24} class="text-white"/> Context Nodes</h3>
                <p class="text-[#8c7a85] leading-relaxed font-light">
                  <strong>Definition:</strong> Hierarchical tree nodes with abstract, overview, and content levels, addressed by a unique URI. <br/>
                  <strong>Usage:</strong> Context Nodes map out the actual structure of the codebase. E.g., <code class="text-white bg-white/10 px-1 rounded">contextfs://frontend/auth</code>. They link disparate files and functions into a navigable graph.
                </p>
              </div>
            </div>
          </section>

          <!-- Memory Lifecycle -->
          <section id="memory-lifecycle" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Hourglass class="text-[#3b00ff]" size={28} /> Biological Memory Lifecycle
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu treats vector embeddings like biological memories. Instead of an ever-expanding, noisy context window, memories follow a strict lifecycle of Genesis, Validation, and Decay.
            </p>

            <div class="grid lg:grid-cols-3 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-[#ff1e56]/30 transition-colors">
                <strong class="text-white inline-block mb-2 font-serif text-xl glitch-hover max-w-full">1. Genesis</strong>
                <p class="text-[#8c7a85] text-sm font-light">
                  A memory is forged via <code class="text-white">vibe-mutation</code> or <code class="text-white">memory store</code>. It is assigned an initial Importance Score (1-10) by the LLM.
                </p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/30 transition-colors">
                <strong class="text-white inline-block mb-2 font-serif text-xl glitch-hover max-w-full">2. Reinforcement</strong>
                <p class="text-[#8c7a85] text-sm font-light">
                  When a memory is returned in a vector search, its <code class="text-white">last_accessed</code> timestamp is updated. Frequently used memories resist decay.
                </p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-[#3b00ff]/20 relative overflow-hidden group hover:border-[#3b00ff] shadow-[0_0_20px_rgba(59,0,255,0.05)] transition-colors">
                <div class="absolute inset-0 bg-gradient-to-br from-[#3b00ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <strong class="text-[#3b00ff] inline-block mb-2 font-serif text-xl glitch-hover max-w-full relative z-10">3. Exponential Decay</strong>
                <p class="text-[#8c7a85] text-sm font-light relative z-10">
                  During retrieval, the re-ranker applies an exponential penalty based on the time elapsed since <code class="text-white">last_accessed</code>, pushing stale facts to the bottom of the context window.
                </p>
              </div>
            </div>
          </section>

          <!-- Hybrid Retrieval -->
          <section id="retrieval" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Search class="text-white" size={28} /> Hybrid Retrieval Engine
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu handles vector and full-text search natively via Meilisearch. On top of that, an app-side re-ranking system applies algorithmic decay and deduplication to ensure agents only receive the most relevant context.
            </p>

            <div class="bg-[#110515] rounded-2xl border border-white/5 overflow-hidden group">
              <div class="p-8 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-6 border-b border-white/5 pb-4 relative z-10 glitch-hover inline-block max-w-full">Retrieval Pipeline</h3>
                <ul class="space-y-6 relative z-10">
                  <li class="flex gap-4">
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm text-[#ff1e56]">1</span>
                    <div>
                      <strong class="text-white block mb-1">Vector Search</strong>
                      <span class="text-[#8c7a85] text-sm font-light">Dense vector cosine similarity using <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">gemini-embedding-001</code> (3072 dims). Great for semantic queries like "how does login work".</span>
                    </div>
                  </li>
                  <li class="flex gap-4">
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm text-[#ff1e56]">2</span>
                    <div>
                      <strong class="text-white block mb-1">Full-Text Search</strong>
                      <span class="text-[#8c7a85] text-sm font-light">Built-in keyword search with Meilisearch. Essential for exact variable names, file paths, or class names.</span>
                    </div>
                  </li>
                  <li class="flex gap-4">
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm text-[#ff1e56]">3</span>
                    <div>
                      <strong class="text-white block mb-1">Algorithmic Re-ranking</strong>
                      <span class="text-[#8c7a85] text-sm font-light">Applies an exponential recency decay penalty to older memories, counter-balanced by the user-defined Importance Score.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="bg-[#ff1e56]/5 p-6 border-t border-[#ff1e56]/20 flex items-start gap-4">
                 <Flame class="text-[#ff1e56] shrink-0 fever-warp" />
                 <div class="text-sm text-[#e6e0d8] font-light leading-relaxed">
                   <strong class="text-white">LLM Deduplication:</strong> Before writing a new node or memory, the router performs a vector search. If cosine similarity is ≥ 0.75, an LLM evaluates whether to <code class="text-[#ff1e56] font-mono">CREATE</code>, <code class="text-[#3b00ff] font-mono">UPDATE</code>, or <code class="font-mono text-[#8c7a85]">SKIP</code> the entry to prevent context bloat.
                 </div>
              </div>
            </div>

            <div class="mt-8 bg-[#110515] rounded-2xl border border-white/5 overflow-hidden group">
              <div class="p-8 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-6 border-b border-white/5 pb-4 relative z-10 glitch-hover inline-block max-w-full">Search Enhancements</h3>
                <div class="grid md:grid-cols-2 gap-6 relative z-10">
                  <div>
                    <strong class="text-white block mb-1 text-sm">Synonyms</strong>
                    <p class="text-[#8c7a85] text-sm font-light">Custom synonym expansion (e.g. "k8s" → "kubernetes") via the <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">SYNONYMS</code> environment variable.</p>
                  </div>
                  <div>
                    <strong class="text-white block mb-1 text-sm">Highlights</strong>
                    <p class="text-[#8c7a85] text-sm font-light">Returns <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">&lt;mark&gt;</code>-tagged snippets showing matched terms. Enable with <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">--highlight</code>.</p>
                  </div>
                  <div>
                    <strong class="text-white block mb-1 text-sm">Field Boosts</strong>
                    <p class="text-[#8c7a85] text-sm font-light">Per-search field weight overrides via the API <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">fieldBoosts</code> option.</p>
                  </div>
                  <div>
                    <strong class="text-white block mb-1 text-sm">Min Score Cutoff</strong>
                    <p class="text-[#8c7a85] text-sm font-light">Hard threshold to drop low-confidence results using <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">--minScore</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- AST Daemon -->
          <section id="ast-daemon" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Layers class="text-[#3b00ff]" size={28} /> AST Daemon & Parsing
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              The Mairu Daemon watches a directory for TS/JS file changes. Using Tree-sitter, it parses the Abstract Syntax Tree and produces human-readable Natural Language descriptions of code—without using expensive LLM calls.
            </p>

            <div class="bg-[#0a030b] border border-white/5 p-6 rounded-xl mb-8 font-mono">
              <pre class="text-[#ff1e56] text-xs overflow-x-auto"><code># Run the watcher in the background for a specific project
$ mairu daemon ./src -P my-project</code></pre>
            </div>

            <div class="mb-8 p-6 bg-[#110515] border border-white/5 rounded-xl border-l-2 border-l-[#3b00ff] relative overflow-hidden group">
               <div class="absolute inset-0 bg-[#3b00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 class="text-white font-serif text-xl mb-3 relative z-10">Heuristic Summarization</h3>
               <p class="text-[#8c7a85] text-sm font-light leading-relaxed relative z-10">
                  Instead of feeding raw code strings to an LLM to generate summaries, Mairu walks the Tree-sitter AST natively in Go. It identifies exported functions, classes, and interfaces, and uses string templating to build a comprehensive markdown summary of the file's API surface. This saves massive token costs and executes in milliseconds.
               </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Parallel Pool</strong>
                <p class="text-[#8c7a85] text-sm font-light">Configurable concurrency pool (default 8 goroutines) for rapid batch scanning on startup.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Hash Cache</strong>
                <p class="text-[#8c7a85] text-sm font-light">Local persistent hash caching prevents unmodified files from being re-parsed unnecessarily.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Smart Dedup</strong>
                <p class="text-[#8c7a85] text-sm font-light">File stat fingerprinting → content SHA1 → payload SHA1 ensures absolute minimal writes to the Meilisearch DB.</p>
              </div>
            </div>
          </section>

          <!-- Context Trees -->
          <section id="context-trees" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Network class="text-white" size={28} /> Context Trees
            </h2>
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              While memories hold isolated facts, Context Nodes form a cohesive graph. They map structural directories or conceptual modules into addressable URIs.
            </p>

            <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8 mb-8">
              <h3 class="text-xl font-serif text-white mb-4">URI Addressing</h3>
              <p class="text-sm text-[#8c7a85] font-light mb-6">Every context node is identified by a <code class="font-mono text-white bg-white/10 px-1 rounded">contextfs://</code> URI. This allows agents to list sub-nodes just like navigating a filesystem.</p>
              
              <div class="bg-black/40 p-4 rounded font-mono text-xs border border-white/5">
                <span class="text-[#8c7a85]"># The agent lists the root</span><br/>
                <span class="text-[#ff1e56]">></span> mairu node ls "contextfs://my-project" -P my-project<br/>
                <br/>
                <span class="text-white">[NODE] contextfs://my-project/backend</span><br/>
                <span class="text-white">[NODE] contextfs://my-project/frontend</span><br/>
                <span class="text-white">[NODE] contextfs://my-project/docs</span>
              </div>
            </div>
          </section>

          <!-- Browser Extension -->
          <section id="browser-extension" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Monitor class="text-[#3b00ff]" size={28} /> Browser Extension
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              The Mairu Browser Context Extension gives agents real-time browser awareness by syncing page states to the local context server.
            </p>

            <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8 mb-8">
              <h3 class="text-xl font-serif text-white mb-4">Installation</h3>
              <div class="bg-black/40 p-4 rounded font-mono text-xs border border-white/5 mb-4">
                <span class="text-[#8c7a85]"># Build the Native Messaging Host</span><br/>
                <span class="text-[#ff1e56]">></span> make install-browser-extension
              </div>
              <p class="text-sm text-[#8c7a85] font-light">
                After building, load the <code class="text-white bg-white/10 px-1 rounded font-mono">mairu/browser-extension/extension</code> folder as an unpacked extension in Chrome Developer Mode.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#3b00ff]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Passive Capture</strong>
                <p class="text-[#8c7a85] text-sm font-light">Automatically captures DOM text, selection, structural visual bounding boxes, active elements, console errors, and local storage state.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#3b00ff]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Active Hooks</strong>
                <p class="text-[#8c7a85] text-sm font-light">Exposes native hooks (click, fill, highlight, scroll, navigate) allowing an autonomous agent to manipulate the active browser tab.</p>
              </div>
            </div>

            <div class="mt-8 bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
              <h3 class="text-xl font-serif text-white mb-4">WASM Core Architecture</h3>
              <p class="text-[#8c7a85] text-sm font-light mb-4">
                The browser extension is powered by a Rust WASM core that runs inside the Chrome service worker:
              </p>
              <ul class="text-[#8c7a85] text-sm font-light list-disc list-inside space-y-2">
                <li><strong class="text-white">DOM Extraction:</strong> Rust <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">scraper</code> crate filters noise (nav/footers/ads), extracts markdown tables, blockquotes, code blocks, and chunks text.</li>
                <li><strong class="text-white">SimHash Deduplication:</strong> Maintains a rolling session queue (50 pages) and hashes pages via SimHash, rejecting duplicate SPA states via Hamming distance comparison.</li>
                <li><strong class="text-white">TF-IDF Search:</strong> Lightweight in-memory index over session memory lets agents query recent browsing: "what was that rust config flag?"</li>
                <li><strong class="text-white">Native Messaging Bridge:</strong> Rust binary bridges Chrome Extension to Go runtime via local HTTP on <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">127.0.0.1:7081</code>.</li>
              </ul>
            </div>
          </section>

          <!-- Interfaces -->
          <section id="interfaces" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Terminal class="text-white" size={28} /> Interfaces: MCP, TUI & Bots
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              Mairu runs anywhere. You can connect to the core contextual memory through a variety of interfaces depending on your workflow.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Model Context Protocol (MCP)</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Run Mairu as an MCP server to natively connect its context engine to Claude Desktop or cursor.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono w-full block border border-white/5">> mairu mcp</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Terminal UI (TUI)</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">A rich, interactive terminal application built natively in Go for distraction-free memory management.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono w-full block border border-white/5">> mairu tui</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Web Dashboard</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Launch the unified Svelte 5 dashboard to visualize context trees and search memories visually.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono w-full block border border-white/5">> mairu web</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Telegram Bot</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Access your Mairu swarm remotely from your phone through a persistent Telegram conversational interface.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono w-full block border border-white/5">> mairu telegram</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">UTCP Server</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Start a UTCP server over HTTP for custom agent integrations and remote context access.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono w-full block border border-white/5">> mairu utcp -p 8081</code>
              </div>
            </div>

            <div class="mt-8 bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
              <h3 class="text-xl font-serif text-white mb-4">Editor Integrations</h3>
              <p class="text-[#8c7a85] text-sm font-light mb-4">
                Mairu integrates directly into your editor workflow through the <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">integrations/</code> directory:
              </p>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-black/40 p-3 rounded border border-white/5">
                  <strong class="text-white text-sm block mb-1">Neovim</strong>
                  <p class="text-[#8c7a85] text-xs font-light">Lua plugin for in-editor context search and memory storage.</p>
                </div>
                <div class="bg-black/40 p-3 rounded border border-white/5">
                  <strong class="text-white text-sm block mb-1">Raycast</strong>
                  <p class="text-[#8c7a85] text-xs font-light">React/TypeScript extension for macOS quick commands.</p>
                </div>
                <div class="bg-black/40 p-3 rounded border border-white/5">
                  <strong class="text-white text-sm block mb-1">Zed</strong>
                  <p class="text-[#8c7a85] text-xs font-light">Rust/MCP extension connecting Zed's agent to Mairu context.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Scraping & Ingestion -->
          <section id="scraping-ingestion" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <BookOpen class="text-[#ff1e56]" size={28} /> Web Scraping & Integrations
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              Don't just keep local context. Import issues, fetch external documentation, and scrape APIs to expand your project's knowledge base natively.
            </p>

            <div class="space-y-6">
              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">External APIs & Issue Trackers</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Sync issues from Github or Linear directly into the Mairu Context Nodes. Agents can automatically reference issue requirements without leaving the terminal.</p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#ff1e56]">></span> mairu github sync-issues -P my-project
<span class="text-[#ff1e56]">></span> mairu linear sync-issues -P my-project</code></pre>
              </div>

              <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8 hover:border-[#ff1e56]/30 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">Web Scraping & LLM Extraction</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">
                  The <code class="text-white">mairu scrape</code> command provides a massive toolkit for crawling domains, extracting structured schemas via LLM (<code class="text-white">smart</code>), aggregating data concurrently (<code class="text-white">omni</code>), or pulling remote pages directly into your local context graph.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]"># Crawl a domain up to depth 2 and extract structured data</span>
<span class="text-[#ff1e56]">></span> mairu scrape depth https://docs.example.com --depth 2

<span class="text-[#8c7a85]"># Fetch a URL, summarize it, and save it as a Context Node</span>
<span class="text-[#ff1e56]">></span> mairu scrape web https://example.com -P my-project</code></pre>
              </div>
            </div>
          </section>

          <!-- System & Docker -->
          <section id="system-utilities" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Cpu class="text-[#3b00ff]" size={28} /> System & Docker Utilities
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              A standard <code class="text-white font-mono">docker ps</code> or <code class="text-white font-mono">env</code> command floods a limited context window. Mairu provides AI-optimized wrapper commands that emit clean, token-efficient JSON designed strictly for LLM consumption.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-[#3b00ff]/20 hover:border-[#3b00ff]/50 transition-colors relative overflow-hidden group">
                <div class="absolute inset-0 bg-[#3b00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <strong class="text-[#3b00ff] block mb-2 font-serif text-xl relative z-10">Docker Context</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">Provides clean JSON arrays of running containers, tail-budgeted logs without noisy timestamps, and formatted resource utilization.</p>
                <div class="space-y-2 relative z-10 font-mono text-xs text-white bg-black/40 p-3 rounded">
                  <div>> mairu docker ps</div>
                  <div>> mairu docker logs &lt;id&gt;</div>
                  <div>> mairu docker stats</div>
                </div>
              </div>

              <div class="bg-[#110515] p-6 rounded-xl border border-[#3b00ff]/20 hover:border-[#3b00ff]/50 transition-colors relative overflow-hidden group">
                <div class="absolute inset-0 bg-[#3b00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <strong class="text-[#3b00ff] block mb-2 font-serif text-xl relative z-10">System Snapshots</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">Safe environment variables dump (redacting secrets), process tracking, and system health queries formulated as clean JSON.</p>
                <div class="space-y-2 relative z-10 font-mono text-xs text-white bg-black/40 p-3 rounded">
                  <div>> mairu sys</div>
                  <div>> mairu env</div>
                  <div>> mairu proc</div>
                </div>
              </div>
            </div>
          </section>

          <!-- AI-Optimized Dev Toolkit -->
          <section id="ai-dev-toolkit" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Code class="text-[#ff1e56]" size={28} /> AI-Optimized Dev Toolkit
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu includes a comprehensive suite of CLI tools specifically designed for LLM consumption. Every command outputs strict, token-efficient JSON to prevent context window blowouts.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu scan</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Token-budgeted regex search with context lines. Prevents dumping entire files into the context window.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu scan "func main" ./src -e .go -n 10</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu outline</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">AST-based file skeleton. Emits imports, classes, functions, and interfaces as structured JSON.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu outline main.go --tree --full</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu peek</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Smart bracket-aware symbol extraction. No more fragile <code class="text-white">sed</code>/<code class="text-white">head</code> pipelines.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu peek main.go -l 10-20 -s MyStruct</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu map</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Fast, <code class="text-white">.gitignore</code>-aware, token-counted directory tree for codebase exploration.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu map ./src -d 3 --sort size</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu impact</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Analyze blast radius and reverse dependencies for any symbol or context node.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu impact contextfs://node/my-project/auth.go -P my-project</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu splice</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">AST-aware symbol replacement. Safely replace functions across files without breaking syntax.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu splice main.go -t oldFunc -r new.go</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu distill</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Run any command and capture only stack traces and errors — perfect for debugging pipelines.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu distill go test ./...</code>
              </div>
              <div class="bg-[#110515] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-lg">mairu dev kill-port</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-3">Safely terminate runaway web servers on specific ports.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu dev kill-port 3000</code>
              </div>
            </div>

            <div class="mt-8 bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
              <h3 class="text-xl font-serif text-white mb-4">Additional Utilities</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">mairu info [dir]</code>
                  <p class="text-[#8c7a85] text-sm font-light">Repository analytics: token sizes, file counts, extensions.</p>
                </div>
                <div>
                  <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">mairu env [file] -r</code>
                  <p class="text-[#8c7a85] text-sm font-light">Smart env reader. Extracts keys, flags secrets, reveals safe values.</p>
                </div>
                <div>
                  <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">mairu proc ports</code>
                  <p class="text-[#8c7a85] text-sm font-light">List active ports and processes consuming them.</p>
                </div>
                <div>
                  <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">mairu proc top</code>
                  <p class="text-[#8c7a85] text-sm font-light">Highest CPU and memory processes, formatted for LLMs.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Real-Time Shell Integration -->
          <section id="shell-integration" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Wrench class="text-[#3b00ff]" size={28} /> Real-Time Shell Integration
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu can capture every command you run in your terminal, automatically redact secrets, and make your entire shell history semantically searchable. This happens transparently via a small daemon and shell hooks.
            </p>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden group">
              <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10">Setup Shell Hooks</h3>
              <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">Add one line to your shell rc file. Mairu supports zsh, bash, and fish natively.</p>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#8c7a85]"># zsh (~/.zshrc)</span>
<span class="text-[#ff1e56]">></span> eval "$(mairu shell init zsh)"

<span class="text-[#8c7a85]"># bash (~/.bashrc)</span>
<span class="text-[#ff1e56]">></span> eval "$(mairu shell init bash)"

<span class="text-[#8c7a85]"># fish (~/.config/fish/config.fish)</span>
<span class="text-[#ff1e56]">></span> mairu shell init fish | source</code></pre>
            </div>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden group">
              <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10">Start the Ingest Daemon</h3>
              <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">Run once per session, or configure as a systemd/launchd service.</p>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#ff1e56]">></span> mairu ingestd run &</code></pre>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#ff1e56]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">5-Layer Redaction</strong>
                <p class="text-[#8c7a85] text-sm font-light">Every command is scrubbed through 5 layers before storage: known-token regex, arg/flag heuristics, entropy analysis, credential-handling tool denylist, and damage capping. Entries exceeding the damage cap are dropped entirely.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#ff1e56]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Opt-In Capture</strong>
                <p class="text-[#8c7a85] text-sm font-light">For commands where you want stdout/stderr remembered, prefix with <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">mairu capture</code>. Streams live to terminal while buffering a copy for search.</p>
              </div>
            </div>

            <div class="bg-[#0a030b] border border-white/5 rounded-xl p-8">
              <h3 class="text-xl font-serif text-white mb-4">Search Your History</h3>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]"># Semantically search past commands</span>
<span class="text-[#ff1e56]">></span> mairu history search "docker build failed"

<span class="text-[#8c7a85]"># Most frequently run commands</span>
<span class="text-[#ff1e56]">></span> mairu history stats

<span class="text-[#8c7a85]"># Import existing shell history (zsh or bash)</span>
<span class="text-[#ff1e56]">></span> mairu history import --from ~/.zsh_history --project my-project

<span class="text-[#8c7a85]"># Apply reinforcement learning feedback</span>
<span class="text-[#ff1e56]">></span> mairu history feedback &lt;id&gt; -r 10</code></pre>
            </div>
          </section>

          <!-- Git Helpers -->
          <section id="git-helpers" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <GitBranch class="text-white" size={28} /> Git Helpers
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              Mairu provides AI-optimized Git commands that emit clean, token-efficient summaries designed for LLM consumption.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">mairu git summary</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Produces a token-dense, strictly parsed git status and history summary. Perfect for giving agents context on current changes.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu git summary</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">mairu git ingest</strong>
                <p class="text-[#8c7a85] text-sm font-light mb-4">Ingests git commit history into context nodes, making past architectural decisions and change rationales searchable.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5">mairu git ingest -P my-project</code>
              </div>
            </div>
          </section>

          <!-- Quality Guards & Testing -->
          <section id="quality-guards" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <ShieldCheck class="text-[#ff1e56]" size={28} /> Quality Guards & Testing
            </h2>
            
            <p class="mb-6 leading-relaxed text-[#e6e0d8] font-light">
              Mairu provides a robust <code class="text-white font-mono bg-white/10 px-1 rounded">approved</code> package to ensure test determinism, replace fragile bash scripts, and strictly validate data output through structured fixture checking.
            </p>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
               <h3 class="text-xl font-serif text-white mb-4">Fixture Completeness & Structured Diffs</h3>
               <p class="text-[#8c7a85] text-sm font-light mb-4">
                  The <code class="text-white font-mono bg-white/10 px-1 rounded">approved</code> helpers perform automated fixture discovery. Using <code class="text-white font-mono bg-white/10 px-1 rounded">AssertJSON</code> and <code class="text-white font-mono bg-white/10 px-1 rounded">AssertString</code>, they enforce strict verification against checked-in golden fixtures. They feature nil coercion, unified line diffs, and precise field-level structured diffs for tracking complex JSON anomalies.
               </p>
               <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]">// Example from evaluation tests</span>
<span class="text-white">approved.AssertJSON</span>(t, <span class="text-[#ff1e56]">"fixtures/output.json"</span>, actualResult)</code></pre>
            </div>
          </section>

          <!-- Internal: Vibe Router -->
          <section id="internal-vibe" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Waypoints class="text-[#ff1e56] fever-warp" size={28} /> Internal: The Vibe Router
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              When an agent executes a <code class="text-white">vibe-mutation</code>, they are offloading the cognitive load of data structuring to Mairu's internal LLM router.
            </p>

            <div class="relative bg-[#110515] border border-white/5 rounded-2xl p-8 overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-r from-[#ff1e56]/5 to-[#3b00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="space-y-8 relative z-10">
                <!-- Step 1 -->
                <div class="flex gap-6 items-start">
                  <div class="w-10 h-10 rounded-full bg-[#ff1e56]/10 border border-[#ff1e56]/30 flex items-center justify-center shrink-0 font-mono text-[#ff1e56]">01</div>
                  <div>
                    <h4 class="text-white font-serif text-xl mb-2">Intent Parsing</h4>
                    <p class="text-[#8c7a85] text-sm font-light">The unstructured natural language input (e.g., "remember we use tailwind instead of plain css") is passed to Gemini to extract the core facts, category, and a suggested Importance Score.</p>
                  </div>
                </div>
                
                <!-- Step 2 -->
                <div class="flex gap-6 items-start">
                  <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-mono text-white">02</div>
                  <div>
                    <h4 class="text-white font-serif text-xl mb-2">Vector Collision Check</h4>
                    <p class="text-[#8c7a85] text-sm font-light">Mairu generates an embedding for the parsed intent and queries Meilisearch. If a memory exists with <code class="text-white">> 0.75</code> cosine similarity, a collision is flagged.</p>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="flex gap-6 items-start">
                  <div class="w-10 h-10 rounded-full bg-[#3b00ff]/10 border border-[#3b00ff]/30 flex items-center justify-center shrink-0 font-mono text-[#3b00ff]">03</div>
                  <div>
                    <h4 class="text-white font-serif text-xl mb-2">Autonomous Action</h4>
                    <p class="text-[#8c7a85] text-sm font-light">If there's a collision, Gemini evaluates the existing fact vs the new fact. It then responds with a rigid JSON action: <code class="text-white">CREATE</code> (if distinctly new), <code class="text-[#3b00ff]">UPDATE</code> (to merge info), or <code class="text-[#ff1e56]">SKIP</code> (if already known).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Agent Integration -->
          <section id="agent-integration" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Zap class="text-[#ff1e56] fever-warp" size={28} /> Native Agent & Integrations
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu is a fully autonomous coding agent out-of-the-box. However, its memory engine is also designed to be injected into the system prompt of other agents like Opencode, Aider, and Claude Code.
            </p>

            <div class="space-y-8">
              
              <div class="group relative">
                <div class="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div class="relative bg-[#110515] border border-white/5 rounded-xl p-8 overflow-hidden">
                  <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
                  <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full">1. The Native Mairu Agent</h3>
                  <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">Use Mairu as your primary developer. It natively leverages the AST daemon and memory graph to autonomously write code, fix bugs, and refactor architecture without needing any CLI wrappers.</p>
                  <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#ff1e56] border border-white/5 overflow-x-auto relative z-10"><code>$ mairu task "Implement a new dark mode toggle in the header" -P my-project</code></pre>
                </div>
              </div>

              <div class="group relative">
                <div class="absolute -inset-1 bg-gradient-to-r from-[#ff1e56]/20 to-[#3b00ff]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div class="relative bg-[#110515] border border-white/5 rounded-xl p-8 overflow-hidden">
                  <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#ff1e56]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#ff1e56]/20 transition-colors"></div>
                  <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full">2. Deterministic Retrieval (Integrations)</h3>
                  <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">When using third-party agents, instruct them to proactively search memories whenever they start a new task or encounter an unknown domain using the CLI.</p>
                  <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#ff1e56] border border-white/5 overflow-x-auto relative z-10"><code>$ mairu memory search "authentication token validation rules" -k 5 -P my-project
$ mairu node search "authentication architecture" -k 5 -P my-project</code></pre>
                </div>
              </div>

              <div class="group relative">
                <div class="absolute -inset-1 bg-gradient-to-r from-[#3b00ff]/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div class="relative bg-[#110515] border border-white/5 rounded-xl p-8 overflow-hidden">
                  <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#3b00ff]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#3b00ff]/20 transition-colors"></div>
                  <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full">3. Vibe Mutation (Integrations)</h3>
                  <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">When a third-party agent completes a complex refactor, it should summarize the changes via <code class="text-white">vibe-mutation</code> to store the memory in the hive mind.</p>
                  <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#ff1e56] border border-[#ff1e56]/20 overflow-x-auto relative z-10"><code>$ mairu vibe-mutation "remember that we switched from REST to gRPC in the backend" -P my-project -y</code></pre>
                </div>
              </div>

            </div>
            
          </section>

          <!-- Advanced CLI -->
          <section id="advanced-cli" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Command class="text-white" size={28} /> Advanced CLI Usage
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Agents require precision. The CLI exposes advanced filtering capabilities allowing an agent to specifically query memories owned by another agent, isolate by category, or even run entirely unattended tasks via Minion Mode.
            </p>

            <div class="space-y-6">
              
              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">Vibe Query (Graph RAG)</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">
                  If the agent doesn't know what to search for deterministically, it can use <code class="text-white">vibe-query</code>. Mairu will use an LLM to generate multiple search queries, aggregate vector and AST node results, and return a synthesized response.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#ff1e56]">></span> mairu vibe-query "how are user sessions validated?" -P my-project</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">Owner & Category Filtering</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">
                  When dealing with a swarm of agents (e.g. Claude Code doing architecture, Aider doing implementation), you can filter memories by the entity that created them.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]"># Search only for bug_fix memories stored by the aider agent</span>
<span class="text-[#ff1e56]">></span> mairu memory search "database lock" -c bug_fix -o aider -P my-project</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-[#ff1e56]/30 transition-colors group relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-[#ff1e56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-4 relative z-10">Minion Mode (Unattended Execution)</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">
                  Minion mode executes tasks completely unattended. It automatically approves shell commands, runs verification checks, attempts to self-heal failing tests/linters, and opens a Pull Request. Ideal for background CI/CD pipelines.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#8c7a85]"># Execute task, auto-fix issues up to 3 times, and create PR</span>
<span class="text-[#ff1e56]">></span> mairu minion "Upgrade the database schema to support UUIDv7" --max-retries 3</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-[#ff1e56]/30 transition-colors group relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-[#ff1e56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-4 relative z-10">Council Mode</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">
                  Council Mode is a multi-agent architectural orchestration layer designed for complex development tasks. Mairu tasks are executed by a specialized council of autonomous roles (Product Lead, Expert, Test Evangelist). A Product Lead synthesizes reviews before execution, ensuring higher code quality and alignment.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#8c7a85]"># Execute minion task under council supervision</span>
<span class="text-[#ff1e56]">></span> mairu minion "Refactor auth module" --council</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-[#3b00ff]/30 transition-colors group relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-[#3b00ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-4 relative z-10">Bash History Persistence</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">
                  Mairu persists and indexes your interactive shell sessions securely across time. It can semantically search through your past bash history and compute frequent command stats.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#8c7a85]"># Semantically search past bash commands</span>
<span class="text-[#ff1e56]">></span> mairu history search "docker build" -n 5

<span class="text-[#8c7a85]"># View your most frequently run commands</span>
<span class="text-[#ff1e56]">></span> mairu history stats</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-[#3b00ff]/30 transition-colors group relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-[#3b00ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 class="text-xl font-serif text-white mb-4 relative z-10">AI-Optimized Utilities</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4 relative z-10">
                  Mairu includes highly optimized CLI helpers specifically designed to be called by other LLM agents to reduce token usage and improve deterministic outputs.
                </p>
                <div class="grid md:grid-cols-2 gap-4 relative z-10">
                   <div class="bg-black/40 p-3 rounded border border-white/5 font-mono text-xs text-[#8c7a85]">
                      <span class="text-white block mb-1">mairu code search</span>
                      Semantic code search bypassing LLM vibes directly against the AST.
                   </div>
                   <div class="bg-black/40 p-3 rounded border border-white/5 font-mono text-xs text-[#8c7a85]">
                      <span class="text-white block mb-1">mairu impact</span>
                      Analyze the blast radius & reverse dependencies for a symbol.
                   </div>
                   <div class="bg-black/40 p-3 rounded border border-white/5 font-mono text-xs text-[#8c7a85]">
                      <span class="text-white block mb-1">mairu peek / outline</span>
                      JSON token-aware file peeker and codebase skeleton mapping.
                   </div>
                   <div class="bg-black/40 p-3 rounded border border-white/5 font-mono text-xs text-[#8c7a85]">
                      <span class="text-white block mb-1">mairu dev kill-port</span>
                      Safely terminate runaway web servers on specific ports.
                   </div>
                </div>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">Output Formatting for Scripts</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">
                  CLI outputs are structured natively for both human readability and script automation. You can output search and list commands in different formats.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]"># Output search results as strict JSON for a script</span>
<span class="text-[#ff1e56]">></span> mairu memory search "api keys" -o json -P my-project

<span class="text-[#8c7a85]"># Output plain text (no colors/tables)</span>
<span class="text-[#ff1e56]">></span> mairu memory search "api keys" -o plain -P my-project</code></pre>
              </div>

              <div class="bg-[#110515] border border-white/5 rounded-xl p-8 hover:border-white/20 transition-colors">
                <h3 class="text-xl font-serif text-white mb-4">Shell Completion</h3>
                <p class="text-[#8c7a85] text-sm font-light mb-4">
                  Generate tab-completion scripts for bash, zsh, fish, or PowerShell.
                </p>
                <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto"><code><span class="text-[#8c7a85]"># Bash</span>
<span class="text-[#ff1e56]">></span> mairu completion bash > /etc/bash_completion.d/mairu

<span class="text-[#8c7a85]"># Zsh</span>
<span class="text-[#ff1e56]">></span> mairu completion zsh > "${fpath[1]}/_mairu"

<span class="text-[#8c7a85]"># Fish</span>
<span class="text-[#ff1e56]">></span> mairu completion fish > ~/.config/fish/completions/mairu.fish</code></pre>
              </div>

            </div>
          </section>

          <!-- Eval & Retrieval Suite -->
          <section id="eval-suite" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <BarChart3 class="text-[#3b00ff]" size={28} /> Eval & Retrieval Suite
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu includes a built-in retrieval evaluation harness to measure and improve search quality over time. Use it to benchmark your hybrid retrieval pipeline against real-world queries.
            </p>

            <div class="bg-[#110515] border border-white/5 rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden group">
              <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 class="text-xl font-serif text-white mb-4 relative z-10">Run Evaluation</h3>
              <pre class="bg-black/50 p-4 rounded-lg font-mono text-xs text-[#8c7a85] border border-white/5 overflow-x-auto relative z-10"><code><span class="text-[#8c7a85]"># Evaluate against a sample dataset</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu eval:retrieval --dataset ./llmeval/sample_dataset.json --topK 5 --verbose

<span class="text-[#8c7a85]"># Fail if quality drops below thresholds</span>
<span class="text-[#ff1e56]">></span> ./mairu/bin/mairu eval:retrieval --dataset ./llmeval/sample_dataset.json --topK 5 --fail-below-mrr 0.8 --fail-below-recall 0.75</code></pre>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">MRR & Recall</strong>
                <p class="text-[#8c7a85] text-sm font-light">Measures Mean Reciprocal Rank and recall@K to ensure your retrieval pipeline returns relevant results at the top.</p>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">CI Integration</strong>
                <p class="text-[#8c7a85] text-sm font-light">Use <code class="text-white font-mono text-xs bg-white/5 px-1 rounded">--fail-below-*</code> flags to gate deployments on retrieval quality. Add to your CI pipeline to catch regressions.</p>
              </div>
            </div>
          </section>

          <!-- Build Profiles -->
          <section id="build-profiles" class="scroll-mt-32">
            <h2 class="text-3xl font-serif text-white mb-6 flex items-center gap-4">
              <Cpu class="text-[#ff1e56]" size={28} /> Build Profiles
            </h2>
            
            <p class="mb-8 leading-relaxed text-[#e6e0d8] font-light">
              Mairu supports multiple build profiles to match your deployment constraints. Choose the right binary for your environment.
            </p>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#ff1e56]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Full</strong>
                <p class="text-[#8c7a85] text-sm font-light">Everything included: TUI, Web UI, Telegram, MCP, context server. Default build.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5 mt-3">make mairu-build</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-white/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Slim</strong>
                <p class="text-[#8c7a85] text-sm font-light">No TUI, Web UI, Telegram, or MCP. Just the core agent, context server, and CLI toolkit.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5 mt-3">make mairu-build-slim</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#3b00ff]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Headless</strong>
                <p class="text-[#8c7a85] text-sm font-light">No TUI or Web UI. Includes Telegram and MCP for server deployments.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5 mt-3">make mairu-build-headless</code>
              </div>
              <div class="bg-[#110515] p-6 rounded-xl border border-white/5 hover:border-[#3b00ff]/30 transition-colors">
                <strong class="text-white block mb-2 font-serif text-xl">Context-Server-Only</strong>
                <p class="text-[#8c7a85] text-sm font-light">Minimal binary with just the REST API. Ideal for microservice deployments.</p>
                <code class="text-[#ff1e56] bg-black/50 px-2 py-1 rounded text-xs font-mono block border border-white/5 mt-3">make mairu-build-contextsrv</code>
              </div>
            </div>
          </section>

        </div>

        <footer class="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-[#8c7a85] font-light gap-4">
           <div class="flex items-center gap-2 text-white font-serif"><Database size={16} class="text-[#ff1e56]"/> Mairu System</div>
           <p>Forged in the terminal. Built for Autonomous Entities.</p>
        </footer>

      </div>
    </main>
  </div>
</div>
