﻿/*
 * Created by SharpDevelop.
 * User: lv.pengfei
 * Date: 2017/9/19
 * Time: 17:11
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;

using System.Data;
using System.Data.Common;
using System.Collections.Generic;


using Lyu.Text;
using Lyu.Data;
using Lyu.Data.Helper;
using Lyu.Data.Types;
using Lyu.Data.Client;

namespace admin.Bll
{
	/// <summary>
	/// Description of ClickNoteBll.
	/// </summary>
	public static class ClickNoteBll
	{
		static readonly ClickNoteDal dal = new ClickNoteDal();
		static readonly ClickCountDal countDal = new ClickCountDal();
		
		
		/*
 			* http://127.0.0.1:8011/api/admin/Bll.ClickNoteBll/GetCounts
		*/
		public static DataPage GetCounts(int pageIndex = 0, int pageSize = 10)
		{
			var wheres = new Dictionary<string, object>();
			var which = new QueryObj {
				SortOn = "btnName",
			};
			
			
			return countDal.Get(wheres, which, pageSize, pageIndex);
		}
		
		
		/*
 			* http://127.0.0.1:8011/api/admin/Bll.ClickNoteBll/GetClicksByButtonName?btnName=xxxx
		*/
		public static DataPage GetClicksByButtonName(string btnName = "", int pageIndex = 0, int pageSize = 10)
		{

			var wheres = new Dictionary<string, object>();
			
			if (!string.IsNullOrEmpty(btnName)) {
				wheres.Add("btnName", btnName);
			}
			
			
			var which = new QueryObj {
				//Select = "id,btnName,id,time,browser",
				SortOn = "id",
				SortType = "DESC"
			};
			
			
			return dal.Get(wheres, which, pageSize, pageIndex);
		}
		
		
		
		
		/*
		 	http://127.0.0.1:8011/api/admin/Bll.ClickNoteBll/AddClickNotice?btnName=xxxxx
		 */
		public static long AddClickNotice(string btnName)
		{
						
			var nt = new ClickNote {
				btnName = btnName,
				ip = GetUserIP(),
				time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
				browser = GetUserBrowser(),
			};
			
			
			var id = dal.Add<ClickNote>(nt);
			
			return id;
		}
		
		
		
		
		private static string GetUserIP()
		{
			System.Web.HttpContext context = System.Web.HttpContext.Current; 
			string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

			if (!string.IsNullOrEmpty(ipList)) {
				return ipList.Split(',')[0];
			}

			return context.Request.ServerVariables["REMOTE_ADDR"];
		}
		
		
		private static string GetUserBrowser()
		{
			System.Web.HttpContext context = System.Web.HttpContext.Current; 
			System.Web.HttpBrowserCapabilities browser = context.Request.Browser;
			StringBuffer s = //"Type = " + browser.Type + "; " +
				"Name = " + browser.Browser + "; "
				+ "Version = " + browser.Version + "; ";
			
//			            + "Major Version = " + browser.MajorVersion + "\n"
//			            + "Minor Version = " + browser.MinorVersion + "\n"
//			            + "Platform = " + browser.Platform + "\n"
//			            + "Is Beta = " + browser.Beta + "\n"
//			            + "Is Crawler = " + browser.Crawler + "\n"
//			            + "Is AOL = " + browser.AOL + "\n"
//			            + "Is Win16 = " + browser.Win16 + "\n"
//			            + "Is Win32 = " + browser.Win32 + "\n"
//			            + "Supports Frames = " + browser.Frames + "\n"
//			            + "Supports Tables = " + browser.Tables + "\n"
//			            + "Supports Cookies = " + browser.Cookies + "\n"
//			            + "Supports VBScript = " + browser.VBScript + "\n"
//			            + "Supports JavaScript = " +
//			            browser.EcmaScriptVersion.ToString() + "\n"
//			            + "Supports Java Applets = " + browser.JavaApplets + "\n"
//			            + "Supports ActiveX Controls = " + browser.ActiveXControls
//			            + "\n"
//			            + "Supports JavaScript Version = " +
//			            browser["JavaScriptVersion"] + "\n";

			return s;
		}
	}
	
	
	public class ClickNoteDal: DAL
	{
		
		public ClickNoteDal()
		{
			mainTable = DataBase.Tables["t_clicks"];
			//needLog = true;
		}
		
		
		/*
		public static DataTable GetClickNotesByCondition()
		{
			var client = new SQLiteClient(DataBase.ConnectionString);
			client.GetDataSet();
		}
		*/
		
	}
	
	
	public struct ClickNote
	{
		public long? id { set; get; }
		public string btnName { set; get; }
		public string ip { set; get; }
		public string time { set; get; }
		public string browser { set; get; }
	}
	
	
	
	
	public class ClickCountDal: DAL
	{
		
		public ClickCountDal()
		{
			mainTable = DataBase.Tables["v_clicksCount"];
		}
	}
	
	public struct ClickCount
	{
		public int clicks { get; set; }
		public string btnName { get; set; }
	}
}
