
export class LStore {
    /**
     *
     * @param key
     * @param def
     */
    public static get(key:string, def = undefined) {
        if (!window['store']){
            return def;
        }
        return window['store'].get('live2d.'+key, def)
    }

    public static set(key:string,val){
        if (!window['store']){
            return;
        }
        // iPhoneでのアルファ品質向上のためTypescriptではpremultipliedAlphaを採用
        return window['store'].set('live2d.'+key, val)
    }
}
