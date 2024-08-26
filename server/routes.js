var Boom = require('boom'),
    Joi = require('joi'),
    Path = require('path'),
    React = require('react/addons'),
    TodoApp = require('../app/TodoApp');

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var props = { items: ['A server-side TODO'] },
          TodoAppFactory = React.createFactory(TodoApp);

      reply.view('index', {
        app: React.renderToString(
          TodoAppFactory(props)
        ),
        props: props
      });
    }
  },

  {
    method: '*',
    path: '/render',
    handler: function (request, reply) {
      var componentPath = Path.join('../app/components', request.query.component);

      try {
        require.resolve(componentPath);
      } catch (e) {
        return reply(Boom.notFound('No component found named "' + request.query.component + '"'));
      }

      var component = require(componentPath),
          props = request.payload;

      try {
        var element = React.createElement(component, props),
            renderedElement = React.renderToString(element);
      } catch (e) {
        return reply(Boom.badImplementation('Error occured while rendering "' + request.query.component + '"'));
      }

      reply(renderedElement);
    },
    config: {
      validate: {
        headers: Joi.object({
          'Content-Type': Joi.string().valid('application/json')
        }).options({
          allowUnknown: true
        }),
        query: {
          component: Joi.string().required()
        }
      }
    }
  },

  {
    method: '*',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  }
];

module.exports = routes;
