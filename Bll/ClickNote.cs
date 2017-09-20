/*
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


using Lyu;
using Lyu.Data;
using Lyu.Data.Helper;
using Lyu.Data.Types;
using Lyu.Data.Client;

namespace admin.Bll
{
	/// <summary>
	/// Description of Clicks.
	/// </summary>
	public static class ClickNoteBll
	{
		static readonly ClickNoteDal dal = new ClickNoteDal();
		
		
		/*
 			* http://127.0.0.1:8011/api/admin/Bll.ClickNoteBll/GetPage
		*/
		public static DataPage GetPage( int pageIndex = 0 , int pageSize = 10)
		{

			var wheres = new Dictionary<string, object>() {
				
			};
			var which = new QueryObj
            {
                //Select = "exhibition_id,exhibition_name,type,time,address,limits,post_time,registration_count,attendance_count,bonus",
                SortOn = "id",
                SortType = "DESC"
            };
			return dal.Get(wheres, which, pageSize, pageIndex);
		}
	}
	
	
	public class ClickNoteDal: DAL
	{
		
		public ClickNoteDal()
		{
			mainTable = DataBase.Tables["t_clicks"];
			//needLog = true;
		}
		
		
	}
	
	
	public class ClickNote
	{
		public long? id { set; get; }
		public string btnName { set; get; }
	}
}
