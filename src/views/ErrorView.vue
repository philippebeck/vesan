<template>
  <CardElt>
    <template #header>
      <h1>Page Not Found !</h1>
    </template>
    
    <template #body>
      <MediaElt
        src="/img/errors/error-404.webp" 
        alt="Error 404">
      </MediaElt>

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
  name: 'ErrorView',
}
</script>
