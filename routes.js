exports.game = function(req, res){
  res.render('game', {
    title: 'Space Invaders'
  });
};
