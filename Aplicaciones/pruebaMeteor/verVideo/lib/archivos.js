import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';


ArchivosFS = new FS.Collection("ArchivosFS", {
    stores: [new FS.Store.GridFS("ArchivosFSStore")]
});

ArchivosFS.allow({
    download: function () {
        return true;
    },
    fetch: null
});
