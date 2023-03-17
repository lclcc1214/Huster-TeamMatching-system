const express = require('express')

const router = express.Router()

//导入路由处理函数模块
const teamInfo_handler = require('../router_handler/team')

//验证数据的中间件
const expressJoi = require('@escook/express-joi')

//验证规则对象
const {teams_info_schema,team_mate_schema,team_request_schema,team_request_tech_schema,team_delrequest_schema,team_deleTeams_schema,team_dropOut_scheme, team_delrequestTech_schema,team_update_ddlTime} = require('../schema/team')
const { expression } = require('joi')


router.get('/home/teamid',teamInfo_handler.getHomeTeamId)

router.get('/home/search',teamInfo_handler.getSearchId)

router.get('/myteam/teaminfo/id',teamInfo_handler.getTeamId)

router.get('/myteam/teaminfo',teamInfo_handler.getTeamInfo)

router.get('/myteam/teaminfo/detail',teamInfo_handler.getTeamInfoDetail)

router.get('/myteam/teaminfo/userid',teamInfo_handler.getUserId)

router.get('/myteam/teaminfo/mate',teamInfo_handler.getTeamMateId)

router.get('/myteam/teaminfo/mateinfo',teamInfo_handler.getTeamMateInfo)

router.get('/myteam/teaminfo/requestid',teamInfo_handler.getRequestId)

router.get('/myteam/teaminfo/requestinfo',teamInfo_handler.getRequestInfo)

router.get('/myteam/teaminfo/id',teamInfo_handler.getTechId)

router.post('/create/teams',expressJoi(teams_info_schema),teamInfo_handler.createTeam_teams)

router.post('/create/mate',expressJoi(team_mate_schema),teamInfo_handler.createTeam_mates)

router.post('/update/ddlTime',expressJoi(team_update_ddlTime),teamInfo_handler.updateTeam_ddlTime)

router.post('/create/request',expressJoi(team_request_schema),teamInfo_handler.createTeam_request)

router.post('/create/request/tech',expressJoi(team_request_tech_schema),teamInfo_handler.createTeamTech_request)

router.post('/delete/mate',expressJoi(team_mate_schema),teamInfo_handler.deleteTeam_mates)

router.post('/delete/request',expressJoi(team_delrequest_schema),teamInfo_handler.deleteTeam_request)

router.post('/delete/request/tech',expressJoi(team_delrequestTech_schema),teamInfo_handler.deleteTeamTech_request)

router.post('/delete/teams',expressJoi(team_deleTeams_schema),teamInfo_handler.deleteTeams)

router.post('/drop/teams',expressJoi(team_dropOut_scheme),teamInfo_handler.dropOut_team)


module.exports = router