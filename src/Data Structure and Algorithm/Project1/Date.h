#pragma once
#include<iostream>
#include<vector>
#include<cstring>
using namespace std;
class Date {
public:
	int year;
	int month;
	int day;
	int hour;
	int minute;
	Date(int year, int month, int day, int hour, int minute) { this->year = year; this->month = month; this->day = day; this->hour = hour; this->minute = minute; }
	bool operator > (const Date& a) const {
		if (year != a.year) return year > a.year;
		if (month != a.month) return month > a.month;
		if (day != a.day) return day > a.day;
		if (hour != a.hour) return hour > a.hour;
		return minute > a.minute;
	}
};