console.log('InfoBubbles: Background script starting');

console.log('Require', require);

var bubblePort;

browser.runtime.onConnect.addListener(function(port) {
    bubblePort = port;
    bubblePort.onMessage.addListener(function(m) {
        console.log('InfoBubbles (message):', m);
    });
});
