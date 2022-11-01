
//three.js MIT licence
var _c = document.getElementById("canv"),
    _$ = _c.getContext("2d");
    _c.width = window.innerWidth;
    _c.height = window.innerHeight;

var anim = (function(w) {
  var arr = [],
      sz = 1.3;
  var part = function(x, y, vx, vy, _x, _y, col) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.nx = _x;
    this.ny = _y;
    this.col = col;
    this.dn = false;
    this.grav = Math.random() * 3 + 6.8;
    this.fin(_x, _y);
  }
  part.prototype = {
    _fill: function() {
      _$.fillStyle = this.col;
      _$.fillRect(this.x - sz / 2, this.y - sz / 2, sz, sz)
    },
    fin: function(_x, _y) {
      this._x = _x;
      this._y = _y;
    },
    upd: function(_t_) {
      this.x += this.vx * _t_;
      this.y += this.vy * _t_;
      if (!this.dn) {
        var ay = this._y - this.y;
        var ax = this._x - this.x;
        this.xy = Math.sqrt(ax * ax + ay * ay);
        var za = 18;
        var ax = za * (ax / this.xy);
        var ay = za * (ay / this.xy);
        this.vx = (this.vx + ax * _t_) * 0.95;
        this.vy = (this.vy + ay * _t_) * 0.95;
      } else {
        this.vy += this.grav * _t_;
        if (this.y > _c.height) {
          arr.splice(arr.indexOf(this), 1, null);
        }
      }
    },
    run: function(_t_) {
      this.upd(_t_);
      this._fill();
    }
  }
  var anim = function() {
    this.pos = "init"
  };

  var anime = anim.prototype;
  anime.set = function() {
    this.c = document.createElement("canvas");
    var $ = this.c.getContext("2d");
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight;
    $.font = "80px Rock Salt";
    $.fillStyle = "hsla(327, 95%, 55%, 1)";
    var t = "Hello!";
    $.fillText(t, (this.c.width - $.measureText(t).width) * 0.5, this.c.height * 0.3);
    $.font = "70px Rock Salt";
    $.fillStyle = "hsla(205, 87%, 49%, 1)";
    var t0 = "Welcome";
    $.fillText(t0, (this.c.width - $.measureText(t0).width) * 0.5, this.c.height * 0.5);
    $.fillStyle = "hsla(176, 95%, 45%, 1)";
    $.font = "65px Rock Salt";
    var t1 = "!!";
    $.fillText(t1, (this.c.width - $.measureText(t1).width) * 0.5, this.c.height * 0.7);
    var id = $.getImageData(0, 0, this.c.width, this.c.height);
    arr = [];
    for (var x = 0; x < id.width; x += 2) {
      for (var y = 0; y < id.height; y += 3) {
        var i = (y * id.width + x) * 4;
        if (id.data[i + 3] > 128) {
          var p = new part(
            _c.width / 2 - 1 + 2 * Math.random(),
            _c.height / 2 - 1 + 2 * Math.random(),
            0,
            0,
            x + (_c.width / 2 - this.c.width / 2),
            y + (_c.height / 2 - this.c.height / 2),
            "rgba(" + id.data[i] + "," + id.data[i + 1] + "," + id.data[i + 2] + ",1)"
          );
          p.fin(_c.width / 2, _c.height / 2);
          arr.push(p);
        }
      }
    }
  };

  function txt() {
    var $ = this.c.getContext("2d");
    $.clearRect(0, 0, this.c.width, this.c.height);
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight;
    $.fillStyle = "hsla(359, 95%, 35%, 1)";
    $.font = "90px Rock Salt";
	$.textAlign = 'center';
	$.textBaseline = 'middle';
    var t2 = "👨‍💻";
    $.fillText(t2, (this.c.width - $.measureText(t2).width) * 0.05, this.c.height * 0.29);
    $.font = "40px Rock Salt";
    $.fillStyle = "hsla(44, 95%, 45%, 1)";
    var t3 = "";
    $.fillText(t3, (this.c.width - $.measureText(t3).width) * 0.001, this.c.height * 0.2);
    $.font = "40px Rock Salt";
    $.fillStyle = "hsla(170, 5%, 35%, 1)";
    var t4 = '';
    $.fillText(t4, (this.c.width - $.measureText(t4).width) * 0.143, this.c.height * 0.29);
    return $.getImageData(0, 0, 800, 800);
  }
  anime.nxt = function() {
    var id = txt.call(this);
    var idx = 0;
    var d;
    arr.sort(function() {
      return Math.random() - Math.random();
    });

    for (var x = 0; x < id.width; x += 1) {
      for (var y = 0; y < id.height; y += 2) {
        if (!(d = arr[idx])) continue;
        var i = (y * id.width + x) * 4;
        if (id.data[i + 3] > 128) {
          d.fin(x + (_c.width / 3), y + 50);
          d.col = "rgba(" + id.data[i] + "," + id.data[i + 1] + "," + id.data[i + 2] + ",1)";
          idx++
        }
      }
    }
    while (idx < arr.length) {
      if (!(d = arr[idx++])) continue;
      d.dn = true;
      d.vx = 0;
    }
  }
  anime.upd = function(_t_) {
    var i, d;
    _t_ /= 90;
    var num = 0;
    for (i = 0; i < arr.length; i++) {
      if (!(d = arr[i])) continue;
      d.run(_t_);
      if (d.xy < 3) num++;
    }

    if (num >= 5 * arr.length / 6) {
      switch (this.pos) {
        case 'init':
          this.pos = "one";

          for (i = 0; i < arr.length; i++) {
            if (!(d = arr[i])) continue;
            d.fin(d.nx, d.ny);
          }
          break;
        case 'one':
          this.pos = "two";
          this.nxt();
          break;
        default:
          break;
      }
    }
  };

  return new anim();
})(window)

var main = {
  set: function() {
    anim.set();
  },
  run: function() {
    var _this = this;
    _$.clearRect(0, 0, _c.width, _c.height);
    anim.upd(16);
    window.requestAnimationFrame(function() {
      _this.run();
    })
  }
};
main.set();
main.run();

window.addEventListener('resize',function(){
c.width = window.innerWidth;
c.height = window.innerHeight;
_c.width = window.innerWidth;
_c.height = window.innerHeight;
}, false);


var c = document.getElementById("canv2");
var $ = c.getContext("2d");

var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var arr = [];
var u = 0;
var dep = w;
var dp = 0.70;
var ms = {
  x: 0,
  y: 0
};
var msd = {
  x: 0,
  y: 0
};

function Obj(x, y, z) {
  this.set(x, y, z);
}

Obj.prototype = {
  set: function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  },
  rotX: function(ang) {
    var y = this.y;
    var z = this.z;
    this.y = y * Math.cos(ang) - z * Math.sin(ang);
    this.z = z * Math.cos(ang) + y * Math.sin(ang);
  },
  rotY: function(ang) {
    var x = this.x;
    var z = this.z;
    this.x = x * Math.cos(ang) - z * Math.sin(ang);
    this.z = z * Math.cos(ang) + x * Math.sin(ang);
  },
  rotZ: function(ang) {
    var x = this.x;
    var y = this.y;
    this.x = x * Math.cos(ang) - y * Math.sin(ang);
    this.y = y * Math.cos(ang) + x * Math.sin(ang);
  }
};

function Part(x, y, z) {
  this.op = new Obj(x, y, z);
  this.rp = new Obj(x, y, z);
  this.rot = new Obj();
  this.vel = new Obj();
  this.col = 'hsla(216,95%,85%,'+rnd(0.5, 1)+')';
}

function upd(rot) {
  var pos;
  var rot;
  var vel;
  var op;
  var rp;
  var col;
  var size;
  for (var i in arr) {
    op = arr[i].op;
    rp = arr[i].rp;
    rot = arr[i].rot;
    vel = arr[i].vel;
    col = arr[i].col;
    vel.x += msd.x * 0.15;
    vel.y += msd.y * 0.15;
    rp.set(op.x, op.y, op.z);

    rot.x += vel.x;
    rot.y += vel.y;
    rot.z += vel.z;

    rot.x = rot.x > Math.PI * 2 ? 0 : rot.x;
    rot.y = rot.y > Math.PI * 2 ? 0 : rot.y;

    rp.rotY(rot.y);
    rp.rotX(rot.x);

    vel.set(
      vel.x * dp,
      vel.y * dp,
      0
    );
  }
  msd.x = 0.0005;
  msd.y = 0.0005;
}

function draw() {
  var t = "".split("").join(String.fromCharCode(0x2004));
  $.font = "4em Poiret One";
  $.fillStyle = 'hsla(216,95%,85%,.3)';
  $.textBaseline = 'top';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.5);
  var p, dth;
  for (var i in arr) {
    p = arr[i];
    dth = ((p.rp.z / dep) + 1);
    $.fillStyle = p.col;
    $.fillRect(w + p.rp.x, h + p.rp.y, rnd(dth/0.8, dth/2),  dth/0.9);
  }
}

function rnd(min, max) {
  return Math.random() * (max - min) + min;
}

function go() {
  for (var i = 0; i < 6800; i++) {
    var d = new Part(
      rnd(-w, h),
      rnd(-w, h),
      rnd(-dep, dep)
    );
    d.vel.set(0, 0, 0);
    arr.push(d);
  }
}

window.addEventListener('mousemove', function(e) {
  msd.x = (e.clientY - ms.y) / w;
  msd.y = (e.clientX - ms.x) / h;
  ms.x = e.clientX;
  ms.y = e.clientY;
}, false);

window.addEventListener('touchmove', function(e) {
  e.preventDefault();
  msd.x = (e.touches[0].clientY - ms.y) / w;
  msd.y = (e.touches[0].clientX - ms.x) / h;
  ms.x = e.touches[0].clientX;
  ms.y = e.touches[0].clientY;
}, false);

window.addEventListener('resize', function(e) {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);

function run() {
  $.clearRect(0, 0, w, h);
  var g_ = $.createLinearGradient(c.width + c.width,
    c.height + c.height * 1.5,
    c.width + c.width, 1);
  g_.addColorStop(0, 'hsla(253, 5%, 75%, 1)');
  g_.addColorStop(0.5, 'hsla(314, 95%, 10%, 1)');
  g_.addColorStop(0.8, 'hsla(259, 95%, 5%, 1)');
  g_.addColorStop(1, 'hsla(0,0%,20%,1)');
  $.globalCompositeOperation = 'normal';
  $.fillStyle = g_;
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  upd();
  draw();
  window.requestAnimationFrame(run);
}

go();
run();


