import  Util  from '../Util/Util';
import WavesShader from '../Shader/Waves.Shader';
const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Waves extends cc.Component{
    util:Util = new Util;
    @property(cc.Sprite)
    logo:cc.Sprite = null;
    @property(cc.Node)
    logoNode:cc.Node = null;
    startTime:number = Date.now();
    time:number = 0;
    program:cc.GLProgram;
    resolution = {x:0.0,y:0.0};

    sin;
    onLoad(){
        this.time = 0;
        this.resolution.x = (this.logoNode.getContentSize().width);
        this.resolution.y = (this.logoNode.getContentSize().height);
        this.useWater();
    }
    useWater(){
        this.program = this.util.useShader(this.logo,'waves',WavesShader);
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformVec2( "resolution", this.resolution );
        } else {
            let res = this.program.getUniformLocationForName( "resolution" );
            let ba = this.program.getUniformLocationForName("time");
            this.program.setUniformLocationWith2f( res, this.resolution.x,this.resolution.y );
            this.program.setUniformLocationWith1f(ba, this.time);
        }
    }
    update(dt){
        this.time = (Date.now() - this.startTime) / 1000;
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("time", this.time);
            } else {
                let ct = this.program.getUniformLocationForName("time");
                this.program.setUniformLocationWith1f(ct, this.time);
            }
        }
    }
    onDestroy(){

    }

}