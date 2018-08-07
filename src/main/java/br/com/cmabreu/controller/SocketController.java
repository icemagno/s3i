package br.com.cmabreu.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {


    @MessageMapping("/notify.fireman")
    @SendTo("/queue/fireman")
    public String notifyFireman(@Payload String payload ) {
        return payload;
    }
    
    @MessageMapping("/notify.admin")
    @SendTo("/queue/admin")
    public String notifyAdmin(@Payload String payload ) {
        return payload;
    }

    @MessageMapping("/notify.citizen")
    @SendTo("/queue/citizen")
    public String notifyCitizen(@Payload String payload ) {
        return payload;
    }
    
    
}
