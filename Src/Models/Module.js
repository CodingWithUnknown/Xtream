module.exports = {
  Time: function(duration) {
    let milliseconds = parseInt((duration % 1000) / 100), seconds = parseInt((duration / 1000) % 60), minutes = parseInt((duration / (1000 * 60)) % 60), hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (duration < 3600000) {
      return minutes + ':' + seconds;
    } else {
      return hours + ':' + minutes + ':' + seconds;
    }
  },

  Number: function(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    let abbrev = ['K', 'M', 'B', 'T'];
    for (let i = abbrev.length - 1; i >= 0; i--) {
      let size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
    return number;
  },

  Chunk: function(arr, size) {
    const temp = [];
    for (let i = 0; i < arr.length; i += size) {
      temp.push(arr.slice(i, i + size));
    }
    return temp;
  },

  HmsToMs: function(hms) {
    if (hms.length < 3) {
      return (hms = +a[0] * 1000);
    } else if (hms.length < 6) {
      const a = hms.split(':');
      return (hms = (+a[0] * 60 + +a[1]) * 1000);
    } else {
      const a = hms.split(':');
      return (hms = (+a[0] * 60 * 60 + +a[1] * 60 + +a[2]) * 1000);
    }
  },

  FormatBytes: function(a, b) {
    let c = 1024;
    d = b || 2;
    e = ['B', 'KB', 'MB', 'GB', 'TB'];
    f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f];
  },

  Capitalize: function(string) {
    let text = string.toLowerCase().split(' ');
    for (let i = 0; i < text.length; i++) {
      text[i] = text[i].charAt(0).toUpperCase() +
        text[i].substring(1);
    }
    return text.join(' ');
    //return string.charAt(0).toUpperCase() + string.slice(1);
  },

  Code: function(length = 8) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  },

  Supplementary: function(string) {
    if (typeof text === 'string') {
      return string.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    } else {
      return string;
    }
  }
};