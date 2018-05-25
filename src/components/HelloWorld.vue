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
    this.ddaCircle(100)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ddaCircle (radio) {
      const canvasHeight = 200
      const canvasWidth = 200
      let rx = radio
      let x = Math.round(radio)
      let y = 0
      new P5(sketch => {
        sketch.setup = () => {
          sketch.createCanvas(canvasHeight, canvasWidth)
          sketch.background(0)
        }
        sketch.draw = () => {
          sketch.stroke(255)
          sketch.translate(canvasWidth / 2, canvasHeight / 2)
          while (y <= x) {
            sketch.point(x, y)
            sketch.point(y, x)
            sketch.point(-x, y)
            sketch.point(-y, x)
            sketch.point(x, -y)
            sketch.point(y, -x)
            sketch.point(-x, -y)
            sketch.point(-y, -x)
            rx -= y / rx
            x = Math.round(rx)
            y++
          }
        }
      }, 'p5sketch')
    }
  }
}
</script>
<style>
</style>