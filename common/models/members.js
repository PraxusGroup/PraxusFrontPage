var bPromise  = require('bluebird');
var md5       = require('md5');

module.exports = function(Members) {

  /**
   * Get the current user using HTTP request cookies
   */

  Members.remoteMethod(
    'current',
    {
      description: 'Gets the current logged in user by scanning the secured cookies.',
      http: {path: '/current', verb: 'get'},
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: {arg: 'member', type: 'any'}
    }
  );

  Members.current = current;

  function current(req, done) {

    var currentUser = false;

    if (req.cookies.member_id && req.cookies.pass_hash) {
      currentUser = {
        memberId: req.cookies.member_id,
        passHash: req.cookies.pass_hash
      };
    }

    done(null, currentUser);
  }

  /**
   * Login a member using ipb cookies
   */

  Members.remoteMethod(
    'login',
    {
      description: 'Sets cookies',
      http: {path: '/login', verb: 'post'},
      accepts: [
        {arg: 'credentials', type: 'object'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: {arg: 'member', type: 'any'}
    }
  );

  Members.login = login;

  function login(credentials, res, done) {
    var findMemberFilter = {
      where: { name: credentials.username },
      fields: [
        'memberId',
        'memberLoginKey',
        'membersPassHash',
        'membersPassSalt'
      ]
    };

    Members
      .findOne(findMemberFilter)
      .then(function(member) {
        if (member && getPasswordHash(member.membersPassSalt, credentials.password) === member.membersPassHash) {
          res.cookie('member_id', member.memberId, { maxAge: 900000, httpOnly: true });
          res.cookie('pass_hash', member.memberLoginKey, { maxAge: 900000, httpOnly: true });

          done(null,
            {
              memberId: member.memberId,
              memberLoginKey: member.memberLoginKey
            }
          );
        } else {
          done('Invalid Login Credentials');
        }
      });
  }

  function getPasswordHash(salt, password) {
    return md5( md5(salt) + md5(password) );
  }

  /**
   * Logouts the user and deletes their cookies
   */

  Members.remoteMethod(
    'logout',
    {
      description: 'Returns a list of all recent general posts with a given group.',
      http: {path: '/logout', verb: 'get'},
      accepts: [
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: {arg: 'member', type: 'any'}
    }
  );

  Members.logout = logout;

  function logout(res, done) {
    res.clearCookie('member_id');
    res.clearCookie('pass_hash');

    done(null, false);
  }
};
