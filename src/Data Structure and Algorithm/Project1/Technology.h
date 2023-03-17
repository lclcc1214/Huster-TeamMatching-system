#pragma once
#include<iostream>
#include<vector>
#include<cstring>
using namespace std;
enum Level { 入门=1 ,掌握=2 , 精通=3};

class Technology {
public:
	string name;//技术名称
	Level level;//技术等级 初 中 高
	int id;//技术栈序号
};