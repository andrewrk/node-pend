module.exports = Pend;

function Pend() {
  this.pending = 0;
  this.listeners = [];
  this.error = null;
}

Pend.prototype.go = function(fn) {
  pendGo(this, fn);
};

Pend.prototype.wait = function(cb) {
  if (this.pending === 0) {
    cb(this.error);
  } else {
    this.listeners.push(cb);
  }
};

function pendGo(self, fn) {
  self.pending += 1;
  fn(onCb);
  function onCb(err) {
    self.error = self.error || err;
    self.pending -= 1;
    if (self.pending < 0) throw new Error("Callback called twice.");
    if (self.pending === 0) {
      self.listeners.forEach(cbListener);
      self.listeners = [];
    }
  }
  function cbListener(listener) {
    listener(self.error);
  }
}

