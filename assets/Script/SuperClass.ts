const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class SuperClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    async onLoad() {
        // init logic
        //执行了子类的testAsync方法
        this.label.string = await this.testAsync();
    }

    //被子类方法覆盖 这个方法未执行
    protected async testAsync(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello, World!");
            }, 1000)
        })
    }
}
