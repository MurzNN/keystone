const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { Text, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/todo' }),
});

keystone.createList('Todo', {
  schemaDoc: 'A todo list with string id',
  fields: {
    id: {
      type: Text,
      schemaDoc: 'Custom text id instead of Mongo\'s ObjectId',
      isRequired: true,
      isUnique: true,
      isPrimaryKey: true,
      defaultValue: ({ context, originalInput }) => {
        return "task_" + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
      },
    },
    name: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
  },
});
// Workaround for allowing strings in Mongo _id field
keystone.lists.Todo.adapter.schema.add({ _id: 'string' });

keystone.createList('Todo2', {
  schemaDoc: 'A todo2 list with default id as Mongo ObjectId',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
  },
});

keystone.createList('RelationshipTest', {
  schemaDoc: 'Test of relationship',
  fields: {
    task2: { type: Relationship, ref: 'Todo2' },
    task: { type: Relationship, ref: 'Todo' },
    text: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
  },
});


module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ name: 'Keystone To-Do List', enableDefaultRoute: true }),
  ],
};
