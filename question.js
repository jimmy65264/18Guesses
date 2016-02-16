'use strict';
let r = require('./dash'),
    _ = require('lodash');

function setup (io) {

  io.on('connection', function(socket){

    socket.on('question:findById', function(id, cb){
      r.table('question')
        .get(id)
        .run(cb);
    });

    socket.on('question:add', function(record, cb){

      record = _.pick(record, 'name', 'question');
      record.createdAt = new Date();

      r.table('question')
        .insert(record)
        .run(function(err, result){

          if(err){
            cb(err);
          }
          else{
            record.id = result.generated_keys[0];
            cb(null, record);
          }

        });

    });
    socket.on('question:update', function(record, cb){

      record = _.pick(record, 'id', 'name', 'question');
      r.table('question')
        .get(record.id)
        .update(record)
        .run(cb);

    });

    socket.on('question:delete', function(id, cb){

      r.table('question')
        .get(id)
        .delete()
        .run(cb);

    });

    socket.on('question:changes:start', function(data){

      let limit, filter;
      limit = data.limit || 100;
      filter = data.filter || {};
      r.table('question')
        .orderBy({index: r.desc('createdAt')})
        .filter(filter)
        .limit(limit)
        .changes({includeInitial: true})
        .run({cursor: true}, handleChange);

      function handleChange(err, cursor){

        if(err){

          console.log(err);

        }
        else{

          if(cursor){
            cursor.each(function(err, record){
              if(err){
                console.log(err);
              }
              else{
                socket.emit('question:changes', record);
              }
            });
          }

        }
        socket.on('question:changes:stop', stopCursor);

        socket.on('disconnect', stopCursor);

        function stopCursor () {
          if(cursor){
            cursor.close();
          }
          socket.removeListener('question:changes:stop', stopCursor);
          socket.removeListener('disconnect', stopCursor);
        }

      }

    });


  });

}

module.exports = {
  setup: setup
};
