import React from 'react';
import ReactDOM from 'react-dom';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: null};
    console.log('Bubble popup');
  }

  componentDidMount() {
    // Get the active tab and store it in component state.
    chrome.tabs.query({active: true}, tabs => {
      this.setState({activeTab: tabs[0]});
    });
  }

  analyzeText() {
      console.log('Analyze');
      browser.tabs.executeScript({
          file: 'dist/content.js'
      }).then(function(result) {
          console.log('Success!', result);
          result.forEach(function(item) {
              console.log('Result item:', item);
          });
      }, function(error) {
          console.log('Error!', error);
      });
  }

  render() {
    const {activeTab} = this.state;
    return (
      <div>
        <h1>InfoBubbles</h1>
        <p>
          Active tab: {activeTab ? activeTab.url : '[waiting for result]'}
        </p>
        <button onClick={this.analyzeText}>Analyze</button>
      </div>
    );
  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));

/*
var documentText = function() {
    return "some text";
}

var bubblePort = browser.runtime.connect({name:"bubble-scan"});
var bubblename = document.querySelector('#bubblename');
var button = document.querySelector('#classify');

button.onclick = function(e) {
    console.log('clickity');
    bubblePort.postMessage({
        type: 'PAGE_TEXT',
        title: 'document title',
        text: documentText()
    });
};

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('popped up');
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});
*/
