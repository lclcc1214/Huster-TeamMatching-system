#pragma once
#include<iostream>
#include<vector>
#include<cstring>
#include "Technology.h"
using namespace std;
enum Gender  { ��=1,Ů=2,nogender=3};
enum Academy {
	��е��ѧ�빤��ѧԺ=1,
	��ѧ�������ϢѧԺ,
	���Ͽ�ѧ�빤��ѧԺ,
	��Դ�붯������ѧԺ,
	��ŷ������������ԴѧԺ,
	��������ӹ���ѧԺ,
	������Ϣ��ͨ��ѧԺ,
	�˹��������Զ���ѧԺ,
	�������ѧ�뼼��ѧԺ,
	�����뺣�󹤳�ѧԺ,
	��ľ��ˮ������ѧԺ,
	��������й滮ѧԺ,
	������ѧ�빤��ѧԺ,
	���պ���ѧԺ,
	����ռ䰲ȫѧԺ,
	���ѧԺ,
	������ѧ�뼼��ѧԺ,
	��ѧ��ͳ��ѧԺ,
	����ѧԺ,
	��ѧ�뻯��ѧԺ,
	�人�������о�����,
	�人����΢����ѧԺ,
	���̿�ѧѧԺ,
	δ������ѧԺ,
	���ɵ�·ѧԺ,
	ҽ��װ����ѧ�빤���о�Ժ,
	����ҽѧԺ,
	��������ѧԺ,
	ҩѧԺ,
	����ѧԺ,
	ҽҩ��������ѧԺ,
	��ҽѧϵ,
	��ֳ�����о���,
	��ǻҽѧԺ,
	��һ�ٴ�ѧԺ,
	�ڶ��ٴ�ѧԺ,
	�����ٴ�ѧԺ,
	��ѧѧԺ,
	����ѧԺ,
	���ѧԺ,
	��ѧԺ,
	���˼����ѧԺ,
	������ѧ�о�Ժ,
	��������ѧԺ,
	����ѧԺ,
	�����ѧԺ,
	��������Ϣ����ѧԺ,
	����ѧԺ,
	��������ѧԺ,
	����ѧԺ,
	����ѧԺ,
	noacademy
};


class Person {
	public:
		vector<Technology> technology_stack;//����ջ
		Academy academy;//ѧԺ 
		Gender gender;//�Ա� �� Ů ����
		Person() {}
		Person(vector<Technology> v, Academy academy, Gender gender) {
			this->technology_stack.assign(v.begin(), v.end());
			this->academy = academy;
			this->gender = gender;
		}
};