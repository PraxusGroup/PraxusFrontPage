var bPromise = require('bluebird');
var filter  = require('loopback-filters');

module.exports = function(Posts) {
  Posts.getRecent = function(member, done) {
    var Forums      = Posts.app.models.Forums;
    var RecentPosts = Posts.app.models.ForumsRecentPosts;
    var Topics      = Posts.app.models.Topics;

    var forumIds = [];
    var postIds = [];
    var topicIds = [];
    var topics = {};
    var forums = {};
    var postTemp = {};
    var recent;
    var posts;
    var generalFilter;

    if (!member || !checkPermission(member)) {
      generalFilter = {
        where: {
          or: [
            { parentId: 3  },
            { parentId: 20 }
          ]
        },
        fields: ['id', 'name']
      };
    } else {
      generalFilter = {
        where: {
          or: [
            { parentId: 3  },
            { parentId: 20 },
            { parentId: 4  },
            { parentId: 12 }
          ]
        },
        fields: ['id', 'name']
      };
    }

    Forums.find(generalFilter)
      .then(function(res){
        res.forEach(function(forum){
          forumIds.push(forum.id);
          forums[forum.id] = forum;
        });

        return RecentPosts.find({fields:['postForumId', 'postId']});
      })
      .then(function(res){

        recent = filter(res, {
          where: {
            postForumId: {
              inq: forumIds
            }
          }
        });

        recent.forEach(function(post){
          postIds.push(post.postId);
          postTemp[post.postId] = post.postForumId;
        });

        return Posts.find({
          where: {
            pid: {
              inq: postIds
            }
          },
          fields: [
            'pid',
            'authorId',
            'authorName',
            'postDate',
            'post',
            'topicId'
          ]
        });
      })
      .then(function(res){
        posts = res;
        posts.forEach(function(post){
          topicIds.push(post.topicId);
        });

        return Topics.find({
          where: {
            tid: {
              inq: topicIds
            }
          },
          fields: [
            'tid',
            'title'
          ]
        });
      })
      .then(function(res){
        res.forEach(function(topic){
          topics[topic.tid] = topic;
        });

        posts.forEach(function(post){
          post.topicTitle = topics[post.topicId].title;
          post.forumTitle = forums[postTemp[post.pid]].name;
        });

        done(null, posts);
      })
      .catch(function(e){
        done(e);
      });

  };

  Posts.remoteMethod(
      'getRecent',
      {
        description: 'Returns a list of all recent general posts with a given group.',
        http: {path: '/getRecent', verb: 'post'},
        accepts: [
          {arg: 'member', type: 'any'},
        ],
        returns: {arg: 'recent', type: 'array'}
      }
  );

};


function checkPermission(member) {

  if(!member) return false;

  var goodGroups = [4, 6, 10, 19, 20];

  var result = false;

  goodGroups.forEach(function(group){
    if(parseInt(member.memberGroupId) === group){
      result = true;
    }
  });

  return result;
}
