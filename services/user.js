'use strict'
var moment = require('moment-timezone');
var Promise = require('bluebird');

let errors = {
    emptyData: {
        message: 'data is empty, please return entered',
        code: 'data empty',
        status: 400
    },
    undefinedData: {
        message: 'data is undefined, please return entered',
        code: 'data undefined',
        status: 401
    }
};

module.exports = (userRepository) => {
    return {
        create:createUser,
        update:updateUser,
        deleteUser:deleteUser,
        getAll:getAllUsers,
        getUserById: getUserById,
        checkTime:checkTime,
        momentTime:momentTime
    };

    function createUser(data) {
        return new Promise((resolve, reject) => {
            let user = {
                firstname: data.firstname,
                lastname: data.lastname,
                timezone: data.timezone,
                start_t: data.start_t,
                end_t: data.end_t,
                email: data.email
            };

            if (data.firstname == "" || data.lastname == "" || data.timezone == "" || data.start_t == ""
                || data.end_t == "" || data.email == "") {

                reject(errors.emptyData);
                return;
            }
            if (data.firstname == undefined || data.lastname == undefined || data.timezone == undefined || data.start_t == undefined
                || data.end_t == undefined || data.email == undefined) {

                reject(errors.undefinedData);
                return;
            }
            userRepository.create(user)
                .then((user) => {
                    resolve(user);
                })
                .catch(reject);
        });
    }
    function updateUser(id,data) {
        return new Promise((resolve, reject) => {
            let update_user = {
                firstname: data.firstname,
                lastname: data.lastname,
                timezone: data.timezone,
                start_t: data.start_t,
                end_t: data.end_t,
                email: data.email
            };

            if (update_user.firstname == undefined || update_user.lastname == undefined ||
                update_user.timezone == undefined || update_user.start_t == undefined
                || update_user.end_t == undefined || update_user.email == undefined) {

                reject(errors.undefinedData);
                return;
            }
            if (update_user.firstname == "" || update_user.lastname == "" ||
                update_user.timezone == "" || update_user.start_t == ""
                || update_user.end_t == "" || update_user.email == "") {

                reject(errors.emptyData);
                return;
            }

            userRepository.update(update_user, {where: {id: id}, limit: 1})
                .then(() => resolve(update_user))
                .catch(reject);
        });
    }
    function deleteUser(id) {
        return new Promise((resolve, reject) => {
            userRepository.destroy({where : {id : id}})
                .then(() => {
                    resolve({success:true});
                })
                .catch(reject);
        });
    }
    function getAllUsers() {
        return new Promise((resolve, reject) => {
            userRepository.findAll()
                .then((user) => resolve(user))
                .catch(reject);
        });
    }
    function getUserById(id) {
        return new Promise((resolve, reject) => {
            userRepository.findById(id)
                .then((user) => resolve(user))
                .catch(reject);
        });
    }
    function generate_value(value) {
        var value_ = JSON.stringify({postDate :value.split(":")});
        var value_parse = JSON.parse(value_);
        return value_parse;
    }
    function momentTime(id,id2) {
        return new Promise((resolve, reject) => {
            Promise.all([userRepository.findById(id), userRepository.findById(id2)])
                .spread((user1, user2) => {
                    var valid_start, valid_end;
                    var valid_start2, valid_end2;
                    var valid_start_m, valid_end_m;
                    var valid_start_m2, valid_end_m2;
                    var max_, min_;
                    var max_m, min_m;

                    var start_ = user1.start_t;
                    var end_ = user1.end_t;
                    var zone_ = user1.timezone;
                    var zone_format = moment().tz(zone_).format('Z');

                    var start_2 = user2.start_t;
                    var end_2 = user2.end_t;
                    var zone_2 = user2.timezone;
                    var zone_format2 = moment().tz(zone_2).format('Z');

                    var gen_start = generate_value(start_);
                    var gen_end = generate_value(end_);
                    var gen_zone = generate_value(zone_format);

                    var gen_start2 = generate_value(start_2);
                    var gen_end2 = generate_value(end_2);
                    var gen_zone2 = generate_value(zone_format2);

                    var gen_start_v1 = gen_start.postDate[0];
                    var gen_start_v2 = gen_start.postDate[1];

                    var gen_start_v1_2 = gen_start2.postDate[0];
                    var gen_start_v2_2 = gen_start2.postDate[1];

                    var int_start_h = parseInt(gen_start_v1);
                    var int_start_m = parseInt(gen_start_v2);

                    var int_start_h2 = parseInt(gen_start_v1_2);
                    var int_start_m2 = parseInt(gen_start_v2_2);

                    var gen_end_v1 = gen_end.postDate[0];
                    var gen_end_v2 = gen_end.postDate[1];

                    var gen_end_v1_2 = gen_end2.postDate[0];
                    var gen_end_v2_2 = gen_end2.postDate[1];

                    var int_end_h = parseInt(gen_end_v1);
                    var int_end_m = parseInt(gen_end_v2);

                    var int_end_h2 = parseInt(gen_end_v1_2);
                    var int_end_m2 = parseInt(gen_end_v2_2);

                    var gen_zone_v1 = gen_zone.postDate[0];
                    var gen_zone_v2 = gen_zone.postDate[1];

                    var gen_zone_v1_2 = gen_zone2.postDate[0];
                    var gen_zone_v2_2 = gen_zone2.postDate[1];

                    var int_zone_h = parseInt(gen_zone_v1);
                    var int_zone_m = parseInt(gen_zone_v2);

                    var int_zone_h2 = parseInt(gen_zone_v1_2);
                    var int_zone_m2 = parseInt(gen_zone_v2_2);

                    var value1_s_h = int_start_h - int_zone_h;
                    var value1_e_h = int_end_h - int_zone_h;

                    var value1_s_m = int_start_m - int_zone_m;
                    var value1_e_m = int_end_m - int_zone_m;

                    var value1_s_h2 = int_start_h2 - int_zone_h2;
                    var value1_e_h2 = int_end_h2 - int_zone_h2;

                    var value1_s_m2 = int_start_m2 - int_zone_m2;
                    var value1_e_m2 = int_end_m2 - int_zone_m2;

                    max_ = value1_s_h > value1_s_h2 ? value1_s_h : value1_s_h2;
                    min_ = value1_e_h < value1_e_h2 ? value1_e_h : value1_e_h2;

                    max_m = value1_s_h > value1_s_h2? value1_s_m : value1_s_m2;
                    min_m = value1_e_h < value1_e_h2 ? value1_e_m : value1_e_m2;

                    var interval = min_ - max_;
                    if (interval <= 0) {
                        resolve("Не пересекаются.")
                    }
                    else {
                        var cross_start_u1 = max_ + int_zone_h;
                        var cross_end_u1 = min_ + int_zone_h;

                        var cross_start_u2 = max_ + int_zone_h2;
                        var cross_end_u2 = min_ + int_zone_h2;

                        var cross_start_u1_m = max_m + int_zone_m;
                        var cross_end_u1_m = min_m + int_zone_m;

                        var cross_start_u2_m = max_m + int_zone_m2;
                        var cross_end_u2_m = min_m + int_zone_m2;

                        var valid_cross_start_u1_m,
                            valid_cross_start_u1_h,
                            valid_cross_start_u2_m,
                            valid_cross_end_u1_m,
                            valid_cross_end_u2_m,
                            valid_cross_start_u2_h,
                            valid_cross_end_u1_h,
                            valid_cross_end_u2_h;

                        if(cross_start_u1_m < 0){
                            valid_cross_start_u1_m = cross_start_u1_m + 60;
                            valid_cross_start_u1_h = cross_start_u1 - 1;
                        }
                        else{
                            valid_cross_start_u1_m = cross_start_u1_m;
                            valid_cross_start_u1_h = cross_start_u1;
                        }

                        if(cross_start_u2_m < 0){
                            valid_cross_start_u2_m = cross_start_u2_m + 60;
                            valid_cross_start_u2_h = cross_start_u2 - 1;
                        }
                        else{
                            valid_cross_start_u2_m = cross_start_u2_m;
                            valid_cross_start_u2_h = cross_start_u2;
                        }

                        if(cross_end_u1_m < 0){
                            valid_cross_end_u1_m = cross_end_u1_m + 60;
                            valid_cross_end_u1_h = cross_end_u1 - 1;
                        }
                        else{
                            valid_cross_end_u1_m = cross_end_u1_m;
                            valid_cross_end_u1_h = cross_end_u1;
                        }

                        if(cross_end_u2_m < 0){
                            valid_cross_end_u2_m = cross_end_u2_m + 60;
                            valid_cross_end_u2_h = cross_end_u2 - 1;
                        }
                        else{
                            valid_cross_end_u2_m = cross_end_u2_m;
                            valid_cross_end_u2_h = cross_end_u2;
                        }

                        if(cross_start_u2_m >= 60)
                        {
                            valid_cross_start_u2_m = valid_cross_start_u2_m - 60;
                            valid_cross_start_u2_h = valid_cross_start_u2_h + 1;
                        }

                        if(cross_start_u1_m >= 60)
                        {
                            valid_cross_start_u1_m = valid_cross_start_u1_m - 60;
                            valid_cross_start_u1_h = valid_cross_start_u1_h + 1;
                        }

                        let result = {
                            user1: valid_cross_start_u1_h + ":" + valid_cross_start_u1_m + " - " + valid_cross_end_u1_h + ":" + valid_cross_end_u1_m,
                            user2: valid_cross_start_u2_h + ":" + valid_cross_start_u2_m + " - " + valid_cross_end_u2_h + ":" + valid_cross_end_u2_m,
                        }

                        resolve(result);
                }
                });
        });
    };

    function checkTime(id) {
        return new Promise((resolve, reject) => {
            userRepository.findById(id)
                .then((user) => {
                    var start_ = user.start_t;
                    var end_ = user.end_t;
                    var zone_ = user.timezone;
                    var zone_format_utc = moment().tz(zone_).format('Z');
                    var source_ = moment().format("HH:mm");
                    var source_utc = moment().format('Z');
                    let result = {
                        msg1: "Work time.",
                        msg2: "Not Work time."
                    }

                    var gen_start = generate_value(start_);
                    var gen_end = generate_value(end_);
                    var gen_zone = generate_value(zone_format_utc);
                    var gen_source = generate_value(source_);
                    var gen_source_utc = generate_value(source_utc);

                    var gen_start_v1 = gen_start.postDate[0];
                    var gen_start_v2 = gen_start.postDate[1];

                    var gen_end_v1 = gen_end.postDate[0];
                    var gen_end_v2 = gen_end.postDate[1];

                    var gen_zone_v1 = gen_zone.postDate[0];
                    var gen_zone_v2 = gen_zone.postDate[1];

                    var gen_source_v1 = gen_source.postDate[0];
                    var gen_source_v2 = gen_source.postDate[1];

                    var gen_source_utc_v1 = gen_source_utc.postDate[0];
                    var gen_source_utc_v2 = gen_source_utc.postDate[1];

                    var int_start_h = parseInt(gen_start_v1);
                    var int_start_m = parseInt(gen_start_v2);

                    var int_end_h = parseInt(gen_end_v1);
                    var int_end_m = parseInt(gen_end_v2);

                    var int_zone_h = parseInt(gen_zone_v1);
                    var int_zone_m = parseInt(gen_zone_v2);

                    var int_source_h = parseInt(gen_source_v1);
                    var int_source_m = parseInt(gen_source_v2);

                    var int_source_utc_h = parseInt(gen_source_utc_v1);
                    var int_source_utc_m = parseInt(gen_source_utc_v2);

                    var value1_s_h = int_start_h - int_zone_h;
                    var value1_s_m = int_start_m - int_zone_m;

                    var value1_e_h = int_end_h - int_zone_h;
                    var value1_e_m = int_end_m - int_zone_m;

                    var value2_s_h = int_source_h - int_source_utc_h;
                    var value2_e_m = int_source_m - int_source_utc_m;

                    var source_time_utc = moment({h: value2_s_h, m: value2_e_m });
                    var start_time_utc = moment({h: value1_s_h, m: value1_s_m});
                    var end_time_utc = moment({h: value1_e_h, m: value1_e_m});

                    var t_after = source_time_utc.isAfter(start_time_utc);
                    var t_before = source_time_utc.isBefore(end_time_utc);

                    if(t_after&&t_before){
                        resolve(result.msg1);
                    }
                    else {
                        resolve(result.msg2);
                    }
                })
                .catch(reject);
        });
    }
};