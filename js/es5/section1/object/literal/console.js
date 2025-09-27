const console = {
    // terminal print
    log : function(message){
        if (typeof process !== "undefined" && process.stdout) {
            // Node.js 환경
            process.stdout.write(message + "\n");
          } else {
            // 브라우저 환경
            window.console.log(message);
          }
    }
}

export default console;