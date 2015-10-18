var React = require('react'),
    Firebase = require('firebase'),
    rootUrl = 'https://glaring-fire-1823.firebaseio.com/';

module.exports = React.createClass({
    getInitialState: function() {
        return {text: this.props.item.text, done: this.props.item.done}
    },
    componentWillMount: function() {
        this.firebase = new Firebase(rootUrl + 'items/' + this.props.item.key);
    },
    render: function() {
        return <div className="input-group">
                    <span className="input-group-addon">
                        <input
                            onChange={this.handleInputChecked}
                            type="checkbox"
                            checked={this.state.done}
                        />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.text}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default">
                            Delete
                        </button>
                    </span>
                </div>
    },
    handleInputChecked: function(event) {
        var change = { done: event.target.checked }
        this.setState(change);
        this.firebase.update(change);
    }
});

