var React = require('react'),
    ReactFire = require('reactfire'),
    Firebase = require('firebase'),
    Header = require('./header'),
    rootUrl = 'https://glaring-fire-1823.firebaseio.com/';

var App = React.createClass({
    mixins: [ ReactFire ],
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
        // this.state.items => {}
    },
    render: function() {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">To-Do List</h2>
                <Header />
            </div>
        </div>
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
