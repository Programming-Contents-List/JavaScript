const console = {
    // terminal print
    log : function(message){
        process.stdout.write(message + '\n');
    }
}

export default console;