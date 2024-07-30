/**
 07/2024
 this script shows all methods call chain in trace of one method
 */
function methodTrace(){
    var stackTrace = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new())
    stackTrace = stackTrace.replace("java.lang.Exception\n", "Method trace: \n")
  }
