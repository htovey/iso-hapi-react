var React = require('react'),
    TodoItem = require('./TodoItem');

module.exports = TodoList = React.createClass({
  handleRemove: function (item, index) {
    return this.props.onRemove(item, index);
  },

  render: function () {
    var createItem = function (item, index) {
      return <TodoItem key={index} text={item} onRemove={this.handleRemove.bind(this, item, index)} />;
    };

    return <ul>{this.props.items.map(createItem, this)}</ul>;
  }
});
