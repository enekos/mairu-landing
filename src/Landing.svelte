<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { animate, stagger, inView } from 'motion';
  import { Database, Network, TerminalSquare, Zap, Layers, Terminal, Search, Flame, BrainCircuit, Cpu, ArrowRight, Bot, GitMerge, Sparkles, Workflow, Hourglass, Share2, Monitor } from 'lucide-svelte';

  let showTerminal = false;
  let cursorVisible = true;

  let heroRef: HTMLElement | undefined;
  let textRef: HTMLElement | undefined;
  let terminalRef: HTMLElement | undefined;
  let featuresRef: HTMLElement | undefined;
  let architectureRef: HTMLElement | undefined;
  let capabilitiesRef: HTMLElement | undefined;
  let cliRef: HTMLElement | undefined;

  // Text Scramble Effect
  let heroTitle = "Subconscious";
  let heroSubtitle = "Memory Layer.";
  const finalTitle = "Subconscious";
  const finalSubtitle = "Memory Layer.";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>{}[]_-\\/";

  let canvasRef: HTMLCanvasElement | undefined;
  let animationFrame: number;
  let cursorInterval: ReturnType<typeof setInterval>;
  let textScrambleInterval: ReturnType<typeof setInterval>;
  let initialTimeout: ReturnType<typeof setTimeout>;
  let terminalTimeouts: ReturnType<typeof setTimeout>[] = [];
  let handleResize: () => void;

  onMount(() => {
    initialTimeout = setTimeout(() => {
      showTerminal = true;
    }, 1500);

    cursorInterval = setInterval(() => {
      cursorVisible = !cursorVisible;
    }, 500);

    // Text Scramble execution
    let iterations = 0;
    textScrambleInterval = setInterval(() => {
      heroTitle = heroTitle.split('').map((letter, index) => {
        if(index < iterations) return finalTitle[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
      heroSubtitle = heroSubtitle.split('').map((letter, index) => {
        if(index < iterations) return finalSubtitle[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
      if(iterations >= Math.max(finalTitle.length, finalSubtitle.length)) clearInterval(textScrambleInterval);
      iterations += 1/3;
    }, 30);

    // Canvas Swarm Background
    if (canvasRef) {
      const ctx = canvasRef.getContext('2d');
      if (ctx) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvasRef.width = width;
        canvasRef.height = height;
        
        const particles = Array.from({length: 120}, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          char: chars[Math.floor(Math.random() * chars.length)],
          life: Math.random() * 100,
          isGlitch: Math.random() > 0.9
        }));

        const draw = () => {
          ctx.fillStyle = 'rgba(6, 2, 5, 0.15)'; // trail effect
          ctx.fillRect(0, 0, width, height);
          
          ctx.font = '10px "JetBrains Mono"';
          
          particles.forEach(p => {
            p.x += p.vx; 
            p.y += p.vy;
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;
            
            p.life -= 0.2;
            if (p.life < 0) {
              p.char = chars[Math.floor(Math.random() * chars.length)];
              p.life = 100 + Math.random() * 100;
              p.isGlitch = Math.random() > 0.9;
            }

            ctx.fillStyle = p.isGlitch ? 'rgba(255, 30, 86, 0.8)' : 'rgba(140, 122, 133, 0.3)';
            ctx.fillText(p.char, p.x, p.y);
            
            // Connect close particles obscurely
            particles.forEach(p2 => {
              const dx = p.x - p2.x; 
              const dy = p.y - p2.y;
              if (dx*dx + dy*dy < 8000 && Math.random() > 0.98) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = p.isGlitch ? 'rgba(255, 30, 86, 0.1)' : 'rgba(59, 0, 255, 0.05)';
                ctx.stroke();
              }
            });
          });
          animationFrame = requestAnimationFrame(draw);
        };
        draw();

        handleResize = () => {
          width = window.innerWidth;
          height = window.innerHeight;
          if(canvasRef) canvasRef.width = width;
          if(canvasRef) canvasRef.height = height;
        };
        window.addEventListener('resize', handleResize);
      }
    }

    // Initial load animations
    if (textRef && terminalRef) {
      animate(
        Array.from(textRef.children),
        { opacity: [0, 1], y: [30, 0] },
        { delay: stagger(0.2), duration: 1, ease: [0.25, 0.1, 0.25, 1] }
      );
      animate(
        terminalRef,
        { opacity: [0, 1], x: [30, 0] },
        { delay: 0.8, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
      );
    }

    // Scroll animations
    if(architectureRef) {
      inView(architectureRef, (element) => {
        animate(element, { opacity: [0, 1], y: [50, 0] }, { duration: 1 });
      });
    }

    if(featuresRef) {
      inView(featuresRef, (element) => {
        const cards = element.querySelectorAll('.feature-card');
        animate(cards, { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15), duration: 0.8 });
      });
    }

    if(capabilitiesRef) {
      inView(capabilitiesRef, (element) => {
        const cards = element.querySelectorAll('.cap-card');
        animate(cards, { opacity: [0, 1], scale: [0.95, 1] }, { delay: stagger(0.15), duration: 0.8 });
      });
    }

    if(cliRef) {
      inView(cliRef, (element) => {
        animate(element, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 1 });
      });
    }
  });

  onDestroy(() => {
    if(animationFrame) cancelAnimationFrame(animationFrame);
    if(cursorInterval) clearInterval(cursorInterval);
    if(textScrambleInterval) clearInterval(textScrambleInterval);
    if(initialTimeout) clearTimeout(initialTimeout);
    terminalTimeouts.forEach(clearTimeout);
    if(handleResize) window.removeEventListener('resize', handleResize);
  });

  const terminalLines = [
    { text: "> mairu-agent daemon ./src -P my-project", delay: 0 },
    { text: "[mairu-daemon] initializing context graph...", delay: 800 },
    { text: "[mairu-daemon] forging AST nodes into memory...", delay: 1500 },
    { text: "[mairu-daemon] megalith constructed. 124 nodes synchronized.", delay: 2500, success: true },
    { text: "> mairu-agent vibe-mutation 'remember we use gRPC for internal services'", delay: 3500 },
    { text: "[SUCCESS] Memory forged in the cromlech.", delay: 4500, success: true },
    { text: "> mairu-agent memory search 'authentication architecture'", delay: 6000 },
    { text: "[FOUND] Vector + Full-Text match. Importance: 9.2", delay: 7000, highlight: true }
  ];

  let visibleLines = 0;
  $: if (showTerminal) {
    terminalLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        visibleLines = index + 1;
      }, line.delay);
      terminalTimeouts.push(timeout);
    });
  }
</script>

<div class="relative min-h-screen text-[#e6e0d8] overflow-hidden font-sans bg-[#060205]">
  
  <!-- Dreamy Orb & Swarm Background -->
  <canvas bind:this={canvasRef} class="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-50"></canvas>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-60">
    <div class="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#ff1e56] blur-[120px] mix-blend-screen animate-[float_20s_infinite_alternate_ease-in-out] opacity-20"></div>
    <div class="absolute top-[30%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#3b00ff] blur-[150px] mix-blend-screen animate-[float_25s_infinite_alternate-reverse_ease-in-out] opacity-20"></div>
    <div class="absolute -bottom-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[#ff1e56] blur-[140px] mix-blend-screen animate-[float_30s_infinite_alternate_ease-in-out] opacity-10"></div>
    <!-- Noise overlay -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
  </div>

  <!-- Navigation -->
  <nav class="relative z-20 flex justify-between items-center px-8 md:px-12 py-8 bg-transparent">
    <div class="flex items-center gap-3 group cursor-pointer">
      <div class="relative">
        <Database class="text-[#ff1e56] group-hover:scale-110 transition-transform duration-500" size={28} />
        <div class="absolute inset-0 bg-[#ff1e56] blur-[15px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
      </div>
      <span class="text-2xl font-serif text-white uppercase tracking-widest fever-warp">MAIRU</span>
    </div>
    
    <div class="hidden md:flex items-center gap-10 text-sm tracking-[0.15em] text-[#8c7a85] font-medium">
      <a href="#architecture" aria-label="Go to Architecture" class="hover:text-white transition-colors cursor-pointer">Architecture</a>
      <a href="#features" aria-label="Go to Features" class="hover:text-white transition-colors cursor-pointer">Features</a>
      <a href="#/docs" aria-label="Go to Documentation" class="text-[#ff1e56] hover:text-[#ff4a76] transition-colors cursor-pointer font-bold">Documentation</a>
    </div>

    <a href="https://github.com/enekos/mairu" aria-label="Visit Github repository" target="_blank" class="px-6 py-2 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-xs uppercase flex items-center gap-2 backdrop-blur-md">
      <TerminalSquare size={14} aria-hidden="true" /> Github
    </a>
  </nav>

  <!-- Hero -->
  <main class="relative z-10 max-w-7xl mx-auto px-8 md:px-12 pt-20 pb-40" bind:this={heroRef}>
    <div class="flex flex-col lg:flex-row items-center justify-between gap-16">
      
      <!-- Left Text -->
      <div class="flex-1 space-y-8" bind:this={textRef}>
        <div class="inline-flex items-center gap-3 px-4 py-1.5 border border-[#ff1e56]/30 rounded-full bg-[#ff1e56]/5 text-[#ff1e56] text-xs font-bold tracking-widest uppercase">
          <Flame size={12} class="animate-pulse" aria-hidden="true" /> The Awakening
        </div>
        
        <h1 class="text-6xl md:text-7xl lg:text-[6rem] font-serif leading-[0.95] text-white">
          {heroTitle} <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#ff1e56] to-[#3b00ff] fever-warp glitch-hover">{heroSubtitle}</span>
        </h1>
        
        <p class="text-lg text-[#8c7a85] max-w-xl leading-relaxed font-light">
          Mairu is an autonomous coding agent backed by a dynamic memory engine. Use it as your primary developer, or inject its living, breathing digital cromlech into other tools.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 pt-6">
          <a href="#/docs" aria-label="Read the documentation" class="relative overflow-hidden px-8 py-4 bg-[#ff1e56] text-white rounded-full font-bold tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,30,86,0.5)] flex items-center justify-center gap-2 group cursor-pointer border border-[#ff1e56]">
            <span class="relative z-10 flex items-center gap-2">READ THE DOCS <ArrowRight size={16} class="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></span>
          </a>
          <div class="px-8 py-4 border border-white/10 rounded-full text-[#8c7a85] tracking-widest text-sm flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md font-mono select-all">
            <span class="text-[#ff1e56] select-none">$</span> clone enekos/mairu
          </div>
        </div>
      </div>

      <!-- Right Visual (Terminal) -->
      <div class="flex-1 w-full max-w-xl relative perspective-[1200px]" bind:this={terminalRef}>
        <div class="relative rounded-xl bg-[#0a030b]/80 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-2xl transition-transform duration-700 hover:-rotate-y-2 hover:rotate-x-2">
          
          <div class="flex items-center px-4 py-3 bg-black/40 border-b border-white/5">
            <div class="flex space-x-2">
              <div class="w-3 h-3 rounded-full bg-[#ff1e56]/80"></div>
              <div class="w-3 h-3 rounded-full bg-white/20"></div>
              <div class="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
            <div class="mx-auto text-xs text-[#8c7a85] font-mono opacity-80">mairu_daemon</div>
          </div>
          
          <div class="p-6 font-mono text-[13px] h-80 overflow-y-auto leading-relaxed custom-scrollbar">
            {#if showTerminal}
              {#each terminalLines.slice(0, visibleLines) as line}
                <div class="mb-2 terminal-line text-ellipsis">
                  {#if line.text.startsWith('>')}
                     <span class="text-[#ff1e56]">~</span> <span class="text-white">{line.text.substring(2)}</span>
                  {:else if line.success}
                     <span class="text-white font-bold">{line.text}</span>
                  {:else if line.highlight}
                     <span class="text-[#ff1e56] font-bold fever-warp">{line.text}</span>
                  {:else}
                     <span class="text-[#8c7a85]">{line.text}</span>
                  {/if}
                </div>
              {/each}
              <div class="flex items-center text-white mt-1">
                <span class="text-[#ff1e56]">~</span>&nbsp;<span class={cursorVisible ? 'opacity-100' : 'opacity-0'}>█</span>
              </div>
            {/if}
          </div>
        </div>

        <div class="absolute -right-12 -bottom-12 w-32 h-32 bg-[#ff1e56]/5 border border-[#ff1e56]/20 rounded-full flex items-center justify-center animate-[float_6s_ease-in-out_infinite] backdrop-blur-xl z-20">
          <Network class="text-[#ff1e56] fever-warp" size={32} />
        </div>
      </div>

    </div>
  </main>

  <!-- Architecture -->
  <section id="architecture" class="relative z-10 py-32 bg-[#0a030b] border-y border-white/5" bind:this={architectureRef}>
    <div class="max-w-6xl mx-auto px-6 text-center">
      <div class="inline-flex items-center gap-2 text-[#8c7a85] text-xs font-bold tracking-[0.2em] uppercase mb-8">
        Architecture Stack
      </div>
      
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 font-mono text-xs uppercase tracking-widest">
        <div class="p-8 bg-[#110515] border border-white/5 rounded-xl min-w-[240px] hover:border-[#ff1e56]/50 transition-colors relative group">
          <Cpu class="mx-auto mb-4 text-[#8c7a85] group-hover:text-white transition-colors" size={28} />
          <span class="block text-[10px] text-[#ff1e56] mb-2 font-bold">Runtime</span>
          <span class="text-white">Go 1.25+</span>
        </div>
        
        <div class="text-[#8c7a85]">——</div>
        
        <div class="p-8 bg-[#110515] border border-white/5 rounded-xl min-w-[240px] hover:border-[#3b00ff]/50 transition-colors relative group">
          <Database class="mx-auto mb-4 text-[#8c7a85] group-hover:text-white transition-colors" size={28} />
          <span class="block text-[10px] text-[#3b00ff] mb-2 font-bold">Engine</span>
          <span class="text-white">Meilisearch</span>
        </div>

        <div class="text-[#8c7a85]">——</div>

        <div class="p-8 bg-[#110515] border border-[#ff1e56]/30 rounded-xl min-w-[240px] shadow-[0_0_30px_rgba(255,30,86,0.1)] relative group">
          <BrainCircuit class="mx-auto mb-4 text-[#ff1e56] fever-warp" size={28} />
          <span class="block text-[10px] text-[#ff1e56] mb-2 font-bold">Intelligence</span>
          <span class="text-white">Gemini Embeddings</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" class="relative z-10 py-40" bind:this={featuresRef}>
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-24">
        <h2 class="text-5xl md:text-6xl font-serif text-white mb-6">
          The Pillars of <span class="italic text-[#ff1e56]">Context</span>
        </h2>
        <p class="text-[#8c7a85] max-w-2xl mx-auto text-lg font-light">
          Store and retrieve context with ancient precision. Let AI agents navigate massive codebases autonomously without losing their minds.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-[#ff1e56]/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-[#ff1e56]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Search class="text-[#ff1e56] mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Hybrid Retrieval</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Vector cosine similarity fused with full-text Meilisearch. App-side re-ranking applies exponential recency decay and importance boosting.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-[#3b00ff]/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-[#3b00ff]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Layers class="text-[#3b00ff] mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">AST Daemon</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Silent background watcher extracting full symbol graphs and translating code logic into Natural Language without expensive LLM calls.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-white/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Network class="text-white mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Context Trees</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Hierarchical knowledge trees linking disparate files, symbols, and architecture notes into a unified, navigable graph of the project.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-[#ff1e56]/20 p-10 rounded-2xl hover:border-[#ff1e56] transition-all duration-500 group shadow-[0_0_20px_rgba(255,30,86,0.05)] hover:shadow-[0_0_40px_rgba(255,30,86,0.15)] relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-[#ff1e56]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Zap class="text-[#ff1e56] mb-6 group-hover:-translate-y-2 transition-transform duration-500 fever-warp relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Vibe Mutations</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Tell Mairu what to remember in natural language. The agent automatically orchestrates search, planning, and memory forging.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-[#3b00ff]/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-[#3b00ff]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Hourglass class="text-[#3b00ff] mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Biological Decay</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Memories are not static. Unused vectors decay in relevance over time through exponential half-life algorithms, keeping the active context hyper-focused.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-[#3b00ff]/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-[#3b00ff]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Monitor class="text-[#3b00ff] mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Browser & Visual Context</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Give agents real-time browser awareness. A Native Messaging extension syncs DOM text, visual bounds, and errors, exposing remote execution hooks.
          </p>
        </div>

        <div class="feature-card bg-[#110515] border border-white/5 p-10 rounded-2xl hover:border-white/30 transition-all duration-500 group relative overflow-hidden">
          <div class="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          <Share2 class="text-white mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" size={36} />
          <h3 class="text-xl font-serif text-white mb-4 relative z-10 glitch-hover inline-block max-w-full">Native Agent & Hive Mind</h3>
          <p class="text-[#8c7a85] text-sm leading-relaxed font-light relative z-10 group-hover:text-white/80 transition-colors">
            Run Mairu as a standalone autonomous coding agent, or sync Aider, Claude, and Opencode simultaneously against its central Meilisearch knowledge graph.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Agentic Strengths -->
  <section id="agentic-capabilities" class="relative z-10 py-40 border-t border-white/5 bg-[#0a030b]" bind:this={capabilitiesRef}>
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 text-[#3b00ff] text-xs font-bold tracking-[0.2em] uppercase mb-6 font-mono">
            <Bot size={14} /> Agentic Capabilities
          </div>
          <h2 class="text-5xl md:text-6xl font-serif text-white leading-[1.1]">
            Built for <span class="text-[#3b00ff] italic fever-warp glitch-hover inline-block">Autonomy.</span>
          </h2>
        </div>
        <p class="text-[#8c7a85] text-lg font-light max-w-md pb-2">
          Mairu actively resists context entropy. It provides agents with the native tools to self-manage, deduplicate, and traverse knowledge without hallucinations.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Strength 1 -->
        <div class="cap-card bg-[#110515] border border-white/5 p-10 rounded-2xl relative overflow-hidden group hover:border-[#ff1e56]/30 transition-all duration-500">
          <div class="absolute inset-0 bg-gradient-to-b from-[#ff1e56]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <GitMerge class="text-[#ff1e56] mb-6 relative z-10" size={32} />
          <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full relative z-10">Semantic Deduplication</h3>
          <p class="text-[#8c7a85] font-light leading-relaxed mb-6 relative z-10 group-hover:text-white/80 transition-colors">
            When an agent stores a new vibe-mutation, Mairu intercepts it. An internal LLM evaluates the vector similarity of existing facts to autonomously <code class="text-white bg-white/10 px-1 rounded text-xs font-mono">CREATE</code>, <code class="text-[#3b00ff] bg-white/10 px-1 rounded text-xs font-mono">UPDATE</code>, or <code class="text-[#ff1e56] bg-white/10 px-1 rounded text-xs font-mono">SKIP</code>, preventing context window bloat.
          </p>
          <div class="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-[#8c7a85] relative z-10 shadow-inner">
            <div class="text-[#ff1e56] mb-1">> evaluating memory collision...</div>
            <div>[SIMILARITY] 0.88 -> "Auth uses JWT"</div>
            <div class="text-white mt-1">[ACTION] UPDATE -> appending new rules</div>
          </div>
        </div>

        <!-- Strength 2 -->
        <div class="cap-card bg-[#110515] border border-white/5 p-10 rounded-2xl relative overflow-hidden group hover:border-[#3b00ff]/30 transition-all duration-500">
          <div class="absolute inset-0 bg-gradient-to-b from-[#3b00ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Sparkles class="text-[#3b00ff] mb-6 relative z-10" size={32} />
          <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full relative z-10">Contextual Self-Healing</h3>
          <p class="text-[#8c7a85] font-light leading-relaxed relative z-10 group-hover:text-white/80 transition-colors">
            Agents don't need to manually read hundreds of files to know what changed. The AST daemon silently tracks file modifications, repairs the knowledge graph, and updates the Natural Language summaries in real-time.
          </p>
        </div>

        <!-- Strength 3 -->
        <div class="cap-card bg-[#110515] border border-white/5 p-10 rounded-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-500">
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Workflow class="text-white mb-6 relative z-10" size={32} />
          <h3 class="text-xl font-serif text-white mb-4 glitch-hover inline-block max-w-full relative z-10">Conceptual Traversal</h3>
          <p class="text-[#8c7a85] font-light leading-relaxed relative z-10 group-hover:text-white/80 transition-colors">
            Instead of grepping noisy strings, agents traverse the project conceptually via <code class="text-white bg-white/10 px-1 rounded text-xs font-mono">contextfs://</code> URIs. This allows them to zoom out to high-level architectural nodes, or zoom in to specific AST payloads seamlessly.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Docs Hook / CLI -->
  <section class="relative z-10 py-32 border-t border-white/5" bind:this={cliRef}>
    <div class="max-w-4xl mx-auto px-6 text-center">
      <Terminal size={48} class="mx-auto text-[#ff1e56] mb-8 fever-warp" />
      <h2 class="text-4xl md:text-5xl font-serif text-white mb-6">
        Ready to command the <span class="italic text-[#ff1e56]">Cromlech?</span>
      </h2>
      <p class="text-[#8c7a85] text-lg mb-10 font-light">
        Integrate Mairu directly into Claude or Opencode. Agents should proactively search memories and store important discoveries.
      </p>
      <a href="#/docs" class="inline-flex px-10 py-4 bg-white text-black rounded-full font-bold tracking-widest text-sm hover:bg-[#ff1e56] hover:text-white transition-all duration-300">
        READ THE FULL DOCUMENTATION
      </a>
    </div>
  </section>

  <footer class="relative z-10 border-t border-white/5 py-12 bg-[#060205]">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[#8c7a85] text-sm">
      <div class="flex items-center gap-3 font-serif text-xl text-white">
        <Database size={20} class="text-[#ff1e56]" /> Mairu
      </div>
      <div class="tracking-widest uppercase text-xs">
        Forged in the void.
      </div>
    </div>
  </footer>

</div>


