#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    fragColor = vec4((fragCoord/time)*vec2(.005,.02), 1.0, 1.0);
}


void main(void){
	mainImage(gl_FragColor,gl_FragCoord.xy);
}

