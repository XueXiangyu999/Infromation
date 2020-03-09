<template>
    <div class="html">
         
    </div>
</template>

<script>
export default {
    props:['html'],
    mounted(){
        $('.html').html(this.html)
    }
}
</script>

<style>
.html{
    /* text-align: left */
}
</style>