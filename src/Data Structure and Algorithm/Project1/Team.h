#pragma once
#include<iostream>
#include<vector>
#include "Date.h"
#include "Person.h"
using namespace std;
class Team {
public:
	int id;//队伍序号 
	vector<I_Person> team_member;//队员
	I_Person team_leader;//队长
	vector<Person> expect_team_member;//需要人员的一些要求 这里面Person 只包含性别（可不填） 技术栈 （可不填）学院（可不填）
	int cur_number, max_number;//当前人数（包括队长），最大人数（包括队长）
	string team_name;//队伍名字
	string race_name;//比赛名字
	string request;//要求 一个字符串
	Date deadline;//加入截止日期 
	Date race_time;//比赛日期
	Date public_time;// 发布时间

};
