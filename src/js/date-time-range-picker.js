/**
 * @module js/date-time-range-picker
 * @author Marcello Surdi
 * @version 1.0.0
 *
 * @desc
 * This module contains the DateTimeRangePicker class
 */

import { PickerBase } from './picker-base';

DateTimeRangePicker.prototype = Object.create( PickerBase.prototype );
DateTimeRangePicker.prototype.constructor = DateTimeRangePicker;





/**
 * @class
 *
 * @classdesc
 * Creates a date time range picker inside the `div` elements passed as parameters
 *
 * @param {string} start_id Id of the `div` element that will contain the start date button
 * @param {string} end_id Id of the `div` element that will contain the end date button
 * @param {object} [settings] Object with user defined values
 *
 * @example
 * // In settings object you can use either a date string (in ISO format) or a date object
 * new DatePicker( 'start_id', 'end_id' {
 *  first_date: "2021-01-02",
 *  start_date: "2021-01-05",
 *  last_date: new Date( 2021, 0, 29 ),
 *  end_date: "2021-01-07"
 * } );
 */
export function DateTimeRangePicker( start_id, end_id, settings ) {
  PickerBase.call( this );


  // Settings
  this.i18n = ( settings?.i18n ) ? settings.i18n : this.i18n;
  this.date_output = ( settings?.date_output ) ? settings.date_output : 'short_ISO';
  this.min_range = ( settings?.min_range_hours ) ? ( settings.min_range_hours * 60 * 60 * 1000 ) : ( 1 * 60 * 60 * 1000 );

  const start_date = ( settings?.start_date ) ? settings.start_date : null;
  const first_date = ( settings?.first_date ) ? settings.first_date : null;
  const last_date = ( settings?.last_date ) ? settings.last_date : null;
  const first_day_no = ( typeof settings?.first_day_no !== 'undefined' ) ? settings.first_day_no : 1;
  this.setStartPickerProps( start_id, start_date, first_date, last_date, first_day_no );

  const end_date = ( settings?.end_date ) ? settings.end_date : null;
  this.setEndPickerProps( end_id, end_date );


  // Start date
  this.start_container.classList.add( 'datetime-container', 'fix-float' );
  this.start_container.insertAdjacentHTML( 'afterbegin', this.getHTMLButton( 'datetime' ) );
  this.showDateAndTime( this.start_container, this.start_date );

  this.start_date_btn = this.start_container.querySelector( 'button.date.start' );
  this.start_time_btn = this.start_container.querySelector( 'button.time.start' );
  this.start_picker = this.start_container.querySelector( 'div.picker' );

  this.start_date_btn.addEventListener( 'click', this.onOpenPicker );
  this.start_time_btn.addEventListener( 'click', this.onOpenPicker );


  // End date
  this.end_container.classList.add( 'datetime-container', 'fix-float' );
  this.end_container.insertAdjacentHTML( 'afterbegin', this.getHTMLButton( 'datetime', 'end' ) );
  this.showDateAndTime( this.end_container, this.end_date );

  this.end_date_btn = this.end_container.querySelector( 'button.date.end' );
  this.end_time_btn = this.end_container.querySelector( 'button.time.end' );
  this.end_picker = this.end_container.querySelector( 'div.picker' );

  this.end_date_btn.addEventListener( 'click', this.onOpenPicker );
  this.end_time_btn.addEventListener( 'click', this.onOpenPicker );
}