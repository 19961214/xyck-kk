<template>
  <div id="app">
    <Deposit/>

  </div>
</template>

<script>
import Deposit from './pages/deposit/deposit'
export default {
  name: 'app',
  components: {
    Deposit
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;

}
</style>
