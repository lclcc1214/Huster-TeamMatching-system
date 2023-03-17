#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
#include<cstdio>
#include<vector>
#include<algorithm>
#include<ctime>
#include "I_Person.h"
#include "Person.h"
#include "Team.h"
#include "node.h"
#include "Date.h"
#define N 10000
using namespace std;
string searchkey_ch[N],team_name_ch[N], race_name_ch[N];
static int rindex[10000];
static node index[10000];
vector<Team> search_teams(string searchkey, vector<Team> teams) {
	vector<Team> r_teams;//搜索后的队伍序列
	time_t now = time(0);
	tm *ltm = localtime(&now);
	Date now_time(1900 + ltm->tm_year, 1 + ltm->tm_mon, ltm->tm_mday, ltm->tm_hour,ltm->tm_min);//当前时间
	int len = searchkey.length(),tot1=0,tot2=0,tot3=0,tot=0;//tot是队伍序号
	for (int i = 0; i < len; i++) {
		if (searchkey[i] & 0x80) {
			tot1++;
			searchkey_ch[tot1] += searchkey[i];
			searchkey_ch[tot1] += searchkey[i + 1];
			i++;
		}
		else searchkey_ch[++tot1]=searchkey[i];
	}
	for (Team team:teams) {
		int len1 = team.race_name.length(),score=0;
		tot2 = 0; tot3 = 0;
		for (int i = 0; i < len1; i++) {
			if (searchkey[i] & 0x80) {
				tot2++;
				race_name_ch[tot2] += team.race_name[i];
				race_name_ch[tot2] += team.race_name[i + 1];
				i++;
			}
			else race_name_ch[++tot2] = team.race_name[i];
		}
		int len2 = team.team_name.length();
		for (int i = 0; i < len2; i++) {
			if (searchkey[i] & 0x80) {
				tot3++;
				team_name_ch[tot3] += team.team_name[i];
				team_name_ch[tot3] += team.team_name[i + 1];
				i++;
			}
			else team_name_ch[++tot3] = team.team_name[i];
		}
		
		for (int i = 0; i < len; i++) {
			int oscore,k;
			for (int j = 0; j < len1; j++)
			{
				k = i; oscore = 1;
				while (searchkey_ch[k] == race_name_ch[j]) {
					score += oscore;
					k++; j++;
					oscore *= 4;
				}
				if (oscore != 1) j--;
			}
			for (int j = 0; j < len2; j++)
			{
				k = i; oscore = 1;
				while (searchkey_ch[k] == team_name_ch[j]) {
					score += oscore;
					k++; j++;
					oscore *= 4;
				}
				if (oscore != 1) j--;
			}
		}
		if (now_time > team.race_time) score = score/4;
		index[tot].id = team.id;
		index[tot].score = score;
		rindex[team.id] = tot;
		tot++;
	}
	sort(index + 1, index + 1 + tot);
	for (int i = 0; i < tot; i++) {
		r_teams.push_back(teams[rindex[index[i].id]]);
	}
	return r_teams;
}
