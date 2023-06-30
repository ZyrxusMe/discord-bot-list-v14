const fs = require('fs');
const path = require('path');

class JsonDatabase {
  constructor(file_name) {
    this.file_name = file_name;
    this.data = this.load_data();
  }

  load_data() {
    try {
      const raw_data = fs.readFileSync(this.file_name, 'utf8');
      if (raw_data) {
        return JSON.parse(raw_data);
      } else {
        return {};
      }
    } catch (err) {
      return {};
    }
  }

  backup() {
    const timestamp = Date.now();
    const backupFileName = `${timestamp}_${path.basename(this.file_name)}`;
    const backupFilePath = path.join(path.dirname(this.file_name), backupFileName);
    fs.copyFileSync(this.file_name, backupFilePath);
  }


  save_data() {
    fs.writeFileSync(this.file_name, JSON.stringify(this.data, null, 2));
  }

  fetch(key) {
    return this.data[key];
  }

  push(key, value) {
    if (Array.isArray(this.data[key])) {
      this.data[key].push(value);
    } else {
      this.data[key] = [value];
    }
  }

  unpush(key, value) {
    if (Array.isArray(this.data[key])) {
      const index = this.data[key].indexOf(value);
      if (index > -1) {
        this.data[key].splice(index, 1);
      }
    }
  }

  add(key, amount) {
    if (typeof this.data[key] === 'number') {
      this.data[key] += amount;
    } else {
      this.data[key] = amount;
    }
  }

  subtract(key, amount) {
    if (typeof this.data[key] === 'number') {
      this.data[key] -= amount;
    } else {
      this.data[key] = -amount;
    }
  }

  set(key, value) {
    this.data[key] = value;
  }
}

const db = new JsonDatabase('veritabani.json');

module.exports = db