package br.com.cmabreu.config;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import br.com.cmabreu.misc.MainHeartBeat;
import br.com.cmabreu.service.DocumentService;
import br.com.cmabreu.service.NotificationService;

@Component
public class HeartBeatStartupAppListener implements ApplicationListener<ContextRefreshedEvent> {
	private static ScheduledExecutorService scheduler;
	
	
	@Autowired
	private NotificationService notificationService;

	@Autowired
	private DocumentService documentService;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		
		documentService.fakeInit();
		
		if ( scheduler == null ) {
			scheduler = Executors.newSingleThreadScheduledExecutor();
			MainHeartBeat as = new MainHeartBeat( notificationService, documentService );
	        scheduler.scheduleAtFixedRate(as, 5, 10 , TimeUnit.SECONDS);		
		}		
	}

}
