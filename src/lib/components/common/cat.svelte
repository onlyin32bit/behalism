<script lang="ts">
    import body from '$lib/assets/body.svg';
    import armL from '$lib/assets/arm-l.svg';
    import armR from '$lib/assets/arm-r.svg';
    import head from '$lib/assets/favicon.png';
    import tail from '$lib/assets/tail.svg';

</script>

<div class="relative">
    <img class="absolute top-96 left-36 h-44" src={tail} alt="">
    <img class="absolute h-64 top-52 left-18" src={body} alt="">
    <img class="absolute top-60 h-40 left-8" src={armL} alt="">
    <img class="absolute top-60 left-52 h-40" src={armR} alt="">
    <img class="absolute h-80" src={head} alt="">
</div>

