var React = require('react');

module.exports = TodoItem = React.createClass({
  render: function () {
    return (
      <li key={this.props.key + this.props.text}>
        {this.props.text}
        <button onClick={this.props.onRemove}>
          remove
        </button>
      </li>
    );
  }
});
