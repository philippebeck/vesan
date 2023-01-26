<template>

  <!-- ERROR PAGE -->
  <CardElt>
    <template #header>
      <h1>Page Not Found !</h1>
    </template>

    <template #body>

      <!-- Image 404 -->
      <MediaElt src="/img/errors/error-404.webp" 
        alt="Error 404">
      </MediaElt>

      <!-- Link to Home -->
      <BtnElt href="/">
        <template #btn>
          <i class="fa-regular fa-hand-point-right"></i>
          Go back home ?
          <i class="fa-regular fa-hand-point-left"></i>
        </template>
      </BtnElt>
    </template>
  </CardElt>
</template>

<script>
export default {
  name: 'ErrorView'
}
</script>
