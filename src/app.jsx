var React = require('react'),
    ReactFire = require('reactfire'),
    Firebase = require('firebase'),
    Header = require('./header'),
    List = require('./list'),
    rootUrl = 'https://glaring-fire-1823.firebaseio.com/';

var App = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function(){
        return {
            items: {},
            loaded: false
        }
    },
    componentWillMount: function() {
        var firebase = new Firebase(rootUrl + 'items/');
        this.bindAsObject(firebase, 'items');
        // FireBase has an event called 'value' for when it sees data flow in from server
        firebase.on('value', this.handleDataLoaded);
    },
    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">To-Do List</h2>
                <Header itemsStore={this.firebaseRefs.items} />
                <div className={"content " + (this.state.loaded ? 'loaded':'')}>
                    <List items={this.state.items} />
                </div>
            </div>
        </div>
    },
    handleDataLoaded: function() {
        this.setState({ loaded: true })
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
