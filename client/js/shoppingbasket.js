import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Template.shoppingBasket.onCreated(function(){
  this.bookingsAreSelected = new ReactiveVar(false);
  this.thereAreBookedPlaces = new ReactiveVar(false);

});

Template.shoppingBasket.events({
  'change .courseSelect input': function(event, template) {
    if(event.target.checked){
      template.bookingsAreSelected.set(true);
      booking_id = event.target.value;
      var myBooking = Bookings.findOne({_id: booking_id});
      selectedBookings.push((event.target.value).toString());
      checkForBookedPlaces();
    } else {
      selectedBookings = _.without(selectedBookings, (event.target.value).toString());

      if (selectedBookings.length < 1) {
        template.bookingsAreSelected.set(false);
        template.thereAreBookedPlaces.set(false);
      } else {
        template.bookingsAreSelected.set(true);
        checkForBookedPlaces();
      }
    }
  },
  'click #removeButton': function(event, template){
      for (var i = 0; i < selectedBookings.length; i++) {
        var booking_id = selectedBookings[i];
        Bookings.remove({_id: booking_id});
      }

      if (selectedBookings.length < 1) {
        template.bookingsAreSelected.set(false);
      }
      selectedBookings = [];
  },
  'click #checkoutButton': function(event, template){
    for (var i = 0; i < selectedBookings.length; i++) {
      var booking_id = selectedBookings[i];
      Bookings.update(booking_id, {
        $set: { booking_validated : true }
      });
    }
    if (selectedBookings.length < 1) {
      template.bookingsAreSelected.set(false);
    }
    selectedBookings = [];
  },
  'click .keepopen': function(){

    $('#menu-global-nav').on('click.bs.dropdown', function(e){
        var $a  = $(e.target), is_a = $a.is('.is_a');
        if($a.hasClass('keepopen')){
          console.log('hello again');
            $('ul.dropdown-menu', this).toggle(!is_a);
            $a.toggleClass('is_a', !is_a);
        }
    }).on('mouseleave', function(){
        $('ul.dropdown-menu',this).hide();
        $('.is_a', this).removeClass('is_a');
    });

  },
  'click #addonebutton': function(event, template){

    var course_id = event.currentTarget.value;
    var booking_id = event.currentTarget.name;

    var myBooking = Bookings.findOne({_id: booking_id});
    var numberOfItems = myBooking.places_booked;
    numberOfItems ++;
    if (numberOfItems > 10) {
      numberOfItems = 10;
    }

     //update the users bookings
    Bookings.update(booking_id, {$set:{places_booked: numberOfItems}});
    checkForBookedPlaces();

  },
  'click #subtractonebutton': function(event, template){
    var booking_id = event.currentTarget.name;
    var myBooking = Bookings.findOne({_id: booking_id});
    var numberOfItems = myBooking.places_booked;
    numberOfItems --;

    if (numberOfItems < 1) {
      numberOfItems = 0;
      template.thereAreBookedPlaces.set(0);
    }

      //update the users bookings
     Bookings.update(booking_id, {$set:{places_booked: numberOfItems}});
     checkForBookedPlaces();
  }

});

Template.shoppingBasket.helpers({

  'boxesAreChecked': function(template){
    //get all the checked selections
    if (selectedCourses.length > 0) {
      template.bookingsAreSelected.set(true);
      return true;
    } else {
      template.bookingsAreSelected.set(false);
      return false;
    }
  },
  'allCurrentUserUnvalidatedBookings': function(){
    var bookings = Bookings.find({booked_by: Meteor.userId(), booking_validated: false }).fetch();
    return bookings;
  },
  'numberOfCurrentUserBookings': function(){
    var numberOfBookings = Bookings.find({booked_by: Meteor.userId(), booking_validated: false }).count();
    return numberOfBookings;
  },
  'numberOfItems': function(booking_id){
    var myNumberOfItems = Bookings.findOne({_id: booking_id});
    return myNumberOfItems.places_booked;
  },
  'disabledstatusplus': function(booking_id){

    var myBooking = Bookings.findOne({_id: booking_id});
    var numberOfItems = myBooking.places_booked;
    if (numberOfItems > 9) {
      return "disabled";
    } else {
      return "";
    }
  },
  'disabledstatusminus': function(booking_id){

    var myBooking = Bookings.findOne({_id: booking_id});
    var numberOfItems = myBooking.places_booked;
    if (numberOfItems == 0 ) {
      return "disabled";
    } else {
      return "";
    }
  },
  'submit_button_enabled': function(){

    var bookingsAreSelected = Template.instance().bookingsAreSelected.get();
    var thereAreBookedPlaces = Template.instance().thereAreBookedPlaces.get();
    console.log("booked places: "+thereAreBookedPlaces+ " bookings selected: "+ bookingsAreSelected);
    if (bookingsAreSelected && thereAreBookedPlaces) {
      return "";
    } else {
      return "disabled";
    }
  },
  'remove_button_enabled': function(){
    var bookingsAreSelected = Template.instance().bookingsAreSelected.get();
    if (bookingsAreSelected) {
      return "";
    } else {
      return "disabled";
    }
  }
});

//methods
function checkForBookedPlaces(){
  for (var i = 0; i < selectedBookings.length; i++) {
    var booking_id = selectedBookings[i];
    var booking = Bookings.findOne({_id: booking_id});
    if (booking.places_booked > 0) {
      console.log('there are places booked');
      Template.instance().thereAreBookedPlaces.set(true);
    }
  }
}
