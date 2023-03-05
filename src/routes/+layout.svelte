<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex gap-2">
					<img src="images/icon50.png" alt="app-logo" width="24"/>
					<strong class="text-xl uppercase">VIcon</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">

			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
