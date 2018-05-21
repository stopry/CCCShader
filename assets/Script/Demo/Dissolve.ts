import Util from '../Util/Util';
import DissolveShader from '../Shader/Dissolve.Shader';

const {ccclass,property,executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Dissovle extends cc.Component{

    util:Util = new Util;

    //目标图像
    @property(cc.Sprite)
    cardImage:cc.Sprite = null;

    //噪音纹理
    @property(cc.SpriteFrame)
    noiseTexture:cc.SpriteFrame = null;

    program:cc.GLProgram;

    starTime:number = Date.now();
    time:number = 0;

    onLoad(){
        this.enabled = false;
    }
    //溶解
    useDissolve(){
        //绑定噪音纹理
        let texture1 = this.noiseTexture.getTexture();
        let gltext1 = texture1._glID;
        if(!cc.sys.isNative){
            cc.gl.bindTexture2DN(1,texture1);
        }

        this.program = this.util.useShader(this.cardImage,'dissolve',DissolveShader);

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformTexture("texture1", gltext1);
        } else {
            let ba = this.program.getUniformLocationForName("time");
            let text1 = this.program.getUniformLocationForName("texture1");
            this.program.setUniformLocationWith1f(ba, this.time);
            this.program.setUniformLocationWith1i(text1, 1);
        }


        this.program.use();

        this.enabled = true;

    }
    update(dt){
        //溶解速度
        this.time += 0.008;
        if(this.program){
            this.program.use();
            if(cc.sys.isNative){
                let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("time",this.time);
            }else{
                let ct = this.program.getUniformLocationForName("time");
                this.program.setUniformLocationWith1f(ct,this.time);
            }
        }
    }
}