<template>
  <div class="main">
    <div class="columns">
      <div class="column is-one-fifth">
        <div class="field">
          <div class="linkbar">
            <div class="active">
              <router-link to="cdda">Circulo DDA</router-link>
            </div>
            <div>
              <router-link to="cb">Circulo Bresenham</router-link>
            </div>
            <div>
              <router-link to="e">Elipse Punto Medio</router-link>
            </div>
          </div>
          <div class="control">
            <label class="label">Radio:
              <input class="input" type="number" v-model="circleRadius" />
            </label>
            <label class="radio">Normal:</label>
            <input class="radio" value="normal" type="radio" @click="setNormal" v-model="circleSketch" />
            <label class="radio">Animado:</label>
            <input class="radio" value="animated" type="radio" @click="setAnimated" v-model="circleSketch" />
          </div>
        </div>
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
  props: {
    canvasColor: {
      default: 0
    }
  },
  beforeDestroy() {
    this.p5Sketch.remove()
  },
  mounted() {
    this.p5sKetchInit()
  },
  data() {
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
    p5sKetchInit() {
      this.p5Sketch = new P5(sketch => {
        sketch.setup = () => {
          sketch.createCanvas(this.canvasHeight, this.canvasWidth)
          sketch.background(this.canvasColor)
        }
        sketch.draw = () => {
          if (this.clearCanvas) {
            sketch.background(this.canvasColor)
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
    ddaCircle(sketch, radio) {
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

    ddaCircleAnimatedFancy(sketch, radio) {
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

    paintCircleStep(sketch, x, y) {
      sketch.point(x, y)
      sketch.point(y, x)
      sketch.point(-x, y)
      sketch.point(-y, x)
      sketch.point(x, -y)
      sketch.point(y, -x)
      sketch.point(-x, -y)
      sketch.point(-y, -x)
    },
    setAnimated() {
      this.circleSketch = 'animated'
    },
    setNormal() {
      this.circleSketch = 'normal'
    }

  },
  watch: {
    circleSketch() {
      this.clearCanvas = true
    },
    circleRadius(val) {
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
.main {
  color: hsl(0, 0%, 96%);
}
.label {
  color: hsl(204, 100%, 75%);
}
.linkbar {
  margin-bottom: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: inset 0 0 2px #000000;
  color: rgb(68, 68, 68);
}
.linkbar > div:hover {
  box-shadow: inset 0 0 2px #000000;
  background: rgb(180, 180, 180);
}

.linkbar > .active {
  box-shadow: inset 0 0 2px #000000;
  background: rgb(180, 180, 180);
}
</style>
