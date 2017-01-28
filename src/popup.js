import React from 'react';
import ReactDOM from 'react-dom';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    console.log('Bubble popup');

    this.state = {
        tag: '',
        matchedTag: '',
        activeTab: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.classify = this.classify.bind(this);
    var report = this.report = this.report.bind(this);

    var port = browser.runtime.connect({name:"bubble-scan"});
    port.onMessage.addListener(report);

    browser.tabs.executeScript({
          code: 'infobubble.analyze()'
    });
  }

  componentDidMount() {
    // Get the active tab and store it in component state.
    chrome.tabs.query({active: true}, tabs => {
      this.setState({activeTab: tabs[0]});
    });
  }

  report(m) {
    console.log('Report!', m);
    if (m.action === 'REPORT') {
        this.setState({ matchedTag: m.tag });
    }
  }

  analyzeText() {
      console.log('Analyze');
      browser.tabs.executeScript({
          code: 'infobubble.analyze()'
      }).then(function(result) {
          console.log('Success!', result);
          result.forEach(function(item) {
              console.log('Result item:', item);
          });
      }, function(error) {
          console.log('Error!', error);
      });
  }

  classify(event) {
      var tag = this.state.tag;

      browser.tabs.executeScript({
          code: 'infobubble.classify("' + tag + '")'
      }).then(function(result) {
          console.log('Success!', result);
          result.forEach(function(item) {
              console.log('Result item:', item);
          });
      }, function(error) {
          console.log('Error!', error);
      });

      event.preventDefault();
  }

  handleChange(ev) {
    this.setState({tag: ev.target.value});
  }

  render() {
    const {activeTab} = this.state;
    return (
      <div>
        <h1>{this.state.matchedTag}</h1>
        <p>
          Active tab: {activeTab ? activeTab.url : '[waiting for result]'}
        </p>
        <button onClick={this.analyzeText}>Analyze</button>
        <hr/>
        <form onSubmit={this.classify}>
            <input type="text" value={this.state.tag} onChange={this.handleChange} />
            <button onClick={this.classify}>Classify</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
