var lt = require('lTimer');

var newT = new lt(500, "testTimer1");
newT.addCallback(function(dt) {
    console.log("### testTimer1 ticked, with deltaT = " + dt + " ###");
});

console.log("Starting timer.");
newT.start();

setTimeout(function() { newT.stop(); console.log("Stopping Timer."); }, 5000);

newT.addCallback(function(dt) {
    console.log("*** testTimer1 ticked, with deltaT = " + dt + " ***");
});

console.log("Starting timer.");
setTimeout(function() {newT.start(); }, 6000);

var newT1 = new lt(100, "Timer2: ");

newT1.addCallback(function(dt) {
    console.log("@@@ Timer2 ticked, with deltaT = " + dt + " @@@");
});
//console.log("Starting Timer2.");
setTimeout(function() { newT1.start(); }, 5000);


setTimeout(function() { newT.stop(); newT1.stop(); console.log("Stopping Timers."); }, 15000);
