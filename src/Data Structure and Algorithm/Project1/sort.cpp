#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
#include<cstdio>
#include<vector>
#include<algorithm>
#include<ctime>
#include "I_Person.h"
#include "Person.h"
#include "Team.h"
#include "Technology.h"
#include "node.h"
using namespace std;
static int rindex[10000];
static node index[10000];
vector<Team> sort_teams(I_Person i_person, vector<Team> teams) {
	vector<Team> r_teams;//排序后的队伍序列
	int sc[3][3] = { {2,3,4},
				 {1,4,6},
				 {1,3,9}
	};//第一维是需求能力等级，第二维是实际能力等级
	time_t now = time(0);
	tm* ltm = localtime(&now);
	Date now_time(1900 + ltm->tm_year, 1 + ltm->tm_mon, ltm->tm_mday, ltm->tm_hour, ltm->tm_min);
	int tot = 0;
	for (Team team : teams) {
		int max_score=0;//最大分数
		int score;//分数
		for (Person person : team.expect_team_member) {
			score = 0;
			for (Technology techonology1 : person.technology_stack)
			{
				for (Technology techonology2 : i_person.technology_stack)
				{
					if (techonology1.id == techonology2.id) {
						score += sc[techonology1.level][techonology2.level];
					}
				}
			}
			if (person.academy != noacademy&&person.academy!=i_person.academy) {
				score = score / 2;//学院不符 分数砍半
			}
			if (person.gender != nogender && person.gender!=i_person.gender) {
				score = score / 2;//性别不符 分数砍半
			}
			max_score = max(max_score,score);
		}
		if (now_time > team.deadline) score = -100 + max_score;
		if (now_time > team.race_time) score = -1e5;
		index[tot].id = team.id;
		index[tot].score = max_score;
		rindex[team.id] = tot;
		tot++;
	}
	sort(index+1,index+1+tot);
	for (int i = 0; i < tot; i++) {
		r_teams.push_back(teams[rindex[index[i].id]]);
	}
	return r_teams;
}
