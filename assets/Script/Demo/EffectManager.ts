import Util from '../Util/Util';
const {ccclass,property,executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class EffectManager extends cc.Component{

    defaultVert:string = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        attribute vec4 a_color;
        varying vec2 v_texCoord;
        varying vec4 v_fragmentColor;
        void main()
        {
            gl_Position = CC_PMatrix * a_position;
            v_fragmentColor = a_color;
            v_texCoord = a_texCoord;
        }
    `

    @property(cc.Sprite)
    logoImage:cc.Sprite = null;
    
    @property(cc.String)
    shaderName:string = 'clover';

    util:Util = new Util;
    startTime:number = Date.now();
    time:number = 0;
    resolution = {x:0,y:0};
    program:cc.GLProgram;
    effect = {vert:'',frag:''};

    onLoad(){

        this.resolution.x = (this.node.getContentSize().width);
        this.resolution.y = (this.node.getContentSize().height);

        this.useShader()
    }
    async useShader(){
        this.effect.vert = this.defaultVert;
        this.effect.frag = await this.loadShader();

        this.program = this.util.useShader(this.node.getComponent(cc.Sprite),this.shaderName,this.effect);
        
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformVec2( "resolution", this.resolution );
        } else {
            let ba = this.program.getUniformLocationForName("time");
            let res = this.program.getUniformLocationForName( "resolution" );
            this.program.setUniformLocationWith1f(ba, this.time);
            this.program.setUniformLocationWith2f( res, this.resolution.x,this.resolution.y );
        }
    }
    public async loadShader(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            cc.loader.loadRes(this.shaderName,(err,res)=>{
                cc.log(res);
                if(err){
                    cc.log(err);
                    reject(false);
                }else{
                    resolve(res);
                }
            })
        })
    }
    updateParameters() {
        this.time = (Date.now() - this.startTime) / 1000;
    }
    update(dt){
        this.updateParameters();
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