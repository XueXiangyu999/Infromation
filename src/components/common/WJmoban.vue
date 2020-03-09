<template>
    <div class="WJmoban">
            <svg class="icon WJ_icon" aria-hidden="true">
            <use :xlink:href="WJclass" ></use>
          </svg>
          <p>{{WJtext}}</p>
        </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:['WJclass','WJtext'],
}
</script>
<style>
.WJ_icon{
    height: 5em;
    width:5em;
    margin-top: 2em;
    margin-bottom: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>