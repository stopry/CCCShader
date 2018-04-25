import SuperClass from "./SuperClass";
const {ccclass} = cc._decorator;

@ccclass
export default class ChildClass extends SuperClass {
    //重写了父类的 testAsync 只执行这个异步方法
    protected async testAsync(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello, World! From ChildClass!");
            }, 3000);
        });
    }
}
