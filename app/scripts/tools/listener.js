import $ from "jquery";

export default class Listener {
    constructor() {
        this.handlers = [];
        this.triggers = [];
        this.initeds = [];
        this.state = [];
        this.init();
    }
    updater() {
        setInterval(() => {
            this.update();
        }, 10);
    }
    update() {
        for (let key in this.triggers) {
            let trigger = this.triggers[key];
            if (trigger.el[trigger.field] != this.state[key]) {
                this.state[key] = trigger.el[trigger.field];
                this.trigger('change-' + key);
            }
        }
    }
    init() {
        this.state["body-height"] = document.body.offsetHeight;
        this.updater();
    }
    on(type, handler) {
        this.handlers.push({
            type: type,
            handler: handler,
        });
    }
    setTriggerChange(el, field, name) {
        if (!this.triggers[name]) {
            this.triggers[name] = {
                el: el,
                field: field,
                val: el[field]
            }
            return el[field];
        }
        else return false;
        /* Example
            listener.setTriggerChange(document.body,'offsetWidth','body-width')
            listener.on('change-body-width',function(){
                console.log('body-resize')
            })
        */
    }
    off(type, handler) {
        this.handlers.forEach((item, key) => {
            if (item.type == type) {
                if (item.handler == handler) {
                    this.handlers.splice(key, 1);
                }
            }
        });
    }
    trigger(type, data) {
        this.handlers.forEach((item) => {
            if (item.type == type) {
                if (data) {
                    item.handler(...data);
                } else {
                    item.handler();
                }
            }
        });
    }
    checkInit(name) {
        if (!this.initeds[name]) {
            this.initeds[name] = true;
            return true;
        } else return false;
    }
}
