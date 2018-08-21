package br.com.cmabreu.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {


    @MessageMapping("/phoenix/notify.fireman")
    @SendTo("/phoenix/queue/fireman")
    public String notifyFireman(@Payload String payload ) {
    	System.out.println("FIREMAN Online");
        return payload;
    }
    
    @MessageMapping("/phoenix/notify.admin")
    @SendTo("/phoenix/queue/admin")
    public String notifyAdmin(@Payload String payload ) {
    	System.out.println("ADMIN Online");
        return payload;
    }

    @MessageMapping("/phoenix/notify.citizen")
    @SendTo("/phoenix/queue/citizen")
    public String notifyCitizen(@Payload String payload ) {
    	System.out.println("CITIZEN Online");
        return payload;
    }
    
    
}
