import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.editAnnouncementModal.events({
  'submit #editAnnouncementForm': function(event, template){
    var clinic = template.selectedClinic.get();
    if (clinic == "NoFilter") {
      event.preventDefault();
      template.errorMessage.set("You must select a clinic");
      $('#errorAlert').show();
      return;
    }
    if (event.target.announcement.value == "") {
      event.preventDefault();
      template.errorMessage.set("You must include a message.");
      $('#errorAlert').show();
      return;
    }
    Announcements.update(Session.get('selectedAnnouncement'), {
      $set: {
        announcement_datetime: Date.now(),
        announcement_text: event.target.announcement.value,
        clinic: clinic
      }
    });
  },
  'change #clinic': function(event, template){
    var selectedClinic = template.selectedClinic.get();
    template.selectedClinic.set(event.target.value);
    $('#errorAlert').hide();
  }
});

Template.editAnnouncementModal.helpers({
  'announcement': function(){
    announcement_id = Session.get('selectedAnnouncement');
    return Announcements.findOne(announcement_id);
  },
  'selectedClinic': function(clinicOption){
    var selectedClinic = Template.instance().selectedClinic.get();
    if (selectedClinic == clinicOption) {
      return 'selected';
    } else {
      return "";
    }
  },
  alertMessage() {
    return Template.instance().errorMessage.get();
  }
});

Template.editAnnouncementModal.onCreated(function(){
  announcement_id = Session.get('selectedAnnouncement');
  var announcement = Announcements.findOne(announcement_id);
  this.selectedClinic = new ReactiveVar(announcement.clinic);
  this.errorMessage = new ReactiveVar("");
});

Template.editAnnouncementModal.onRendered(function(){
  $('#errorAlert').hide();
});