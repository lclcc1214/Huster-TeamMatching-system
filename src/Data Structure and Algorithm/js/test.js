const {sort_teams}=require("./sort.js");
const {search}=require("./search.js");
let reqs=[
    {
        team_id:1,
        req_id:1,
        tech_id:1,
        tech_level:0,
        ddl_time:"2022/11/25"
    },
    {
        team_id:1,
        req_id:1,
        tech_id:2,
        tech_level:1,
        ddl_time:"2022/11/25"
    },
    {
        team_id:1,
        req_id:2,
        tech_id:1,
        tech_level:0,
        ddl_time:"2022/11/25"
    },
    {
        team_id:2,
        req_id:3,
        tech_id:1,
        tech_level:0,
        ddl_time:"2022/11/25"
    },
    {
        team_id:3,
        req_id:4,
        tech_id:1,
        tech_level:0,
        ddl_time:"2022/11/01"
    },
    {
        team_id:3,
        req_id:5,
        tech_id:3,
        tech_level:2,
        ddl_time:"2022/11/01"
    }
];
let person=[
    {
        tech_id:1,
        tech_level:2
    },
    {
        tech_id:2,
        tech_level:1
    },
    {
        tech_id:3,
        tech_level:2
    },
    {
        tech_id:5,
        tech_level:1
    }
];
let teams=[
    {
        team_name:"啊对对队",
        team_id:1,
        ddl_time:"2022/11/25",
        comp_time:"2022/12/21",
        comp_name:"数模美赛"
    },
    {
        team_name:"无敌队",
        team_id:2,
        ddl_time:"2022/11/25",
        comp_time:"2022/12/21",
        comp_name:"互联网+"
    },
    {
        team_name:"数数数数队",
        team_id:3,
        ddl_time:"2022/11/25",
        comp_time:"2022/12/21",
        comp_name:"华为软件精英挑战赛"
    }
];
let list=sort_teams(reqs,person);
console.log(list);
list=search(teams,"数模");
console.log(list);
debugger
