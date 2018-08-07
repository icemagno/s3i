package br.com.cmabreu.config;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class HeartBeatStartupAppListener implements ApplicationListener<ContextRefreshedEvent> {
	//private static ScheduledExecutorService scheduler;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//
	}

}
