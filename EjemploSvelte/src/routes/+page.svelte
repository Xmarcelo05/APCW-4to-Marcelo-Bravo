<script>
	//JavaScript estándar
	let contador = 0;

	function incrementar() {
		//Reactividad
		contador = contador + 1;
	}
</script>

<main>
	<h1>El número es: {contador}</h1>
	<button on:click={incrementar}>
		Sumar +1
	</button>
</main>

<style>
	/*Estilos: Esto solo afecta a este componente*/
	h1 {
		color: #ff3e00;
		font-family: sans-serif;
	}
	
	button {
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>