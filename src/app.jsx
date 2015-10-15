var React = require('react'),
    ReactFire = require('reactfire'),
    Firebase = require('firebase'),
    rootUrl = 'https://glaring-fire-1823.firebaseio.com/';

var App = React.createClass({
    mixins: [ ReactFire ],
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
        // this.state.items => {}
    },
    render: function() {
        console.log(this.state);
        return <h1 className="red">
            Hello world!
        </h1>
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
