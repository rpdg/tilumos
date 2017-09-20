/*
 * Created by SharpDevelop.
 * User: lv.pengfei
 * Date: 2017/9/18
 * Time: 16:11
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections;
using System.ComponentModel;

using System.Data;
using System.Data.Common;
using System.Collections.Generic;

using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

using System.Data.SQLite;
using Lyu;
using Lyu.Data;
using Lyu.Data.Helper;
using Lyu.Data.Types;
using Lyu.Data.Client;
using Lyu.Json;
using Lyu.Text;

using admin.Bll;

namespace admin
{
	/// <summary>
	/// Description of MainForm.
	/// </summary>
	public class Default : Page
	{
		#region Page Load
		private void Page_Load(object sender, EventArgs e)
		{
		
			
			//ClickNote cn = GetDeatilById(1);
			//Response.Write(cn.btnName);
			

			var cn2 = new ClickNote {
				btnName = "sd",
			};
			
			
			//Insert(cn2);
			//Response.Write(cn2.id);
			
			
			//Response.Write(Delete("sd"));
			
			
			var p = ClickNoteBll.GetPage(1 , 10);
			
			Response.WriteJson(p);
			
			

		}
		#endregion
		
		
		
		
		DataPage GetPage(int pageIndex = 0, int pageSize = 10)
		{
			ClickNoteDal dal = new ClickNoteDal();
			var wheres = new Dictionary<string, object>() {
				
			};
			var which = new QueryObj {
				//Select = "exhibition_id,exhibition_name,type,time,address,limits,post_time,registration_count,attendance_count,bonus",
				SortOn = "id",
				SortType = "DESC"
			};
			return dal.Get(wheres, which, pageSize, pageIndex);
		}
		
		
		
		bool DeleteById(long id)
		{
			ClickNoteDal dal = new ClickNoteDal();
			return dal.DelByKey(id) > 0;
		}
		
		
		
		int Delete(string keywords)
		{
			ClickNoteDal dal = new ClickNoteDal();
			var wheres = new Dictionary<string, object>() {
				{ "btnName" , keywords },
			};
			return dal.Del(wheres);
		}
		
		
		void Insert(ClickNote exh)
		{
			ClickNoteDal dal = new ClickNoteDal();
			//dal.Insert(exh.btnName);

			exh.id = dal.Add<ClickNote>(exh);
		}
		
		
		public  ClickNote GetDeatilById(long id)
		{
			var wheres = new Dictionary<string, object>() {
				{ "id" , id },
			};
			var which = new QueryObj();

			ClickNoteDal dal = new ClickNoteDal();
			return dal.GetOne<ClickNote>(wheres, which);
		}
		
		
	}
	
	
	
	
	
	public class ClickNoteDal: DAL
	{
		
		public ClickNoteDal()
		{
			mainTable = DataBase.Tables["t_clicks"];
			//needLog = true;
		}
		
		public void Insert(string name)
		{
			var dac = new SQLiteClient(DataBase.ConnectionString);
			
			DbParameter[] pms = {
				dac.CreateParameter("$btnName", name, DbType.String),
			};
			
			dac.ExecuteScalar(@"INSERT INTO t_clicks (btnName) VALUES ($btnName);", pms);
		}
		
	}
	
	public class ClickNote
	{
		public long? id { set; get; }
		public string btnName { set; get; }
	}
}