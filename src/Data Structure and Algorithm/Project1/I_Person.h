#pragma once
#include<iostream>
#include<vector>
#include<cstring>
#include "Person.h"
using namespace std;
static string g[] = { "","��","Ů","��" };
static string l[] = { "","����","����","��ͨ" };
static string p[] = {
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
static string t[] = {"","JAVA","C/C++","Python","C#","GO","PHP","MATLAB",
"Oracle","Mysql","SQL","Server","Access","TiDB",
"HTML","CSS","JavaScript/TypeScript","React/Vue/Angular",
"Struts","Spring","Maven","Spring Cloud","Spring Boot","Tomcat",
"Git","SVN","CVS","HG",
"Windows","Linux","Unix","IOS","Android","����ѧϰ","�㷨","������"
};
class I_Person:public Person {
public:
	string Student_id;//ѧ��
	string name;//�ǳ�
	string qq;//qq��
	string phone;//�绰��
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
		cout << "����ջ:" << endl;
		for (Technology technology : this->technology_stack) {
			cout << tot << "." << t[technology.id] << " " << l[technology.level] << " " << endl;
			tot++;
		}
	
	}
};
