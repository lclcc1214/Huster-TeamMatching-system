#pragma once
#include<cstdio>
struct node {
	int score, id;
	bool operator < (const node& a) const {
		return a.score<score;
	}
};