package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class LoginController extends BasicController {

	@Value("${terena.midas.location}")
	private String midasLocation;
	

	@RequestMapping(value = {"/", "/index"}) 
	public String home( Model model, HttpSession session ) {
		model.addAttribute( "midasLocation", midasLocation );
		model.addAttribute( "user", getLoggedUser(session) );
		return "index";
	}
	
	@RequestMapping(value ="/loginPage")
	public String loginPage(Model model, @RequestParam(value = "error", required = false) String error) {
		model.addAttribute( "midasLocation", midasLocation );
		return "loginPage";
	}	


}
