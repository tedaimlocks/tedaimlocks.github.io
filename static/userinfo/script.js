var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        toRotate = toRotate.replace(/\n|\r\n/g, '\\n');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            var parsed = JSON.parse(toRotate); 
            for (var j=0; j<parsed.length; j++) {
                parsed[j] = parsed[j].replace(/\\n/g, '\n').replace(/\n/g, '!br!'); // Replace <br/> with '!br!'
            }
            new TxtType(elements[i], parsed, period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        if (this.txt.substring(this.txt.length - 4, this.txt.length) === '!br!') {
            this.txt = this.txt.substring(0, this.txt.length - 4);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
    } else {
        if (fullTxt.substring(this.txt.length, this.txt.length + 4) === '!br!') {
            this.txt += '!br!';
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt.replace(/!br!/g, '<br/>')+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};




const icons = document.querySelectorAll('.role-icon');
icons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        icons.forEach(function(iconn) {
            if (iconn !== icon) {
                iconn.classList.remove('active');
            }
        });
        icon.classList.toggle('active');
    });
});