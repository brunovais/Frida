/**
 12/2024
 This script bypass native flutter ssl pinning @android
 by @brunovais

 WARNING: The offset 0x3b1834 may change depending on the version of libflutter.so
 
 */
Interceptor.attach(Module.findExportByName(null, "android_dlopen_ext"), {
    onEnter: function (args) {
        var lib = args[0].readCString();
        if (lib && lib.includes("libflutter.so")) {
            this.hook = true;
        }
    },
    onLeave: function (retval) {
        if (this.hook) {
            var module = Module.findBaseAddress("libflutter.so");
            if (module) {
                //
                var targetAddress = module.add(0x3b1834);
                Interceptor.attach(targetAddress, {
                    onLeave: function (ret) {
                        console.log("[ + ] Flutter SSL Cert Chain");
                        ret.replace(0x1);
                    }
                });
            } else {
                console.error("[ - ] Módulo libflutter.so não encontrado!");
            }
        }
    }
});