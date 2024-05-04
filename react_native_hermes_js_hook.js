/**
 04/2024
 this script shows some js of Hermes Engine used by react native @android
 by @brunovais
 */
Interceptor.attach(Module.findExportByName('libjsi.so', '_ZN8facebook3jsi7Runtime23createValueFromJsonUtf8EPKhm'), {
    onEnter: function(args) {
        var address = ptr(args[1]);
        try {
            var stringData = Memory.readUtf8String(address);
            console.log('JSString:', stringData);
        } catch (e) {
            console.log('Failed to interpret data as UTF-8 string:', e.message);
        }
    }
});