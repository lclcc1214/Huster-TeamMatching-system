#pragma once
#include<iostream>
#include<vector>
#include<cstring>
#include "Person.h"
using namespace std;
static string g[] = { "","男","女","无" };
static string l[] = { "","入门","掌握","精通" };
static string p[] = {
	"",
	"机械科学与工程学院",
	"光学与电子信息学院",
	"材料科学与工程学院",
	"能源与动力工程学院",
	"中欧清洁与可再生能源学院",
	"电气与电子工程学院",
	"电子信息与通信学院",
	"人工智能与自动化学院",
	"计算机科学与技术学院",
	"船舶与海洋工程学院",
	"土木与水利工程学院",
	"建筑与城市规划学院",
	"环境科学与工程学院",
	"航空航天学院",
	"网络空间安全学院",
	"软件学院",
	"生命科学与技术学院",
	"数学与统计学院",
	"物理学院",
	"化学与化工学院",
	"武汉光电国家研究中心",
	"武汉国际微电子学院",
	"工程科学学院",
	"未来技术学院",
	"集成电路学院",
	"医疗装备科学与工程研究院",
	"基础医学院",
	"公共卫生学院",
	"药学院",
	"护理学院",
	"医药卫生管理学院",
	"法医学系",
	"生殖健康研究所",
	"口腔医学院",
	"第一临床学院",
	"第二临床学院",
	"第三临床学院",
	"哲学学院",
	"经济学院",
	"社会学院",
	"法学院",
	"马克思主义学院",
	"教育科学研究院",
	"继续教育学院",
	"人文学院",
	"外国语学院",
	"新闻与信息传播学院",
	"管理学院",
	"公共管理学院",
	"体育学院",
	"艺术学院" };
static string t[] = {"","JAVA","C/C++","Python","C#","GO","PHP","MATLAB",
"Oracle","Mysql","SQL","Server","Access","TiDB",
"HTML","CSS","JavaScript/TypeScript","React/Vue/Angular",
"Struts","Spring","Maven","Spring Cloud","Spring Boot","Tomcat",
"Git","SVN","CVS","HG",
"Windows","Linux","Unix","IOS","Android","机器学习","算法","大数据"
};
class I_Person:public Person {
public:
	string Student_id;//学号
	string name;//昵称
	string qq;//qq号
	string phone;//电话号
	I_Person() {}
	I_Person(vector<Technology> v, Academy academy, Gender gender, string Student_id, string name, string qq, string phone ):Person(v,academy,gender) {
		this->Student_id = Student_id;
		this->name = name;
		this->qq = qq;
		this->phone = phone;
	}
	void print() {
		int tot = 1;
		cout << name << " ";
		cout << p[academy]<<" ";
		cout << g[gender]<<" ";
		cout << Student_id << " ";

		cout << qq<<" ";
		cout << phone <<endl;
		cout << "技术栈:" << endl;
		for (Technology technology : this->technology_stack) {
			cout << tot << "." << t[technology.id] << " " << l[technology.level] << " " << endl;
			tot++;
		}
	
	}
};
