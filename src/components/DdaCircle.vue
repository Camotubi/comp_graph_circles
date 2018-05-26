<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter">
        <button class="button" @click="setNormal">Normal</button>
        <button class="button" @click="setAnimated">Animated</button>
        <input class="input" v-model="circleRadius" />
      </div>
      <div class="column">
        <div id="p5sketch">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P5 from 'p5'
export default {
  name: 'HelloWorld',
  mounted () {
    this.p5sKetchInit()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      colorList: [
        '#afeeee',
        '#0ee4ed',
        '#294f43',
        '#5aafcf',
        '#107974',
        '#2d2973',
        '#f0f9fa',
        '#ba5bb9'
      ],
      p5Sketch: {},
      circleRadius: 0,
      circleSketch: 'normal',
      canvasHeight: 500,
      canvasWidth: 500,
      clearCanvas: false,
      animatedSketchData: {
        x: 0,
        y: 0,
        rx: 0,
        currentStrokeIndex: 0
      }
    }
  },
  methods: {
    p5sKetchInit () {
      this.p5Sketch = new P5(sketch => {
        sketch.setup = () => {
          sketch.createCanvas(this.canvasHeight, this.canvasWidth)
          sketch.background(0)
          sketch.redraw()
        }
        sketch.draw = () => {
          if (this.clearCanvas) {
            sketch.background(0)
            this.clearCanvas = false
          }
          switch (this.circleSketch) {
            case 'normal':
              this.ddaCircle(sketch, this.circleRadius)
              break
            case 'animated':
              this.ddaCircleAnimatedFancy(sketch, this.circleRadius)
              break
            default:
              break
          }
        }
      }, 'p5sketch')
    },
    ddaCircle (sketch, radio) {
      let rx = radio
      let x = Math.round(radio)
      let y = 0
      sketch.stroke(255)
      sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      while (y <= x) {
        this.paintCircleStep(sketch, x, y)
        rx -= y / rx
        x = Math.round(rx)
        y++
      }
    },

    ddaCircleAnimatedFancy (sketch, radio) {
      const sk = this.animatedSketchData
      sketch.stroke(this.colorList[sk.currentStrokeIndex])
      sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
      this.paintCircleStep(sketch, sk.x, sk.y)
      sk.rx -= sk.y / sk.rx
      sk.x = Math.round(sk.rx)
      sk.y++
      if (sk.y > sk.x) {
        sk.y = 0
        sk.x = Math.round(radio)
        sk.rx = radio
        if (++sk.currentStrokeIndex >= this.colorList.length) {
          sk.currentStrokeIndex = 0
        }
      }
    },

    paintCircleStep (sketch, x, y) {
      sketch.point(x, y)
      sketch.point(y, x)
      sketch.point(-x, y)
      sketch.point(-y, x)
      sketch.point(x, -y)
      sketch.point(y, -x)
      sketch.point(-x, -y)
      sketch.point(-y, -x)
    },
    setAnimated () {
      this.circleSketch = 'animated'
    },
    setNormal () {
      this.circleSketch = 'normal'
    }

  },
  watch: {
    circleSketch () {
      this.clearCanvas = true
    },
    circleRadius (val) {
      this.clearCanvas = true
      this.animatedSketchData = {
        x: Math.round(val),
        y: 0,
        rx: val,
        currentStrokeIndex: 0
      }
    }
  }
}
</script>
<style>
</style>
