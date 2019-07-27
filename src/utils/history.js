// 模拟历史记录堆栈
const History = {
    // 历史记录插件
    _history:[],
    // vue插件形式
    install(Vue) {
        // 提供vue插件所需安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History; 
            }
        })
    },
    // 入栈
    push(path) {
        this._history.push(path);
    },
    // 出栈
    pop() {
        this._history.pop();
    },
    // 判断能否后退，根据此时history数组长度
    canBack() {
        return this._history.length > 1;
    }

}
export default History;