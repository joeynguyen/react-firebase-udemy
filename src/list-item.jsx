var React = require('react'),
    Firebase = require('firebase'),
    rootUrl = 'https://glaring-fire-1823.firebaseio.com/';

module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        }
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
                        onChange={this.handleEditText}
                        value={this.state.text}
                    />
                    <span className="input-group-btn">
                        {this.changesButtons()}
                        <button onClick={this.handleDelete} className="btn btn-danger">
                            Delete
                        </button>
                    </span>
                </div>
    },
    changesButtons: function() {
        if (this.state.textChanged) {
            return [
                <button onClick={this.handleUndo} className="btn btn-warning">
                    Undo
                </button>,
                <button onClick={this.handleSave} className="btn btn-success">
                    Save
                </button>
            ]
        } else {
            return null;
        }
    },
    handleInputChecked: function(event) {
        var change = { done: event.target.checked }
        this.setState(change);
        this.firebase.update(change);
    },
    handleUndo: function() {
        this.setState({text: this.props.item.text, textChanged: false});
    },
    handleSave: function() {
        this.firebase.update({text: this.state.text});
        this.setState({textChanged: false});
    },
    handleDelete: function() {
        this.firebase.remove();
    },
    handleEditText: function(event) {
        this.setState({text: event.target.value, textChanged: true})
    }
});

