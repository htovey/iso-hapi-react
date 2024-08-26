var React = require('react');
    TodoList =  require('./TodoList');

module.exports = React.createClass({
  getInitialState: function () {
    return { items: this.props.items || [], text: '' };
  },

  onChange: function (e) {
    this.setState({ text: e.target.value });
  },

  onRemove: function (item, index) {
    this.state.items.splice(index, 1);
    this.setState({ items: this.state.items });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.setState({ items: this.state.items.concat([this.state.text]), text: '' });
  },

  render: function () {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} onRemove={this.onRemove} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});
