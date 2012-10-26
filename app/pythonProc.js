var pythonProc = module.exports = {
  fork: function() {
    var spawn = require('child_process').spawn,
        python = spawn('python', ['python/wiimote.py']);

    python.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });

    python.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
    });

    python.on('exit', function (code) {
      console.log('child ' + python.pid + ' process exited with code ' + code);
    });
  }
};

// https://github.com/LearnBoost/cluster/blob/master/lib/master.js
// Master.prototype.workerKilled = function(worker){
//   // if we have many failing workers at boot
//   // then we likely have a serious issue.
//   if (new Date - this.startup < 20000) {
//     if (++this._killed == 20) {
//       console.error('');
//       console.error('Cluster detected over 20 worker deaths in the first');
//       console.error('20 seconds of life, there is most likely');
//       console.error('a serious issue with your server.');
//       console.error('');
//       console.error('aborting.');
//       console.error('');
//       process.exit(1);
//     }
//   }

//   // emit event
//   this.emit('worker killed', worker);

//   // always remove worker
//   this.removeWorker(worker.id);

//   // state specifics
//   switch (this.state) {
//     case 'hard shutdown':
//       break;
//     case 'graceful shutdown':
//       --this.pendingDeaths || this._destroy();
//       break;
//     default:
//       this.spawnWorker(worker.id);
//   }
// };
