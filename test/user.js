var bcrypt = require('bcryptjs');
var crypto = require('crypto');

function getRandomString(len){
  if (!len) len=16;
  console.log(Math.ceil(len/2));
  //Math.ceil(len/2).toString()
  return crypto.randomBytes(Math.ceil(len/2));
}

var should =require('should');
var app =require('../app');
var mongoose = require('mongoose');
//var User = require('../../app/models/user');
var User = mongoose.model('User');

var Tmpuser;
//test
describe('單元測試:',function(){
  describe('用戶測試:',function(){
    before(function(done){
      Tmpuser = {
        name:getRandomString(),
        password:'password'
      }
      done();
    });
    describe('開始前的校驗',function(){
      it('保證不重複',function(done){
        User.find({name:Tmpuser.name},function(err,users){
          users.should.have.length(0);

          done();
        });
      });
    });

    //var _user = new User(Tmpuser);
    // _user.save(function(err,user){
      
    // })
    describe('保存用戶',function(){
      it('保存無異常',function(done){
        var _user = new User(Tmpuser);

        _user.save(function(err){
          should.not.exist(err);
          _user.remove(function(err){
            should.not.exist(err);
            done();
          });
        });
      });
      it('密碼加密保存',function(done){
        var password = Tmpuser.password
        var _user = new User(Tmpuser);

        _user.save(function(err){
          should.not.exist(err);
          _user.password.should.not.have.length(0)

          bcrypt.compare(password,_user.password,function(err,isMatch){
            should.not.exist(err);
            isMatch.should.equal(true);

            _user.remove(function(err){
              should.not.exist(err);
              done();
            });

          });

        });
      });
      it('權限為0',function(done){
        var _user = new User(Tmpuser);

        _user.save(function(err){
          should.not.exist(err);
          _user.role.should.equal(0)

          _user.remove(function(err){
            should.not.exist(err);
            done();
          });

        });
      });
      it('保存重複用戶必須異常',function(done){
        var _user1 = new User(Tmpuser);
        _user1.save();

        var _user2 = new User(Tmpuser);
        _user2.save(function(err){
          should.exist(err);
          _user1.remove(function(err){
            should.not.exist(err);
            _user2.remove(function(err){
              should.not.exist(err);
              done();
            });
          });
        });
      });
    });
  });
});
