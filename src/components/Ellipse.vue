<template>
    <div class="main">
        <div class="columns">
            <div class="column is-one-fifth">
                <div class="field">
                    <div class="linkbar">
                        <div>
                            <router-link to="cdda">Circulo DDA</router-link>
                        </div>
                        <div>
                            <router-link to="cb">Circulo Bresenham</router-link>
                        </div>
                        <div class="active">
                            <router-link to="e">Elipse Punto Medio</router-link>
                        </div>
                    </div>
                    <div class="control">
                        <label class="label">Radio x:
                            <input class="input" type="number" v-model="circleRadiusX" />
                        </label>
                        <label class="label">Radio y:
                            <input class="input" type="number" v-model="circleRadiusY" />
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
    name: 'Elipse',
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
            circleRadiusY: 0,
            circleRadiusX: 0,
            circleSketch: 'normal',
            canvasHeight: 500,
            canvasWidth: 500,
            clearCanvas: false,
            animatedSketchData: {
                x: 0,
                y: 0,
                p1: 0,
                p2: 0,
                dx: 0,
                dy: 0,
                part: 0,
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
                    sketch.redraw()
                }
                sketch.draw = () => {
                    if (this.clearCanvas) {
                        sketch.background(this.canvasColor)
                        this.clearCanvas = false
                    }
                    switch (this.circleSketch) {
                        case 'normal':
                            this.ellipse(sketch, this.circleRadiusX, this.circleRadiusY)
                            break
                        case 'animated':
                            this.ellipseAnimated(sketch, this.circleRadiusX, this.circleRadiusY)
                            break
                        default:
                            break
                    }
                }
            }, 'p5sketch')
        },
        ellipse(sketch, rx, ry) {
            sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            let p1 = Math.pow(ry, 2) - (Math.pow(rx, 2) * ry) + ((1 / 4) * Math.pow(rx, 2))
            let p2 = 0
            let x = 0
            let y = ry
            let dx = 2 * x * Math.pow(ry, 2)
            let dy = 2 * y * Math.pow(rx, 2)
            sketch.stroke(255)
            do {
                this.paintEllipseStep(sketch, x, y)
                if (p1 < 0) {
                    x++
                    dx += (2 * Math.pow(ry, 2))
                    p1 += dx + Math.pow(ry, 2)
                } else {
                    x++
                    y--
                    dx += (2 * Math.pow(ry, 2))
                    dy -= (2 * Math.pow(rx, 2))
                    p1 += dx - dy + Math.pow(ry, 2)
                }
            } while (dx < dy)
            do {
                this.paintEllipseStep(sketch, x, y)
                if (p2 > 0) {
                    y--
                    dy = dy - (2 * (Math.pow(rx, 2)))
                    p2 -= dy + Math.pow(rx, 2)
                }
                else {
                    x++
                    y--
                    dy -= (2 * (Math.pow(rx, 2)))
                    dx += (2 * (Math.pow(ry, 2)))
                    p2 += dx - dy + Math.pow(rx, 2)
                }
            } while (y > 0)
        },

        ellipseAnimated(sketch, rx, ry) {
            const sk = this.animatedSketchData
            sketch.stroke(this.colorList[sk.currentStrokeIndex])
            sketch.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            this.paintEllipseStep(sketch, sk.x, sk.y)
            if (sk.part === 0) {
                this.paintEllipseStep(sketch, sk.x, sk.y)
                if (sk.p1 < 0) {
                    sk.x++
                    sk.dx += (2 * Math.pow(ry, 2))
                    sk.p1 += sk.dx + Math.pow(ry, 2)
                } else {
                    sk.x++
                    sk.y--
                    sk.dx += (2 * Math.pow(ry, 2))
                    sk.dy -= (2 * Math.pow(rx, 2))
                    sk.p1 += sk.dx - sk.dy + Math.pow(ry, 2)
                }
                if (sk.dx + 100 >= sk.dy) {
                    sk.part = 1
                }
            } else {
                this.paintEllipseStep(sketch, sk.x, sk.y)
                if (sk.p2 > 0) {
                    sk.y--
                    sk.dy -= (2 * (Math.pow(rx, 2)))
                    sk.p2 -= sk.dy + Math.pow(rx, 2)
                }
                else {
                    sk.x++
                    sk.y--
                    sk.dy -= (2 * (Math.pow(rx, 2)))
                    sk.dx += (2 * (Math.pow(ry, 2)))
                    sk.p2 += sk.dx - sk.dy + Math.pow(rx, 2)
                }
                if (sk.y <= 0) {
                    sk.p1 = Math.pow(ry, 2) - (Math.pow(rx, 2) * ry) + ((1 / 4) * Math.pow(rx, 2))
                    sk.p2 = 0
                    sk.x = 0
                    sk.y = ry
                    sk.dx = 0
                    sk.dy = 2 * sk.y * Math.pow(rx, 2)
                    sk.part = 0
                    if (++sk.currentStrokeIndex >= this.colorList.length) {
                        sk.currentStrokeIndex = 0
                    }
                }
            }


        },

        paintEllipseStep(sketch, x, y) {
            sketch.point(x, y)
            sketch.point(-x, y)
            sketch.point(x, -y)
            sketch.point(-x, -y)
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
        circleRadiusY(val) {
            this.clearCanvas = true
            this.animatedSketchData = {
                p1: Math.pow(val, 2) - (Math.pow(this.circleRadiusX, 2) * val) + ((1 / 4) * Math.pow(this.circleRadiusX, 2)),
                p2: 0,
                x: 0,
                y: val,
                dx: 0,
                dy: 2 * val * Math.pow(this.circleRadiusX, 2),
                part: 0,
                currentStrokeIndex: 0
            }
        },
        circleRadiusX(val) {
            this.clearCanvas = true
            this.animatedSketchData = {
                p1: Math.pow(this.circleRadiusY, 2) - (Math.pow(val, 2) * this.circleRadiusY) + ((1 / 4) * Math.pow(val, 2)),
                p2: 0,
                x: 0,
                y: this.circleRadiusY,
                dx: 0,
                dy: 2 * this.circleRadiusY * Math.pow(val, 2),
                part: 0,
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
}</style>
