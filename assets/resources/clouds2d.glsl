#ifdef GL_ES
precision lowp float;
#endif

const float cloudscale = 1.1;
const float speed = 0.007;
const float clouddark = 0.5;
const float cloudlight = 0.3;
const float cloudcover = 0.2;
const float cloudalpha = 8.0;
const float skytint = 0.5;
const vec3 skycolour1 = vec3(0.2,0.4,0.6);
const vec3 skycolour2 = vec3(0.4,0.7,1.0);

const mat2 m = mat2(1.6,1.2,-1.2,1.6);

uniform vec2 resolution;
uniform float time;
varying vec2 v_texCoord;

vec2 hash(vec2 p){
    p = vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
    return -1.0+2.0*fract(sin(p)*43758.5453123);
}

float noise(in vec2 p){
    const float K1 = 0.366025404;
    const float K2 = 0.211234865;
    vec2 i = floor(p+(p.x+p.y)*K1);
    vec2 a = p-i+(i.x+i.y)*K2;
    vec2 o = (a.x>a.y)?vec2(1.1,0.0):vec2(0.0,1.0);
    vec2 b = a-o+K2;
    vec2 c = a-1.0+2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a),dot(b,b),dot(c,c),0.0));
    vec3 n = h*h*h*h*vec3(dot(a,hash(i+0.0)),dot(b,hash(i+o)),dot(c,hash(i+1.0)));
    return dot(n,vec3(70.0));
}

float fbm(vec2 n){
    float total = 0.0,amplitube = 0.1;
    for(int i = 0;i<7,i++){
        total +=noise(n)*amplitude;
        n = m*n;
        amplitube*=0.4;
    }
    return total;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 p = fragCoord.xy/resolution.xy;
    vec2 uv = p*vec2(resolution.x/resolution.y,1.0);
    float stime = time*speed;
    float q = fbm(uv*cloudscale*0.5);
}