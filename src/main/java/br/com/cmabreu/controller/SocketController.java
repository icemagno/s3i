package br.com.cmabreu.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import br.com.cmabreu.document.Document;
import br.com.cmabreu.document.Module;

@Controller
public class SocketController {

    @MessageMapping("/document.update")
    @SendTo("/queue/notify")
    public Document sendMessage(@Payload Module payload ) {
        return null;
    }


    @MessageMapping("/notify.fireman")
    @SendTo("/queue/fireman")
    public String notifyFireman(@Payload String payload ) {
    	// Propaga os dados do novo elemento que acessou o sistema
        return payload;
    }
    
    @MessageMapping("/notify.admin")
    @SendTo("/queue/admin")
    public String notifyAdmin(@Payload String payload ) {
        return payload;
    }
	
}
