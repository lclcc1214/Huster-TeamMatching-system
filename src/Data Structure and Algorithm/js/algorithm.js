function sort_teams(reqs,person) {
    let sc=[[2,3,4],[1,4,6],[1,3,9]];
    //let Date=new Date();
    let now=Date.now();
    let max_score=0;
    let score=0;
    let list=[];
    for(let i=0;i<reqs.length;i++){
        for(let j=0;j<person.length;j++){
            if(reqs[i].tech_id==person[j].tech_id)
            score+=sc[reqs[i].tech_level][person[j].tech_level];
        }
        if(i==(reqs.length-1)||reqs[i].req_id!=reqs[i+1].req_id)
        max_score = Math.max(max_score,score),score=0;
        if(i==(reqs.length-1)||reqs[i].team_id!=reqs[i+1].team_id)
        {
            if(now>Date.parse(reqs[i].ddl_time))
            max_score=Math.ceil(max_score/3);
            list.push({
                score:max_score,
                id:reqs[i].team_id
            });
            max_score=0;
        }
    }
    list.sort(function(a,b){return b.score-a.score});
    return list;
}


function search(teams,searchkey) {
    let list=[];
    let now=Date.now();
    console.log(now);
    let len=searchkey.length;
    for (let t=0;t<teams.length;t++) {
		let len1 = teams[t].comp_name.length,len2=teams[t].team_name.length,score=0,x1score=0,x2score=0;
		for (let i = 0; i < len; i++) {
			let oscore,k;
			for (let j = 0; j < len1; j++)
			{
				k = i; oscore = 1;
				while (k<len&&j<len1&&searchkey[k] == teams[t].comp_name[j]) {
					x1score += oscore;
					k++; j++;
					oscore *= 4;
				}
				if (oscore != 1) j--;
			}
			for (let j = 0; j < len2; j++)
			{
				k = i; oscore = 1;
				while (k<len&&j<len2&&searchkey[k] == teams[t].team_name[j]) {
					x2score += oscore;
					k++; j++;
					oscore *= 4;
				}
				if (oscore != 1) j--;
			}
		}
		score=Math.max(x1score,x2score);
        if (now >teams[t].ddl_time*1000) score = Math.ceil(score/4);
		if (now >teams[t].com_time_ddl*1000) score = Math.ceil(score/4);
		list.push({
            score:score,
            id:teams[t].team_id
        });
	}
    console.log(now);
    list.sort(function(a,b){return b.score-a.score});
    return list;
}

exports.sort_teams = sort_teams
exports.search_teams = search