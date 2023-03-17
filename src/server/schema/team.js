//验证规则的包
const joi = require('joi')

//验证队伍信息是否正确
const username = joi.string().pattern(/[A-Za-z][0-9]{9}/).max(10).required()
const team_name = joi.string().pattern(/^[\S]{1,9}[队]{1}/).required()
const team_req = joi.string().min(0).max(200).required()
const team_leader_id = joi.number().min(0).required()
const ddl_time = joi.date().required()
const comp_id = joi.number().min(0).required()
const req_id = joi.number().min(0).required()
const comp_name = joi.string().required()

const team_id = joi.number().min(0).required()
const team_mate_id = joi.number().min(0).required()

const tech_id = joi.number().min(0).max(37).required()
const tech_level = joi.number().min(0).max(2).required()

//队伍信息
exports.teams_info_schema = {
    body:{
        team_name,
        team_req,
        ddl_time,
        comp_name
    }
}

exports.team_mate_schema = {
    body:{
        team_id,
        team_mate_id
    }
}

exports.team_request_tech_schema = {
    body:{
        team_id,
        tech_id,
        tech_level
    }
}

exports.team_delrequest_schema = {
    body:{
        team_id,
        req_id
    }
}

exports.team_delrequestTech_schema = {
    body:{
        team_id,
        tech_id
    }
}

exports.team_deleTeams_schema = {
    body:{
        team_id
    }
}

exports.team_dropOut_scheme = {
    body:{
        team_id
    }
}

exports.team_request_schema = {
    body:{
        team_id
    }
}

exports.team_update_ddlTime = {
    body:{
        team_id,
        ddl_time
    }
}