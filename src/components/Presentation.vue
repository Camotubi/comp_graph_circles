<template>
    <div id="main">
        <h2>Universidad Tecnológica de Panamá</h2>
        <h2>Facultad de Ingeniería de Sistemas Computacionales</h2>
        <h4>Materia</h4>
        <h5>Computación Gráfica &amp; Visual</h5>
        <h4>Profesor</h4>
        <h5>Nicholas Belis</h5>
        <h4>Tema</h4>
        <h5>Algoritmos de Discretización de Circulos y Elipses</h5>
        <h4>Integrantes</h4>
        <ul class="is-unstyled">
            <li>
                Acevedo, Roderik
            </li>
            <li>
                Henriquez, Roy
            </li>
            <li>
                Pan, Eddie
            </li>
            <li>
                Tuñón, Carlos
            </li>
        </ul>

        <div class="links">
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
    </div>
</template>
<style>
#main h1,
#main h2,
#main h3,
#main h4,
#main h5,
#main h6 {
  color: whitesmoke;
}
ul.is-unstyled {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 1.2em;
}
.links div {
  display: inline-block;
  margin-left: 2px;
}
div.links {
  margin: auto;
}
</style>
