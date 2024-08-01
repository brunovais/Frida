/**
 07/2024
 this script shows all methods call chain in trace of one method
 */

var className = 'com.target.Class';
var methodName = 'methodTarget';

 function methodTrace(){
    var stackTrace = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new())
    stackTrace = stackTrace.replace("java.lang.Exception\n", "Method trace: \n")
    console.log(stackTrace)
  }

  Java.perform(function () {
    var TargetClass = Java.use(className);

    var targetMethod = TargetClass[methodName].overload();

    targetMethod.implementation = function () {
        methodTrace();
        var result = this[methodName]();

        return result;
    };
});
