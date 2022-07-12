let s; //shader
const SHADER_HEADER = `
#ifdef GL_ES
precision highp float;
#endif
`

let vs = `
${SHADER_HEADER}
attribute vec3 aPosition;
void main(){vec4 v=vec4(aPosition,1.);v.rg=v.rg*2.-1.;gl_Position=v;}
`

let fs = `
${SHADER_HEADER}
uniform vec2 resolution;
uniform float time;

void main(){
    //(0,0) at center of screen
    vec2 uv = (gl_FragCoord.xy - resolution * .5) / resolution.y; 
    vec3 col;
    col = vec3(uv,0.);
    gl_FragColor = vec4(col,1.);
}
`

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  s = createShader(vs,fs)
}

function draw() {
  shader(s);
  s.setUniform("resolution", [width, height]);
  s.setUniform("time", frameCount);
  rect(0, 0, width, height);
}

