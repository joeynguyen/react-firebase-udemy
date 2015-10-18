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
        // Have to add 'this' in front to make firebase object usable everywhere in this app
        this.firebase = new Firebase(rootUrl + 'items/');
        this.bindAsObject(this.firebase, 'items');
        // FireBase has an event called 'value' for when it sees data flow in from server
        this.firebase.on('value', this.handleDataLoaded);
    },
    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">To-Do List</h2>
                <Header itemsStore={this.firebaseRefs.items} />
                <hr />
                <div className={"content " + (this.state.loaded ? 'loaded':'')}>
                    <List items={this.state.items} />
                    {this.showDeleteButton()}
                </div>
            </div>
        </div>
    },
    handleDataLoaded: function() {
        this.setState({ loaded: true })
    },
    showDeleteButton: function() {
        if (this.state.loaded) {
            return <div className="text-center clear-complete">
                <hr />
                <button onClick={this.onDeleteDone} className="btn btn-default">Clear Completed</button>
            </div>;
        } else {
            return;
        }
    },
    onDeleteDone: function() {
        for (var key in this.state.items) {
            // being explicit with 'done' value to future-proof in the event
            // that we have a value that's not a boolean like 'in-progress'
            if (this.state.items[key].done === true) {
                this.firebase.child(key).remove();
            }
        }
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
