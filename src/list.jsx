var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
    render: function() {
        return <div>
            {this.renderList()}
        </div>
    },
    renderList: function() {
        if (this.props.items && Object.keys(this.props.items).length === 0) {
            return <h2>
                Add a todo to get started.
            </h2>
        } else {
            var children = [];
            for (var key in this.props.items) {
                var item = this.props.items[key];
                item.key = key;
                console.log(item);
                console.log(item.key);
                children.push(
                    <ListItem item={item} key={key} />
                )
            }
            return children;
        }
    }
});
