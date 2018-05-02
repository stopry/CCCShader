import  Util  from '../Util/Util';
import FlickerShader from '../Shader/Flicker.Shader';
const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Flicker extends cc.Component{
    util:Util = new Util;
    @property(cc.Sprite)
    logo:cc.Sprite = null;
    startTime
    time;
    sin;
    program:cc.GLProgram;
    onLoad(){
        this.time = 0;
        this.sin = 0;
        this.program = this.util.useShader(this.logo,'flicker',FlickerShader);

    }
    start(){

    }
    update(dt){
        this.time += 2 * dt;
        this.sin = Math.sin(this.time);
        this.program.use();//加上use 否者浏览器上不兼容
        if(this.sin > 0.99){
            this.sin = 0;
            this.time = 0;
        }
        if(cc.sys.isNative){
            let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("sys_time", this.sin);
        } else {
            this.program.setUniformLocationWith1f(this.program.getUniformLocationForName("sys_time"), this.sin);
        }
    }
    onDestroy(){

    }

}