<script lang="ts">
  import { onMount } from 'svelte';
  import Landing from './Landing.svelte';
  import Docs from './Docs.svelte';

  let currentRoute = '/';

  function handleHashChange() {
    currentRoute = window.location.hash.replace('#', '') || '/';
    window.scrollTo(0, 0);
  }

  onMount(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  });
</script>

{#if currentRoute.startsWith('/docs')}
  <Docs />
{:else}
  <Landing />
{/if}
