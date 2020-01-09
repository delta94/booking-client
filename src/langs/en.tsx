import React from "react";
import Mbr from "../atoms/mbr/Mbr";
import { LANG } from "../hooks/hook";
import TextButton from "../atoms/textButton/TextButton";
import JDlist from "../atoms/list/List";
import PhotoFrame from "../atoms/photoFrame/PhotoFrame";

export const en = {
  Apply: "Apply",
  BOTH: "guest, host",
  BY_DATE: "by date",
  BY_DAY_OF_WEEK: "by day",
  CANCEL: "Cancel Reservation",
  CARD: "Payment",
  CASH: "cash payments",
  CHANNEL_PAY: "Channel Pay",
  CHINESE: "Chinese",
  COMPLETE: "booked",
  DISALBE: "stop",
  ENABLE: "normal",
  ENGLISH: "English",
  FAIL: "Reservation failed",
  GUEST: "guest",
  HM: "House manual",
  HM_set: "Set House Manual",
  HM_title: "House Manual Title",
  HOST: "host",
  Headcount: "number of eyes",
  JANDA_provide_free_homepage_for_guest:
    "We provide free homepage for sleeping customers.",
  JAPANESE: "Japanese",
  KOREAN: "Korean",
  MALE: "M",
  FEMALE: "F",
  MONTHLY: "monthly",
  PROGRESSING: "In progress",
  Pricing: "Set Up",
  Rooms: "Rooms",
  DOMITORY: "dormitory",
  ROOM: "room",
  SmsReplaceKey: {
    DOMITORY: "dormitory",
    ROOM: "room",
    STAYDATE: `[date (year / day)]`,
    STAYDATE_YMD: `[date of stay (year / month / day)]`,
    ROOMTYPE_N_COUNT: `[accommodation (room / person)]`,
    BOOKERNAME: `[booker name]`,
    TOTALPRICE: `[price]`,
    PAYMETHOD: `[payment method]`,
    PAYMENTSTATUS: `[payment status]`,
    HM: `[house manual URL]`
  },
  Use_room_specific_tabs: "Use room type specific tabs.",
  VBANK: "Payment Deposit",
  WAIT: "Wait",
  WEEKLY: "Weekly",
  WEHN_BOOKING_CANCEL: "On cancellation",
  WHEN_BOOKING_CREATED: "when creating reservation",
  WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING:
    "When creating a reservation (unpaid)",
  WHEN_BOOKING_UPDATE: "On reservation update",
  YEARLY: "by year",
  accommodation_info: "Accommodation information",
  add_room: "add room",
  add_roomType: "add room type",
  additional_cost: "extra cost",
  admin_screen: "admin screen",
  agree: "agree",
  agree_to_privacy_policy: "Accept personal information",
  alarm: "notification",
  alarm_transmission_completed: "Alarm Transmission Successful",
  alarm_transmission_failed: "Alarm transmission failed",
  allocation_calendar: "allocation calendar",
  applicant: "applicant",
  applicant_contact: "contact applicant",
  applied_product_type: "applied product type",
  applied_url: "applied URL",
  appliedby_default_in_periods_with_no_price_set:
    "Applied by default in periods with no price",
  applies_to_all_reservations_booked_together:
    "Applies to all reservations booked together",
  apply: "apply",
  apply_color: "apply color",
  apply_layout: "application layout",
  apply_this_product_to_house: "Apply this product to your accommodation",
  are_you_sure_you_want_to_delete_the_reservation:
    "Are you sure you want to delete the reservation?",
  are_you_sure_you_want_to_delete_this_guest:
    "Are you sure you want to delete this guest?",
  assig_completed: "assigned",
  assig_failed: "assignment failed",
  assig_guest_specific_setting: "Detailed Settings for Assigned Guests",
  auth: "authentication",
  authenticate: "authenticate",
  auto_send: "auto-send",
  auto_send_condition: "AutoSend Situation",
  auto_send_enable: "Enable autodial",
  auto_send_target: "auto target",
  auto_send_whether: "auto-send",
  available: "available",
  basic_offer: "basic",
  basic_price: "basic price",
  basic_price_is_used_when_season_is_un_setted:
    "Use base price during off-season periods.",
  basic_room_price: "basic room price",
  bedIndex: "bed number",
  block: "space",
  block_highlights: "block highlights",
  block_place: "block",
  block_room: "blocker",
  block_room_completed: "Block Completed",
  block_room_failed: "Block failed",
  booker: "booker",
  booker_info: "reservation information",
  booker_name: "reserver name",
  bookingList: "reservation list",
  booking_status: "reservation status",
  calender_date: "calendar date",
  can_use_after_phone_auth: "Enable after phone authentication",
  cancel: "cancel",
  cancelBooking: "Cancel Reservation",
  cant_find_this_email: "We can't find that email.",
  capacity: "capacity",
  capacity_must_be_at_least_1_person: "You must have at least 1 person.",
  caution: "caution",
  certification_number: "certification number",
  certification_number_sent: "Certificate number sent successfully",
  certification_number_sent_fail: "Failed to Send Certification Number",
  change: "change",
  change_complited: "change completed",
  change_date: "change date",
  change_failed: "change failed",
  change_house: "change of accommodation",
  change_house_fail: "failed to change home",
  change_profile: "change profile",
  change_statistics: "change statistics",
  changed_current_house: "Current Accommodation Change",
  checkCheckInDate: "Please select a check-in date.",
  checkDelete: "Are you sure you want to delete?",
  checkIn: "check in",
  checkOut: "checkout",
  check_location_with_google_map: "Check your location with Google Maps",
  check_net_status: "Please check your network connection!",
  check_our_samples: "Look at the samples.",
  check_password: "check password",
  check_selection: "check selection",
  checkin_change_fail: "checkin change failed",
  checkin_date: "check-in date",
  checkin_status: "check-in status",
  checkout_date: "checkout date",
  chnage_priority: "change rank",
  choose_product: "select product",
  choosen_person: "select person",
  choseCheckInDate: "Please select a check-in date.",
  choseCheckOutDate: "Please select a checkout date.",
  close: "close",
  close_today: "Don't run for a day",
  color_set: "color set",
  complete_pay: "payment completed",
  complete_the_reservation_creation: "Complete reservation creation.",
  completed: "completed",
  config: "config",
  confirm: "confirm",
  connected_email: "connected email",
  connected_number: "connection number",
  consent_to_collection_of_personal_information:
    "Consent to Collect Personal Information",
  contact: "contact",
  copy_reservation_page_URL: "Copy Reservation Page URL",
  create_a_new_template: "Create a new template.",
  create_booking: "create reservation",
  create_house: "create home",
  create_house_completed: "Complete Home",
  create_memo_completed: "Notes Completed",
  create_memo_fail: "Failed to create note",
  create_new_memo: "write a new note",
  create_room: "create room",
  create_roomType_completed: "Room type created successfully",
  create_roomType_fail: "Failed to create room type",
  create_season: "create season",
  create_season_complete: "Season completed",
  create_season_fail: "Season creation failed",
  create_template: "create template",
  create_template_complited: "template created",
  create_template_failed: "template creation failed",
  created_house: "created hostel",
  current_set_number: "currently set number",
  current_status: "current status",
  currently_applied_service: "currently applied service",
  customer_inquiry: "contact us",
  daily_refine_price: "edit detail price",
  date: "day",
  date_of_creation: "date and time of creation",
  date_of_statistics: "statistics date",
  date_of_stay: "date of stay",
  day_of_week: "day of week",
  day_of_week_price: "price per day",
  day_sales: "day sales",
  default_Setting_complted: "Default setting complete",
  default_system_setting: "default system setting",
  delete: "delete",
  deleteBooking: "Delete Reservation",
  delete_booking: "delete a reservation",
  delete_completed: "deleted",
  delete_failed: "delete failed",
  delete_season_complete: "Season Delete Completed",
  delete_season_fail: "Season delete failed",
  delete_template_completed: "template deleted",
  delete_template_failed: "Failed to delete template",
  deleted_note_completed: "Notes deleted successfully",
  deleted_note_failed: "Failed to delete notes",
  detail: "detail",
  detail_adress: "detailed address",
  display_deadline: "displayed",
  display_related_setting: "Assignment related setting",
  displays_a_new_reservation_within_the_set_time:
    "Display new reservations within the set time.",
  division: "division",
  do_copy: "duplicate",
  do_create: "create",
  do_delete: "delete",
  do_modify: "modify",
  do_question: "contact us",
  do_you_want_request_making_homepage:
    "Are you sure you want to create a homepage?",
  domitory: "dormitory",
  dont_send: "not sent",
  download: "download",
  eamil: "email",
  enter_room_type_name: "Please enter a room type name.",
  exit_room_settings: "Exit Room Settings",
  expire_date: "expiration date",
  failt_to_change_house: "failure change",
  female: "female",
  female_gender: "female",
  file: "file",
  find_destination: "find destination",
  free_experience: "free experience",
  fri: "F",
  fullRoom: "full",
  gender: "gender",
  go_back: "go back",
  go_back_to_home: "Back to Home",
  go_to_set: "go to set",
  good_status: "normal",
  goto_create_roomType: "Go to create room type",
  goto_reservation_list: "view reservation list",
  graph_shape: "graph shape",
  group_notification: "group notification",
  guest: "guest",
  guestHouse: "guesthouse",
  have_a_bright_day_sir: "Have a bright day today",
  heavy_type_layout: "heavy type layout",
  home: "home",
  homepage_application_date: "Homepage application date",
  homepage_complete_estimated_date: "Homepage application date",
  homepage_develope_status: "Homepage Activity Status",
  homepage_manual: "homepage manual",
  host: "host",
  hostel: "hostel",
  hotel: "hotel",
  houseName: "hostname",
  house_adress: "hosting address",
  house_delete_completed: "Homestay deleted",
  house_delete_failed: "Failed to delete home",
  house_info: "hotel information",
  house_reservation: "booking accommodation",
  house_setting_completed: "Hosted setup complete",
  house_setting_failed: "Failed to set home",
  house_type: "host type",
  if_there_is_a_new_reservation_the_new_reservation_will_be_displayed_without_refreshing_the_screen:
    "If you have a new reservation, it will appear on screen without refreshing.",
  if_tou_enable_auto_send_msg_msg_will_send_autoMetically:
    "If you make an automatic call, the message will be sent automatically according to the set situation.",
  if_you_choose_wrong_size_product_to_house_service_can_be_stop:
    "Service may be canceled if you choose the wrong size of accommodation",
  if_you_have_problems_with_computer_performance_and_frequent_screen_updates_try_setting_a_higher_pooling_frequency:
    "If you're having trouble with computer performance and frequent screen updates, try setting a higher pooling frequency.",
  if_you_set_up_an_SMS_template_you_can_conveniently_send_the_template_when_you_send_a_message:
    "If you set up an SMS template, you can conveniently send the template when you send a message.",
  if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation:
    "If you violate our accommodation policy, your personal information will be saved with the violation.",
  index: "number",
  information_does_not_exist: "The information does not exist ...",
  input_your_name_please: "Please enter your name.",
  input_your_password_please: "Please enter your password",
  inquire_separately: "separately",
  invalid_password: "Invalid password",
  is_apply_homepage: "Apply homepage",
  is_auto_send_enable: "Enable autodial",
  is_layout_paied: "Will pay for the layout",
  is_selected_info_collect: "Is the selected information correct?",
  item: "item",
  keep_noti: "Keep the note on",
  lang_set: "language set",
  language_setting: "language setting",
  layout_cost: "layout cost",
  left_days: "days left",
  light_type_layout: "light type layout",
  logOut: "log out",
  logOut_complete: "logout complete",
  login: "login",
  login_complete: "login complete",
  make_payment: "Make a payment",
  make_reservation: "reservation",
  male: "male",
  male_gender: "male",
  manual: "manual",
  manual_download_complete: "Manual download complete",
  mark_new_reservation: "Mark a new reservation.",
  memo: "memo",
  memo_content: "memo content",
  memo_save_completed: "Memo Saved",
  memo_save_failed: "Failed to save note",
  menu_enable_set: "enable menus",
  menu_set: "menu settings",
  method_of_payment: "payment method",
  minute: "minute",
  mobile_phone_verification_completed: "Phone Verification Completed",
  mobile_phone_verification_failed: "phone verification failed",
  mobile_phone_verification_number: "mobile phone verification number",
  modify: "modify",
  mon: "M",
  money_unit: "won",
  month: "month",
  month_sales: "monthly sales",
  motel: "motel",
  msg: "message",
  msg_content: "character content",
  must_input_text_of_every_lang_you_supporting:
    "You must fill in all languages ​​you support.",
  name: "name",
  name_is_not_valid: "Not a valid name",
  new: "new",
  new_booking: "new booking",
  next: "next",
  nextResv: "next booking",
  no: "no",
  no_choosen_option: "There are no options.",
  no_house_currently_created: "No listings are currently created.",
  no_notes_are_currently_created: "No notes are currently created.",
  no_notifications: "There are no alarms.",
  no_room_selected: "No room selected.",
  non_members: "nonmembers",
  none: "none",
  none_limit_gender: "no limit (mixed)",
  none_product: "no product",
  normal_price: "normal",
  not_a_valid_email: "This is not a valid email",
  not_a_valid_mobile_number: "Not a valid mobile number.",
  not_a_valid_name: "Not a valid name",
  not_a_valid_password: "Not a valid password",
  not_a_valid_phoneNumber: "Not a valid mobile number",
  not_agree: "disagree",
  not_use: "disabled",
  note_updated: "Notes updated successfully",
  note_updated_failed: "Failed to update note",
  noti_level: "alarm importance",
  noti_msg: "notification",
  noti_period: "alarm period",
  noti_setting: "alarm settings",
  noti_target: "notification target",
  noti_title: "notification title",
  nth: "rank",
  only_on_first_purchase: "Only on first purchase",
  only_remove_that_guest: "remove only that guest",
  opps_something_problem_happend: "Oops! There was a problem.",
  others_booked_by_the_reservation_will_not_be_erased:
    "Other people booked by this reservation will not be erased.",
  outgoing_destination: "From",
  page: "page",
  page_does_not_exist: "Page does not exist",
  password: "password",
  password_condition:
    "* 1 or more special characters, 7 to 15 alphanumeric characters",
  password_is_not_matched: "Password check did not match.",
  passwords_do_not_match: "Passwords do not match.",
  pay_cancel: "Cancel payment",
  payment_canceled: "Payment canceled",
  payment_info: "payment information",
  payment_status: "payment status",
  paymethod: "payment method",
  pension: "pension",
  person_unit: "people",
  personnel: "person",
  phoneNum_is_not_valid: "Not a valid name.",
  phoneNumber: "phone number",
  phone_authenticate: "Authenticating your phone",
  please_agree_collect_personal_info: "Agree to collect personal information",
  please_aree_to_info_offer: "Please give me your informed consent",
  please_cancel_the_product_first: "Please cancel the product first.",
  please_create_house: "Please create a property.",
  please_enter_a_base_price: "Please enter a base price.",
  please_enter_booker_name: "Please enter your reservation name",
  please_enter_phone_number: "Please enter your phone number.",
  please_enter_the_name_of_the_house: "Please enter your name.",
  please_enter_your_phone_number: "Please enter your phone number.",
  please_input_HM_title: "Please enter the title of the house manual",
  please_inquire_separately: "Please contact us separately.",
  please_request_through_helpline: "Please request by phone.",
  please_search_house_location: "Search for a location.",
  please_select_a_payment_method: "Please select a payment method.",
  please_select_a_payment_status: "Please select a payment status.",
  please_select_checkOut_date: "Please select a checkout date.",
  please_select_date: "Please select a date",
  please_select_reservation_status: "Please select a reservation status.",
  please_select_the_accommodation_type: "Please select a accommodation type.",
  please_select_the_number_of_people: "Please select the number of people.",
  please_slect_date_at_calender: "Please select a date from the calendar.",
  please_specify_the_date: "Please specify a date.",
  polling_period: "pulling cycle",
  polling_period_setting: "Pulling cycle setting",
  preferences: "preferences",
  prev: "previous",
  preview: "preview",
  price: "price",
  price_setting: "price setting",
  price_setting_complited: "Price setting",
  price_setting_delete: "Delete pricing",
  price_setting_delete_fail: "Failed to delete price",
  price_setting_failed: "Price failed",
  priority: "priority",
  priority_change_fail: "Failed to change priority",
  priority_changed: "Change priority",
  privacy_item: "privacy item",
  proceeding: "in progress",
  product1_detail1: "Try it before you buy a product.",
  product1_detail2: "This product is intended for a pre-purchase trial.",
  product1_detail3: "You can not get a free homepage in the sleep.",
  product1_detail4:
    "Most services are available and not available after 2 weeks.",
  product1_detail5:
    "If you apply a new product after the deadline, you can continue to use it.",
  product1_short1: "Can test for 2 weeks",
  product1_short2: "Try and decide",
  product1_short3: "You can start right now",
  product2_detail1:
    "Optimized for guest house and small to medium sized accommodations.",
  product2_detail3: "You can get a free homepage on the couch.",
  product2_detail4:
    "The expiration date is one month, with a repayment after one month.",
  product2_short1: "Small and Medium Optimization Service",
  product2_short2: "Only the services you need are easy",
  product2_short3: "Use it simply",
  product3_detail1: "Suitable for large hotels like hotels.",
  product3_detail3: "You can get a free homepage on the couch.",
  product3_detail4: "You can request a custom home which may cost extra.",
  product3_detail5:
    "The expiration date is one month, with a repayment after one month.",
  product3_short1: "Optimize a hotel large solution",
  product3_short2: "hotel manager involved",
  product3_short3: "We provide various services.",
  product4_short1: "reservation of out-of-night services",
  product4_short2: "Do you need to manage another reservation?",
  product4_short3: "Please select this product",
  product_application_completed: "Product Application Completed",
  product_application_failed: "Failed to apply for product",
  product_has_expired: "The product has expired.",
  product_memo: "product note",
  product_price: "product amount",
  provides_a_tab_that_can_be_divided_by_status_in_the_assignment_calendar:
    "Provides a tab for dividing by status in the assignment calendar",
  purpose_of_collection: "collection purpose",
  receiver: "receiver",
  release_service: "release service",
  remove_all_reservations_booked_together:
    "remove all reservations booked together",
  remove_roomType_completed: "Room type removed successfully",
  remove_roomType_fail: "Failed to remove room type",
  rep_color: "representative color",
  request_url: "request URL",
  reservation_confirm: "Confirm Reservation",
  reservation_creation_complete: "reservation created",
  reservation_creation_fail: "Failed to create reservation",
  reservation_date: "reservation date",
  reservation_delete_complete: "reservation deleted",
  reservation_delete_fail: "Failed to delete reservation",
  reservation_did_date: "Reservation date",
  reservation_information: "reservation information",
  reservation_is_completed: "The reservation is complete",
  reservation_lookup: "lookup reservation",
  reservation_mark: "mark reservation",
  reservation_memo: "reservation note",
  reservation_setting: "reservation settings",
  reservation_update: "update reservation",
  reservation_update_fail: "Reservation update failed",
  reservations_booked_directly_by_the_administrator_are_not_displayed:
    "Reservations booked directly by an administrator are not shown.",
  retention_period: "retention period",
  room: "room",
  roomForm: "room",
  roomPic: "room picture",
  roomType: "room type",
  room_block_release: "release the block",
  room_block_release_fail: "Failed to release barrier",
  room_config: "room setting",
  room_count: "number of rooms",
  room_create_completed: "Room created successfully",
  room_create_fail: "Failed to create room",
  room_delete_completed: "room deleted",
  room_delete_fail: "Failed to delete room",
  room_gender: "bangstar",
  room_info: "room information",
  room_name: "room name",
  room_name_must_be_10_characters_or_less:
    "Room name must be 10 characters or less.",
  room_select: "select room",
  room_setting: "room setting",
  room_type_basic_price: "room type basic price",
  room_type_desc: "Description of room type",
  room_type_name: "room type name",
  room_type_tab: "tab by room type",
  room_update: "update room",
  room_update_fail: "Failed to update room",
  row: "column",
  sales: "sales",
  sales_statistics: "sales statistics",
  sat: "Sat",
  save: "save",
  search: "search",
  search_reservation: "Search for reservations",
  season: "season",
  season_basic_price: "season base price",
  season_name: "season name",
  season_period: "seasonal period",
  second: "second",
  select: "select",
  select_date: "select date",
  select_house_type: "choose accommodation type",
  select_roomGender: "Select by room",
  select_roomType: "select room type",
  select_service: "select service",
  select_support_language: "select supported languages",
  select_the_desired_setting_item: "Please select your preference.",
  selection_information_is_correct: "Your selection is correct",
  send: "send",
  sendSMS: "send",
  send_complete: "send complete",
  send_fail: "send failure",
  send_notification: "send notification",
  send_sms: "send text",
  send_sms_complited: "sent",
  send_sms_failed: "send failed",
  send_status: "send status",
  send_target: "send to",
  host_slash_guest: "host/guest",
  send_text_to_host: "Send Text to Host",
  send_type: "send type",
  seperatle_gender: "unlimited (mixed x)",
  server_will_check_if_there_is_a_new_reservation_once_every_set_number_by_ms:
    "I get a new confirmation from the server once every set number / ms.",
  service_request_is_completed: "Your service request is complete",
  set_daily_price: "Set daily price",
  set_product_type: "set product type",
  setting_fail: "setting failed",
  signUp: "sign up",
  signup_complted: "Sign up complete",
  singUp_submit: "subscribed",
  six_months_after_stay: "6 months after stay",
  smooth_reservation_management: "secure scheduling management",
  sms_history: "SMS history",
  sms_setting: "SMS Settings",
  sms_template: "character template",
  someone_is_making_a_reservation: "Someone is making a reservation.",
  start_experience: "Start experience",
  statistical_transformation: "statistic transformation",
  statistics: "stats",
  status: "status",
  stop: "stop",
  sun: "sun",
  support: "support",
  system_config: "system configuration",
  system_related_settings: "system-related settings",
  take_a_look: "look around",
  template_msg: "template message",
  template_title: "template title",
  test_on_two_weeks: "Can test for two weeks",
  thank_you: "Thank you.",
  the_current_product_has_expired_normal_service_is_not_possible_Please_proceed_with_the_payment:
    "Current product has expired. Normal service is not available. Please proceed with payment.",
  the_email_set_is_not_valid: "The email set is not valid.",
  the_max_count_of_houseName_is_20:
    "Your name can be up to 20 characters long.",
  the_memo_gives_an_alarm_on_the_next_connection:
    "The memo gives an alarm on the next connection.",
  the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service:
    "Minimum personal information is required to provide the service, you must agree to use the service",
  the_phone_number_set_is_not_valid: "The set phone number is invalid.",
  there_is_an_alarm_set_note: "There is a note set for alarm.",
  there_is_no_room_in_selected_date: "No room is available for that day",
  this_month_sales: "This Month's Sales",
  this_price_modification_will_be_the_highest_priority_of_all_pricing:
    "Modifying that price is the highest priority of all pricing.",
  thu: "Tu",
  till: "until",
  time: "time",
  timeout_please_request_again: "Please try again.",
  todat_sleep_people: "people today",
  today: "today",
  today_checkIn_people: "Check-in Today",
  today_sales: "today's sales",
  tomorrow_checkIn_people: "Check-in tomorrow",
  total_price: "total price",
  transmission_time: "transmission time",
  try_to_create_in_SMS_settings: "Try to create it in SMS settings.",
  tue: "T",
  turn_off_alarm: "disable alerts",
  unPaid: "unpaid",
  unSupport: "not supported",
  un_choosen: "none",
  un_send_Sms: "not sent",
  unapplied: "not applicable",
  unappliy: "unapply",
  update_complete: "Update complete",
  update_fail: "Update failed",
  update_profile: "update profile",
  update_profile_fail: "profile update failed",
  update_roomType_completed: "Room type updated successfully",
  update_roomType_fail: "Failed to update room type",
  update_template_completed: "Template updated complete",
  update_template_failed: "Template update failed",
  update_to_recommended_browser_chrome:
    "Update to recommended browser (Chrome)",
  upgrade: "upgrade",
  url_is_copied: "URL was copied",
  usage_amount: "use amount",
  use: "use",
  use_color_setting_function: "color setting function",
  useing: "in use",
  username_must_be_email: "ID must be an email",
  using: "in use",
  view_SMS_history: "View SMS History",
  view_info: "view info",
  view_terms: "view terms",
  waiting: "waiting",
  we_collect_your_personal_information_to_provide_the_service:
    "We collect your personal information to provide you services.",
  we_recommend_using_the_Chrome_browser_before_using_the_app:
    "We recommend using the Chrome browser before using the app.",
  we_will_contect_you_in_3_days:
    "A representative will contact you within 3 days.",
  wed: "wed",
  when_day_of_week_price_is_not_setted_basic_season_price_will_be_used:
    "If the day is not covered by the price by day, the season's base price will be used.",
  when_season_multiple_applyed_use_left_side_value_will_be_used:
    "We will use the left season price while the season is nested",
  which_unit_would_you_like_to_see: "Which unit do you want to show?",
  will_only_use_the_reservation_system:
    "I will only use the reservation system",
  witch_statistics_do_you_want: "What statistics do you want?",
  write_a_description_of_the_menu: "Write a description of the menu.",
  year: "year",
  year_sales: "year sales",
  yes: "yes",
  you_can_clear_the_display_by_clicking: "Click to clear that marker",
  your_request_cannot_be_fulfilled_right_now:
    "I can't fulfill my request right now",
  youth_hostel: "youth hostel",
  please_verify_your_mobile_phone_to_ensure_smooth_service: (
    <span>Please verify your mobile phone to ensure smooth service.</span>
  ),
  F_selected_product_apply_to_house: (houseName: any) => (
    <span>
      * The service you choose
      <span className="JDtextColor--point"> {`$ {houseName}`} </span>
      Apply.
    </span>
  ),
  F_have_x_days_left_to_try_for_free: (daysLeftToExpire: string) =>
    `$ {DaysLeftToExpire} left until service terminated`,
  F_user_name_hello: (userName: any) => `Hello $ {userName}`,
  F_user_name_good_luck: (userName: any) =>
    `$ {userName} wish you all the best.`,
  F_user_name_have_a_bright_day: (userName: any) =>
    `$ {userName}, have a great day today`,
  F_have_house_count_n: (n: any) => `own $ {n} properties`,
  F_you_have_x_free_trial_left_y__is_about_to_expire: (
    daysLeftToExpire: any,
    expireDate: any
  ) =>
    `You have $ {daysLeftToExpire} free trial left. $ {expireDate} is about to expire.`,
  F_product2_detail2: (n: any) =>
    `This product is suitable for accommodation with $ {n} rooms or less.`,
  F_product3_detail2: (n: any) =>
    `This product is suitable for accommodation with $ {n} rooms or less.`,
  the_price_is_too_low_are_you_sure_to_set_this_price: (
    <span>
      The price is less than 1000 won. <br />
      Do you really want to set the price?
    </span>
  ),
  house_create: (
    <span>
      Rooms
      <Mbr />
      produce
    </span>
  ),
  product_registration: (
    <span>
      product
      <Mbr />
      Enrollment
    </span>
  ),
  this_is_an_old_browser_Problems_may_occur_while_using_the_service_Please_update_your_browser: (
    <span>
      This is an old browser. Problems may occur while using the service. <br />{" "}
      {""}
      Please update your browser.
    </span>
  ),
  HM_provides_guests_with_a_comfortable_and_convenient_accommodation_send_the_guide_page: (
    <span>
      The House Manual provides a guide page for guests to use the accommodation
      easily and conveniently. Send. <br />
      The house manual will save you the trouble of explaining how to use your
      accommodation.
    </span>
  ),
  automatically_send_prompts_to_your_guests: (
    <span>
      Let your guests know
      <Mbr />
      Try sending it automatically.
    </span>
  ),
  roomType_dose_not_exsist: (
    <span>
      Room type <Mbr /> does not exist.
    </span>
  ),
  additionaly_setting_to_will_good_for_manage_ment: (
    <span>
      In addition, the following settings will help you to run the <Mbr />{" "}
      accommodation!
    </span>
  ),
  default_setting_is_compelted: (
    <span>
      The default setting is
      <Mbr /> Finished.
    </span>
  ),
  make_it_easy_to_guide_accommodation_for_guests: (
    <span>
      Accommodation for guests <Mbr />
      Make it easy to guide.
    </span>
  ),
  try_setting_it_up_different_prices_by_date: (
    <span>
      Different prices by date
      <Mbr /> Try setting it up.
    </span>
  ),
  monthly_fee: "monthly rate",
  TODAY_STAY: "How many people stay today",
  TODAY_CHECKIN: "Who check in today",
  TOMORROW_CHECKIN: "Who checks in tomorrow",
  EXSIST_INFO: "selected people",
  service_expire: "service expiration",
  RoomGender: {
    FEMALE: "Women only",
    MALE: "Men only",
    ANY: "No gender restrictions",
    SEPARATELY: "Most mixed"
  },
  december: "DEC",
  november: "NOV",
  october: "OCT",
  september: "SEP",
  august: "AUG",
  july: "JUL",
  june: "Jun",
  may: "May",
  april: "APR",
  march: "MAR",
  february: "FEB",
  january: "JAN",
  copy_hm_page_URL: "Copy house manual URL",
  HM_update: "Update House Manual",
  HM_update_fail: "House manual update failed",
  //1.0.1 add
  un_checkIn: "un checkIn",
  PaymentStatus: {
    CANCEL: "unPaid",
    PROGRESSING: "processing",
    COMPLETE: "complete"
  },
  SendTarget: {
    BOTH: "guest/host",
    GUEST: "guest",
    HOST: "host"
  },
  please_select_pay_status: "please select pay status",
  exit_house_settings: "exit house settings",
  none_data: "no data",
  dontSMS: "don't sms",
  hm_page_URL: "house manual URL",
  move_hm_page: "to house manual",
  reservation_page_URL: "reservation page URL",
  move_reservation_page: "to reservation page",
  reservation_creation_complete_for_guest: "reservation complete",
  reservation_creation_fail_for_guest: "reservation fail",
  price_priority:
    "* Priority priority: Room type base price < Seasonal base price < Season day price < Daily price",
  reference_fail: "reference fail",
  reference_sucess: "reference sucess",
  funnels: "funnels",
  see_all: "see all",
  Funnels: {
    AGODA: "AGODA",
    AIRBNB: "AIRBNB",
    BOOKING_COM: "BOOKING_COM",
    COOPANG: "COOPANG",
    ELSE_CHANNEL: "ELSE CHANNEL",
    FREINDS: "FREINDS",
    HOMEPAGE: "HOMEPAGE",
    NAVER: "NAVER",
    PHONE_CALL: "PHONE BOOK",
    WALK_IN: "WALK IN",
    YANOLJA: "YANOLJA",
    YEOGIEOTTAE: "YEOGIEOTTAE"
  },
  goto_today: "to today",
  // 1.1.0 패치
  email: "email",
  find_email: "find email",
  get_temporary_password: "get temp password",
  temp_password: "temp password",
  copied_to_cliboard: "copied to cliboard",
  current_password: "current password",
  password_resset: "password reset",
  password_rewrite: "password rewrite",
  password_resset_completed: "password reset completed",
  password_resset_failed: "password reset failed",
  get_email_bt_msg: "get email by message",
  change_password_complete: "password change completed",
  change_password_failed: "password change failed",
  new_password: "new password",
  card_resist: "card resist",
  card_number: "card number",
  check_product: "check product",
  regist: "regist",
  exp_year: "exp/year",
  exp_month: "exp/month",
  card_regist_complete_fail: "card regist fail",
  card_regist_complete: "card regist complete",
  payment_regist_complete: "payment regist complete",
  registration_confirmation: "registration confimation",
  input_information: "input information",
  input_card_information: "input card information",
  idnumber_6front: "id number 6",
  idnumber_or_business_number: "id num/business num",
  card_pasword_front_two_digits: "card password",
  completing_this_card_registration_you_agree_to_the:
    "By registering this card information, you agree to the following",
  please_rewrite_your_new_password: (
    <span>
      temp password detected please change your password
      <br />
      please get new password
    </span>
  ),
  use_conditions: "use condition",
  privacy_policy: "privacy policy",
  and: "end",
  member_ship: "member ship",
  create_memo: "create memo",
  host_memo: "host memo",
  guest_memo: "guest memo",
  write: "write",
  no_guest_notes_after_today: "no guest notes after today",
  update: "update",
  create: "create",
  house_front_img: "house front img",
  house_title: "house title",
  info_img: "info img",
  info_txt: "info text",
  current_config_lang: "current config language",
  solution_usage_guide: "solution usage guide",
  payment_information: "payment info",
  member_name: "member name",
  regi_date: "regi date",
  product_info: "product info",
  deposit_card_owner: "deposit card owner",
  pay_regist_complete_title: (
    <span>
      JANDA SOLUTION <br />
      periodical payment is resgisted
    </span>
  ),
  pay_regist_complete_text:
    "Thank you for your regular payment. If you want to change your payment information or change your payment information, you can change it on Mypage. If you haven't made the payment, please contact our Customer Support Center at support@stayjanda.com. Please email me",
  card_regist_complete_message: (
    <span>
      The card information is registered. You can check the information in{" "}
      <TextButton color="primary">MYPage</TextButton>
    </span>
  ),
  pay_with_this_card: "payment registration with this card",
  static_page_desc:
    "You can check the statistics on sales. You can check the sales in the meantime by setting the date and due date.",
  assigTimeline__decs: "You can assign guests to any room in your calendar.",
  JANDA_home: "JANDA Home",
  JANDA_home_desc:
    "You can check the assignment status for today's date in the current dashboard.",
  bookingList__desc:
    "The reservation information is displayed in chronological order.",
  price_setting__desc:
    "You can set the price for each day or price for a period. Try adjusting the price to be on that day.",
  lang_use_set: "Enable language",
  HM_set__desc: (
    <span>
      The House Manual provides a guide page for guests to use the accommodation
      easily and conveniently. Send. <br />
      The house manual will save you the trouble of explaining how to use your
      accommodation.
    </span>
  ),
  user_info: "Profile",
  periodicalPay_manage: "Periodic payment management",
  product_change: "Product change",
  periodical_pay_regist_complete: "Subscription registration completed",
  periodical_pay_regist_fail: "Subscription registration failed",
  sign_date: "sign date",
  change_periodical_change: "정기결제 정보 변경",
  payment_fee: "납부요금",
  approved: "승인완료",
  excel_express: "엑셀출력",
  express_info: "출력정보",
  express_count: "출력갯수",
  bill_pay_cancle: "정기 결제 취소",
  bill_pay_cancle_complete: "정기 결제 취소 완료",
  bill_pay_cancle_fail: "정기 결제 취소 실패",
  on_testing: "테스트 사용중",
  un_registed: "적용안됨",
  uploade_compelte: "업로드 완료",
  uploade_fail: "업로드 실패",
  HM_detail_info: "하우스 메뉴얼 상세정보",
  ExcelExpress: {
    SELECT_OP: "현재 선택한 내용으로 출력",
    COUNT_OP: "최근 생성 갯수로 출력",
    DATE_OP: "날짜로 출력"
  },
  unit: "개",
  pay_date: "납부일자",
  bill: "영수증",
  need_regist: (
    <TextButton className="JDstandard-margin0" color="error">
      등록필요
    </TextButton>
  ),
  go_to_sms_template: "SMS 양식 바로가기",
  how_to_save_sms_template_title: "SMS양식 저장하는 방법",
  how_to_save_sms_template_doc: (
    <JDlist
      marginBottom="long"
      contents={[
        <div>
          1. <b>SMS양식</b> 메뉴에서 <b>[양식생성]</b>을 클릭합니다.
        </div>,
        <div>
          2. 양식생성 화면에서 타이틀과, 메시지를 입력하시고 메시지화면에서 중간
          중간에 생성할
          <b>
            숙박일자/숙박정보/예약자명/가격/결제방법/결제상태/하우스메뉴얼URL
          </b>
          문구를 아래에 <b>양식메시지</b>에서 클릭하시면 메시지 발송시에
          자동으로 정보가 입력됩니다.
        </div>,
        <div>
          <PhotoFrame
            src={`https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/smsinfo_img_01.png`}
          />
        </div>,
        <div>
          3. 자동발신 상태를{" "}
          <b>예약취소시/예약생성시/예약생성시(미결제)/예약업데이트시</b> 별로
          선택하여 설정하고
        </div>,
        <div>
          4. 발신대상을 <b>게스트/호스트/게스트+호스트</b> 별로 지정을 해주시고
          우측에 <b>자동발신 활설화</b> 여부를 on / oFF 설정해주시면 언제든지
          고객에게 알림 문자가 발송되게 설정됩니다
        </div>
      ]}
    />
  ),
  how_to_send_sms_for_all_title: "단체SMS 보내는 방법",
  how_to_send_sms_for_all_doc: (
    <JDlist
      marginBottom="long"
      contents={[
        <span>
          1. 단체SMS는 솔루션 메인화면과 예약목록 화면에서 가능합니다.
          <b>메인화면</b>에서는 오늘의 예약리스트 상단에 <b>‘단체메시지’</b>{" "}
          버튼을 클릭하셔야 보낼 수 있고, <b>예약목록</b> 화면에서는 내가 원하는
          예약자를 선택하여 리스트 상단에 <b>‘문자전송’</b>버튼을 클릭해서
          여러명에게 단체문자를 보낼 수 있습니다.
        </span>,
        <div>
          2. 그러나 단체SMS를 보내기 위해서는 <b>SMS양식</b>화면에서 미리 만들어
          둔 SMS양식이 있어야 합니다. 개성있고 재밌는 SMS양식을 만들어주세요.
          예시 : 조식알림문자, 저녁 파티이벤트 안내 문자, 공사안내, 분실물안내,
          긴급대피안내문자
        </div>
      ]}
    />
  ),
  sms_usage: "SMS 이용법",
  sms_service: "SMS 서비스",
  credit: "신용",
  expiration_date: "유효기한",
  add_card: "카드추가",
  please_input_card_info: "카드정보를 입력해 주세요.",
  add_card_dec: "빠르고 간편한 결제를 위해 카드를 등록해주세요.",
  card_info: "카드정보",
  card_delte_complete: "카드 삭제 성공",
  card_info_complete_fail: "카드 삭제 실패",
  periodical_cancel_complete: "정기결제 취소 완료",
  periodical_cancel_complete_fail: "정기결제 취소 실패",
  card_regist: "카드 등록",
  card_delete: "카드 삭제",
  bill_pay_regist: "정기 결제 등록",
  bill_pay_regist_width_this_card: "이 카드로 정기결제 등록",
  bill_pay_regist_change_width_this_card: "이 카드로 정기결제 변경",
  un_exsist_page: "존재 하지않는 페이지",
  sms_info: "SMS 안내",
  sms_info_decs: "SMS 이용에대한 안내 드립니다.",
  un_exsist_page_decs: (
    <span>
      존재 하지않는 페이지 입니다.
      <br /> 뒤로가기를 눌러주세요.
    </span>
  ),
  mypage: "MY PAGE",
  solution_specification: "solution_specification",
  noti_config: "noti config",
  memo_manage: "memo manage",
  house_detail_config: "house detail config",
  frequent_questions: "frequent question",
  mypage_profile_desc: "Change user info",
  mypage_houses_desc: "Management created houses",
  show_detail: "read more",
  basic_config: "default setting",
  guestStatus_mark: "guest status mark",
  shortkey_config: "keyboard setting",
  change_pay_method: "Change pay method",
  un_validate_card_number: "Invalid card number.",
  un_validate_card_expire: "Invalid card due date.",
  periodical_paying: "using",
  creadit_card_change: "change credit card",
  select_this_card: "change to this card",
  pay_history: "pay history",
  there_is_no_card: "There is no exist card",
  no_card: "no card",
  HouseType: {
    GUEST_HOUSE: "GuestHouse",
    HOTEL: "Hotel",
    MOTEL: "Motel",
    PENSION: "Pension",
    HOSTEL: "Hostel",
    YOUTH_HOSTEL: "Youth Hotel"
  },
  please_select_room_gender: "please sleect room gender",
  please_input_max_people_count: "Please enter max count cpacity",
  please_select_room_type: "Please select room type.",
  room_assig_info: "room/assig info",
  else: "else",
  check_init: "check init"
};

export default en;
