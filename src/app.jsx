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
            items: {}
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
        // shortcut for:
        // this.firebase = new Firebase(rootUrl + 'items/');
        // this.bindAsObject(this.firebase, 'items');
    },
    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">To-Do List</h2>
                <Header itemsStore={this.firebaseRefs.items} />
                <List items={this.state.items} />
            </div>
        </div>
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
