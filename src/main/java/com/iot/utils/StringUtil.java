package com.iot.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.iot.model.ExamQuestion;
import com.iot.model.PaperInfo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiongxiaoyu on 2018/1/13.
 */
public class StringUtil {

	private Gson gson=new Gson();

	public String[] stringToArray(String s){
//		String[] b=s.substring(1,s.length()-1).replace(" ","").split(",");
		String[] b=s.replace("[","").replace("]","").replace(" ","").split(",");
		return b;
	}

	public int totalNumber(String a,List<String> hh){
		int count=0;
		//这里使用后者是因为.toArray()方法返回的是Object，不能转化成String
		Object [] o=hh.toArray();
		String[] gg=new String[hh.size()];
		for (int i = 0; i < hh.size(); i++) {
			gg[i]=gson.toJson(o[i]);
			gg[i]=gg[i].replace("[","").replace("]","").replace(" ","").replace("\"","") ;
			String [] aa=gg[i].split(",");
			for (int j = 0; j <(aa.length/2) ; j++) {
				if(a.equals(aa[j])){
					count++;
				}
			}
		}
		return count;
	}

	public int rightNumber(String a,List<String> hh){
		int count=0;
		Object [] o=hh.toArray();
		String[] gg=new String[hh.size()];
		for (int i = 0; i < hh.size(); i++) {
			gg[i]=gson.toJson(o[i]);
			gg[i]=gg[i].replace("[","").replace("]","").replace(" ","").replace("\"","") ;
			String [] aa=gg[i].split(",");
			for (int j = 0; j <(aa.length/2) ; j++) {
				if(a.equals(aa[j])&&(Integer.parseInt(aa[j+(aa.length/2)])==1)){
					count++;
				}
			}
		}
		return count;
	}

	public PaperInfo basicCut(String examData,List<ExamQuestion> list){
		JSONObject jsonData= JSON.parseObject(examData);
		PaperInfo paperInfo =
				gson.fromJson(jsonData.get("basic").toString(),PaperInfo.class);
		paperInfo.setExamQuestion(list);
		return paperInfo;
	}

	public List<ExamQuestion> examCut(String examData){
		List<ExamQuestion> list=new ArrayList<>();
		JSONArray ja=JSON.parseArray(JSON.parseObject(examData).get("exam").toString());
		System.out.println(ja.size());
		for (int i = 0; i < ja.size(); i++) {
			System.out.println(ja.get(i));
			ExamQuestion examQuestion=
					gson.fromJson(String.valueOf(ja.get(i)),ExamQuestion.class);
			examQuestion.setDate(new Date(System.currentTimeMillis()));
			list.add(examQuestion);
		}
		return list;
	}

	public String adjustFormat(PaperInfo paperInfo){
		String aa="",bb;
		for (int j = 0; j < paperInfo.getExamQuestion().size(); j++) {
			bb=paperInfo.getExamQuestion().get(j).toString();
			aa+=bb;
			if (j!=paperInfo.getExamQuestion().size()-1)
			{
				aa+=",";
			}
		}
		return aa;
	}

}
