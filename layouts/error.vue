<template v-if="error.statusCode === 404">
  <div id="main">
    <div class="fof">
      <h1>Error 404</h1>
    </div>
  </div>
</template>

<script>
// https://codepen.io/akashrajendra/pen/JKKRvQ

export default {
  head: {
    title: 'Error 404',
  }
}
</script>

<style scoped>
* {
    transition: all 0.6s;
}

html {
  height: 100%;
}

body {
  color: rgba(6, 102, 100, 0.8);
  margin: 0;
}

#main{
  display: table;
  width: 100%;
  height: calc(100vh - 130px);
  text-align: center;
}

.fof{
	display: table-cell;
	vertical-align: middle;
}

.fof h1{
	font-size: 50px;
  font-weight: bold;
	display: inline-block;
	padding-right: 12px;
	animation: type .5s alternate infinite;
  color: rgba(6, 102, 100, 0.8);
}

@keyframes type{
	from{box-shadow: inset -3px 0px 0px rgba(6, 102, 100, 0.8);}
	to{box-shadow: inset -3px 0px 0px transparent;}
}
</style>