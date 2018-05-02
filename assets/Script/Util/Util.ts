export default class Util{
    //使用shader
    shaderPrograms:any = {};
    useShader(sprite,shaderName,shader){
        let glProgram = this.shaderPrograms[shaderName];
        if(!glProgram){
            glProgram = new cc.GLProgram();
            let vert = shader.vert;
            let frag = shader.frag;
            glProgram.initWithString(vert,frag);
            if(!cc.sys.isNative){
                glProgram.initWithVertexShaderByteArray(vert,frag);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION,cc.macro.VERTEX_ATTRIB_POSITION);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR,cc.macro.VERTEX_ATTRIB_COLOR);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD,cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            }
            glProgram.link();
            glProgram.updateUniforms();
            glProgram.use();
            this.shaderPrograms[shaderName] = glProgram;
        }
        this.setProgram(sprite._sgNode,glProgram);
        return glProgram;
    };
    setProgram(node:any,program:any){
        if(cc.sys.isNative){
            let glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }else{
            node.setShaderProgram(program);
        }
    }
}
