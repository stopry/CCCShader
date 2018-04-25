import  Util  from '../Util/Util';
import GrayShader from '../Shader/Gray.Shader';
import FlickerShader from "../Shader/Flicker.Shader";
import WavesShader from "../Shader/Waves.Shader";
const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class GraySprite extends cc.Component{
    util:Util = new Util;
    @property(cc.Sprite)
    logo:cc.Sprite = null;

    _time;
    _sin;
    _program;

    startTime
    time;
    program:cc.GLProgram;
    onLoad(){

        // this.startTime = Date.now();
        // this.time = 0;
        // this.program = this.util.useShader(this.logo,'flicker',WavesShader);

        this._time = 0;
        this._sin = 0;
        this._program = this.util.useShader(this.logo,'flicker',FlickerShader);

    }
    start(){

    }
    update(dt){
        this._time += 2 * dt;
        this._sin = Math.sin(this._time);
        this._program.use();//加上use 否者浏览器上不兼容
        if(this._sin > 0.99){
            this._sin = 0;
            this._time = 0;
        }
        if(cc.sys.isNative){
            let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            glProgram_state.setUniformFloat("sys_time", this._sin);
        } else {
            this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("sys_time"), this._sin);
        }
    }

/*    update(dt){
        this.time = (Date.now() - this.startTime) / 1000;
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("time", this.time);
            } else {
                let ct = this.program.getUniformLocationForName("time");
                this.program.setUniformLocationWith1f(ct, this.time);
            }
        }
    }*/
    onDestroy(){

    }

}