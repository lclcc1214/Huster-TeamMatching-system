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
"Windows","Linux","Unix","IOS","Android","����ѧϰ","�㷨","������"
};
static string gs[] = { "","��","Ů","��" };
static string ls[] = { "","����","����","��ͨ" };
static string ps[] = {
	"",
	"��е��ѧ�빤��ѧԺ",
	"��ѧ�������ϢѧԺ",
	"���Ͽ�ѧ�빤��ѧԺ",
	"��Դ�붯������ѧԺ",
	"��ŷ������������ԴѧԺ",
	"��������ӹ���ѧԺ",
	"������Ϣ��ͨ��ѧԺ",
	"�˹��������Զ���ѧԺ",
	"�������ѧ�뼼��ѧԺ",
	"�����뺣�󹤳�ѧԺ",
	"��ľ��ˮ������ѧԺ",
	"��������й滮ѧԺ",
	"������ѧ�빤��ѧԺ",
	"���պ���ѧԺ",
	"����ռ䰲ȫѧԺ",
	"���ѧԺ",
	"������ѧ�뼼��ѧԺ",
	"��ѧ��ͳ��ѧԺ",
	"����ѧԺ",
	"��ѧ�뻯��ѧԺ",
	"�人�������о�����",
	"�人����΢����ѧԺ",
	"���̿�ѧѧԺ",
	"δ������ѧԺ",
	"���ɵ�·ѧԺ",
	"ҽ��װ����ѧ�빤���о�Ժ",
	"����ҽѧԺ",
	"��������ѧԺ",
	"ҩѧԺ",
	"����ѧԺ",
	"ҽҩ��������ѧԺ",
	"��ҽѧϵ",
	"��ֳ�����о���",
	"��ǻҽѧԺ",
	"��һ�ٴ�ѧԺ",
	"�ڶ��ٴ�ѧԺ",
	"�����ٴ�ѧԺ",
	"��ѧѧԺ",
	"����ѧԺ",
	"���ѧԺ",
	"��ѧԺ",
	"���˼����ѧԺ",
	"������ѧ�о�Ժ",
	"��������ѧԺ",
	"����ѧԺ",
	"�����ѧԺ",
	"��������Ϣ����ѧԺ",
	"����ѧԺ",
	"��������ѧԺ",
	"����ѧԺ",
	"����ѧԺ" };
string race[] = { "�Ŷӳ������������","��ģ����","��Ϊ�����Ӣ��ս��","���й����������ѧ�������ƴ���","��������+����ѧ�����´�ҵ����","����ս�����й���ѧ����ҵ�ƻ�����","�������ӱ����й�����������ս��","�ٶ�֮�ǡ�������ƴ���","������ش����ݾ���","΢�����±���","�������ӱ����й�����������ս��" };
int main() {
	srand(time(0));
	freopen("C:/Users/fwkzj/Desktop/person.txt","w",stdout);
	//I_Person person(x,ҩѧԺ,��,"U202012345","����","23456789","17812344321");
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
		I_Person person(x,Academy(rand()%51+1), Gender(rand()%2+1), "U" + nian + "1" + hao, "����", kk[rand()%2]+ to_string(((rand() << 15) + rand()) % 400000000 + 432156789), "1" + k[rand() % 4] + to_string(((rand() << 15) + rand()) % 800000000 + 123456789));
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
		cout << "���ԶԶ�" << " "; printf("%d/%d\n", sumn,sump);
		cout << race[rand()%11]<<endl;
		int rd = rand() % n + 1;
		v[rd] = 1;
		cout << "�ӳ�:" << per[rd].Student_id<< ' '<<per[rd].name<<' '<<ps[per[rd].academy]<<endl;
		for (int j = 1; j <= sumn - 1; j++)
		{
			while (v[rd])
				rd = rand() % n + 1;
			v[rd] = 1;
			cout << "��Ա" << j << ":" << per[rd].Student_id << ' ' << per[rd].name << ' ' << ps[per[rd].academy] << endl;
		}
		for (int j = 1; j <= sump - sumn; j++) {
			cout << "����" << j << ":";
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
