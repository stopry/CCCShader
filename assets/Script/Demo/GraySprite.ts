import  Util  from '../Util/Util';
import GrayShader from '../Shader/Gray.Shader';
const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class GraySprite extends cc.Component{
    util:Util = new Util;
    @property(cc.Sprite)
    logo:cc.Sprite = null;
    program:cc.GLProgram;
    onLoad(){
        this.program = this.util.useShader(this.logo,'flicker',GrayShader);

    }
    start(){

    }
    update(dt){
        
    }
    onDestroy(){

    }

}