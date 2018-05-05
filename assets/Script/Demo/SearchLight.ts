import Util from '../Util/Util';
import SearchLightShader from '../Shader/Search-Light.Shader';

const {ccclass,property,executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class SearchLight extends cc.Component{
    @property(cc.Sprite)
    logoImg:cc.Sprite = null;

    util:Util = new Util;

    program:cc.GLProgram;
    startTime:number = Date.now();
    time:number = 0;

    resolution = {x:0.0,y:0.0};
    mouse = {x:0.0,y:0.0};

    onLoad(){

        this.resolution.x = (this.logoImg.node.getContentSize().width);
        this.resolution.y = (this.logoImg.node.getContentSize().height);  
        console.log(this.resolution);  
        this.mouse.x = 50.;
        this.mouse.y = 40.;
        let self = this;

        this.logoImg.node.on(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch)=>{
            let touchPos = this.logoImg.node.convertTouchToNodeSpaceAR(event.touch);
            this.mouse.x = touchPos.x;
            this.mouse.y = touchPos.y;
            this.changeLight();
        },this);

        this.logoImg.node.on(cc.Node.EventType.TOUCH_MOVE,(event:cc.Event.EventTouch)=>{
            let touchPos = this.logoImg.node.convertTouchToNodeSpaceAR(event.touch);
            this.mouse.x = touchPos.x;
            this.mouse.y = touchPos.y;
            this.changeLight();
        },this);
        
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // cc.log('touch end');
        }, this);


        this.program = this.util.useShader(this.logoImg,'searchLight',SearchLightShader);

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformVec2("resolution", this.resolution);
            glProgram_state.setUniformVec2( "mouse", this.mouse );
        } else {
            let res = this.program.getUniformLocationForName( "resolution" );
            let ms = this.program.getUniformLocationForName("mouse");
            this.program.setUniformLocationWith2f( res, this.resolution.x,this.resolution.y );
            this.program.setUniformLocationWith2f(ms, this.mouse.x,this.mouse.y);
        }
    }
    changeLight(){
        if(this.program){
            this.program.use();
            if(cc.sys.isNative){
                let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glProgram_state.setUniformVec2('resolution',this.resolution);
                glProgram_state.setUniformVec2('mouse',this.mouse);
            }else{
                let res = this.program.getUniformLocationForName('resolution');
                let ms = this.program.getUniformLocationForName('mouse');
                this.program.setUniformLocationWith2f(res,this.resolution.x,this.resolution.y);
                this.program.setUniformLocationWith2f(ms,this.mouse.x,this.mouse.y);
            }
        }
    }
    update(dt){

    }
}