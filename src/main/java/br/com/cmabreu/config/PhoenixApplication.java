package br.com.cmabreu.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"br.com.cmabreu.repository"})
@EntityScan( basePackages = {"br.com.cmabreu.model"} )
public class PhoenixApplication /*extends SpringBootServletInitializer*/  {

	public static void main(String[] args) {
		SpringApplication.run(PhoenixApplication.class, args);
	}
}
