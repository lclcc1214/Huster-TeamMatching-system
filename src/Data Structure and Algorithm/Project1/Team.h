#pragma once
#include<iostream>
#include<vector>
#include "Date.h"
#include "Person.h"
using namespace std;
class Team {
public:
	int id;//������� 
	vector<I_Person> team_member;//��Ա
	I_Person team_leader;//�ӳ�
	vector<Person> expect_team_member;//��Ҫ��Ա��һЩҪ�� ������Person ֻ�����Ա𣨿ɲ�� ����ջ ���ɲ��ѧԺ���ɲ��
	int cur_number, max_number;//��ǰ�����������ӳ�������������������ӳ���
	string team_name;//��������
	string race_name;//��������
	string request;//Ҫ�� һ���ַ���
	Date deadline;//�����ֹ���� 
	Date race_time;//��������
	Date public_time;// ����ʱ��

};
