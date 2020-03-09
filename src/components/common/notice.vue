<template>
    <div class="Notice"><slot></slot></div>
</template>
<script>
export default {
    name:"Notice"
}
</script>
<style>
    .Notice{
        height: 14px;
        width: 18px;
        border-radius: 7px;
        background-color: red;
        overflow: hidden;
        text-align: center;
    }
    
</style>

