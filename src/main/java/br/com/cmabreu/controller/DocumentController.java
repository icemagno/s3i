package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.cmabreu.document.Document;
import br.com.cmabreu.document.Module;
import br.com.cmabreu.model.User;
import br.com.cmabreu.service.DocumentService;

@Controller
public class DocumentController extends BasicController {

	@Autowired
	private DocumentService documentService;	
	
    @MessageMapping("/document.update")
    @SendTo("/queue/notify")
    public Document sendMessage(@Payload Module payload ) {

    	Module module = documentService.getModule( payload.getUserName() );
    	
    	if( module != null ) {
    		module.setContent( payload.getContent() );
    	}
    	
        return documentService.getDocument();
    }

    
	@RequestMapping(value ="/module", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	public @ResponseBody Module getMyModule( Model model, HttpSession session ) {
		
		User user = getLoggedUser(session);
		Module module = null;
		
		if( !documentService.hasModule( user.getName() ) ) {
			module = new Module( "X. Conteúdo X", "", user.getName() );
			documentService.addModule( module );
		} else {
			module = documentService.getModule( user.getName() );
		}
		
		return module;
	}    
	
}
