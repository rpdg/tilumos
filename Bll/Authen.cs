/*
 * Created by SharpDevelop.
 * User: lv.pengfei
 * Date: 2017/9/20
 * Time: 12:30
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Web;
using System.Web.Security;

namespace admin.Bll
{
	/// <summary>
	/// Description of Login.
	/// </summary>
	public static class Authen
	{
		public static int SignIn(string name, string password)
		{
			if (FormsAuthentication.Authenticate(name, password)) {
				//if (Membership.ValidateUser(name, password)) {
				var ticket = new FormsAuthenticationTicket(name, true, 24 * 3600 * 1000);
				string encTicket = FormsAuthentication.Encrypt(ticket);
				var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
				cookie.Path = FormsAuthentication.FormsCookiePath;
				cookie.Domain = FormsAuthentication.CookieDomain;
			
				HttpContext.Current.Response.Cookies.Add(cookie);
				return 1;
			}
			
			//throw new UnauthorizedAccessException("用户名或密码不正确");
			return 0;
			
		}
	}
}
