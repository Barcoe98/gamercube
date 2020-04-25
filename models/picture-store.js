'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const pictureStore = {

  store: new JsonStore('./models/picture-store.json', { pictures: [] }),
  collection: 'pictures',

  getAlbum(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
  },
   getAllUsers() {
    return this.store.findAll(this.collection);
  },


  addPicture(userId, title, imageFile, response) {
    let album = this.getAlbum(userId);
    if (!album) {
      album = {
        userid: userId,
        photos: [],
      };
      this.store.add(this.collection, album);
    }

    imageFile.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          const picture = {
            img: result.url,
            title: title,
          };
          album.photos.push(picture);
          response();
        });
      }
    });
  },

  deletePicture(userId, image) {
    const id = path.parse(image);
    let album = this.getAlbum(userId);
    _.remove(album.photos, { img: image });
    cloudinary.api.delete_resources([id.name], function (result) {
      console.log(result);
    });
  },

  deleteAllPictures(userId) {
    let album = this.getAlbum(userId);
    if (album) {
      album.photos.forEach(photo => {
        const id = path.parse(photo.img);
        cloudinary.api.delete_resources([id.name], result => {
          console.log(result);
        });
      });
      this.store.remove(this.collection, album);
    }
  },
};

module.exports = pictureStore;