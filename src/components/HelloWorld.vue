<template>
  <div>
    <div id = "p5sketch">
    </div>
  </div>
</template>

<script>
import P5 from 'p5'
export default {
  name: 'HelloWorld',
  mounted () {
    new P5(sketch => {
      const x = 100
      const y = 100
      sketch.setup = () => {
        sketch.createCanvas(200, 200)
      }
      sketch.draw = () => {
        sketch.background(0)
        sketch.fill(255)
        sketch.rect(x, y, 50, 50)
      }
    }, 'p5sketch')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
</style>