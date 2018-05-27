<template>
  <div class="main">
    <div class="columns">
      <div class="column is-one-fifth">
        <div class="field">
          <div class="linkbar">
            <div>
              <router-link to="cdda">Circulo DDA</router-link>
            </div>
            <div class="active">
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
    name: 'BresenCircle',
    props: {
        canvasColor: {
            default: 0
        }
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
                dx: 0,
                dy: 0,
                err: 0,
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
                            this.bresenCircle(sketch, this.circleRadius)
                            break
                        case 'animated':
                            this.bresenCircleAnimatedFancy(sketch, this.circleRadius)
                            break
                        default:
                            break
                    }
                }
            }, 'p5sketch')
        },
        bresenCircle(sketch, radio) {
            let x = radio - 1
            let y = 0
            let dy = 1
            let dx = 1
            let err = dx - (radio << 1)
            sketch.stroke(255)
            sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            while (x >= y) {
                this.paintCircleStep(sketch, x, y)
                if (err <= 0) {
                    y++
                    err += dy
                    dy += 2
                }
                if (err > 0) {
                    x--
                    dx += 2
                    err += dx - (radio << 1)
                }
            }
        },

        bresenCircleAnimatedFancy(sketch, radio) {
            const sk = this.animatedSketchData
            sketch.stroke(this.colorList[sk.currentStrokeIndex])
            sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            this.paintCircleStep(sketch, sk.x, sk.y)
            if (sk.err <= 0) {
                sk.y++
                sk.err += sk.dy
                sk.dy += 2
            }
            if (sk.err > 0) {
                sk.x--
                sk.dx += 2
                sk.err += sk.dx - (radio << 1)
            }
            if (sk.x < sk.y) {
                if (++sk.currentStrokeIndex >= this.colorList.length) {
                    sk.currentStrokeIndex = 0
                }
                this.animatedSketchData = {
                    x: radio - 1,
                    y: 0,
                    dx: 1,
                    dy: 1,
                    err: 1 - (radio << 1),
                    currentStrokeIndex: sk.currentStrokeIndex
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
                x: val - 1,
                y: 0,
                dx: 1,
                dy: 1,
                err: 1 - (val << 1),
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