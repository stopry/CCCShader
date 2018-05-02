
import Util from '../Util/Util';
import BlurShader from '../Shader/Blur.Shader';
const {ccclass,property,executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Blur extends cc.Component{
    util:Util = new Util;
    @property(cc.Sprite)
    logoImg:cc.Sprite = null;

    @property(cc.Slider)
    slider:cc.Slider = null;

    blurAmount = 0;

    program:cc.GLProgram;
    onLoad(){

        this.blurAmount = this.slider.progress/10;

        this.program = this.util.useShader(this.logoImg,'blur',BlurShader);

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("bluramount",this.blurAmount);
        } else {
            let ba = this.program.getUniformLocationForName("bluramount");
            this.program.setUniformLocationWith1f(ba, this.blurAmount);
        }
    };
    onSliderBlurAmount(slider: cc.Slider, eventType: any) {
        this.blurAmount = Number((this.slider.progress / 10).toFixed(3));
        this.changeBlurAmount(this.blurAmount);
    }    

    changeBlurAmount(amount: number) {
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformFloat("bluramount", this.blurAmount);
            } else {
                let ba = this.program.getUniformLocationForName("bluramount");
                this.program.setUniformLocationWith1f(ba, this.blurAmount);
            }
        }    
    }
    start(){

    };
    update(dt){

    };
    onDestroy(){

    }
}