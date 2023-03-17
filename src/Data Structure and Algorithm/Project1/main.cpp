#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<ctime>
#include<string>
#include "I_Person.h"
#include "Technology.h"
using namespace std;
vector<Technology> x;
const int sum_technology = 35;
const int sum_academy=51;
bool v[100];
I_Person per[1000];
static string ts[] = { "","JAVA","C/C++","Python","C#","GO","PHP","MATLAB",
"Oracle","Mysql","SQL","Server","Access","TiDB",
"HTML","CSS","JavaScript/TypeScript","React/Vue/Angular",
"Struts","Spring","Maven","Spring Cloud","Spring Boot","Tomcat",
"Git","SVN","CVS","HG",
"Windows","Linux","Unix","IOS","Android","机器学习","算法","大数据"
};
static string gs[] = { "","男","女","无" };
static string ls[] = { "","入门","掌握","精通" };
static string ps[] = {
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
string race[] = { "团队程序设计天梯赛","数模美赛","华为软件精英挑战赛","“中国软件杯”大学生软件设计大赛","“互联网+”大学生创新创业大赛","“挑战杯”中国大学生创业计划大赛","“西门子杯”中国智能制造挑战赛","百度之星·程序设计大赛","阿里天池大数据竞赛","微软“创新杯”","“西门子杯”中国智能制造挑战赛" };
int main() {
	srand(time(0));
	freopen("C:/Users/fwkzj/Desktop/person.txt","w",stdout);
	//I_Person person(x,药学院,男,"U202012345","张三","23456789","17812344321");
	int n;
	cin >> n;
	for (int i = 1; i <= n; i++) {
		memset(v, 0, sizeof(v));
		x.clear();
		int tot = rand() % 6;
		if (tot == 0) tot = rand() % 8;
		while (tot--) {
			Technology technology;
			technology.id = rand()%35+1;
			while(v[technology.id]) technology.id = rand() % 35 + 1;
			v[technology.id] = 1;
			technology.level = Level(rand() % 3 + 1);
			x.push_back(technology);
		}
		string nian =to_string(rand()%4 + 2019);
		string hao = to_string(rand()%7000+1000);
		string  k[] = {"3","5","7","8"};
		string  kk[] = {"1","2"};
		I_Person person(x,Academy(rand()%51+1), Gender(rand()%2+1), "U" + nian + "1" + hao, "张三", kk[rand()%2]+ to_string(((rand() << 15) + rand()) % 400000000 + 432156789), "1" + k[rand() % 4] + to_string(((rand() << 15) + rand()) % 800000000 + 123456789));
		per[i] = person;
		person.print();
	}
	cout << endl << endl << endl << endl;
	int m;
	cin >> m;
	for (int i = 1; i <= m; i++) {
		memset(v, 0, sizeof(v));
		int sump = rand() % 3 + 3;
		int sumn = rand() % sump + 1;
		cout << i << ":" << endl;
		cout << "啊对对队" << " "; printf("%d/%d\n", sumn,sump);
		cout << race[rand()%11]<<endl;
		int rd = rand() % n + 1;
		v[rd] = 1;
		cout << "队长:" << per[rd].Student_id<< ' '<<per[rd].name<<' '<<ps[per[rd].academy]<<endl;
		for (int j = 1; j <= sumn - 1; j++)
		{
			while (v[rd])
				rd = rand() % n + 1;
			v[rd] = 1;
			cout << "队员" << j << ":" << per[rd].Student_id << ' ' << per[rd].name << ' ' << ps[per[rd].academy] << endl;
		}
		for (int j = 1; j <= sump - sumn; j++) {
			cout << "需求" << j << ":";
			x.clear();
			int tot = rand() % 5;
			if (tot == 0) tot = rand() % 3+1;
			while (tot--) {
				Technology technology;
				technology.id = rand() % 35 + 1;
				while (v[technology.id]) technology.id = rand() % 35 + 1;
				v[technology.id] = 1;
				technology.level = Level(rand() % 3 + 1);
				x.push_back(technology);
			}
			tot = 1;
			for (Technology technology :x) {
				cout << tot << "." << ts[technology.id] << " " << ls[technology.level] << "   ";
				tot++;
			}
			cout << endl;
		}
	}
}
