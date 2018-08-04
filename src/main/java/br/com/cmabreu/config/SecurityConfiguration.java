package br.com.cmabreu.config;

import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder( 8 );
    }

    
    /*
    @Bean
    public ServletWebServerFactory servletContainer() {
    	TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(redirectConnector());
        return tomcat;
    }

    private Connector redirectConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(8080);
        connector.setSecure(false);
        connector.setRedirectPort(8443);
        return connector;
    }
    */  
    
    
	@Autowired
	private DataSource dataSource;	
	
	@Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
		auth
        .jdbcAuthentication()
        .dataSource( dataSource )
        .passwordEncoder( passwordEncoder() )
		.usersByUsernameQuery(
    			"select user_name as username,password,enabled from users where user_name = ?")
    		.authoritiesByUsernameQuery(
    			"select user_name as username, role from users_roles ur join users u on ur.user_id = u.user_id and u.user_name = ?");		
    }	
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/resources/**");
	}		
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
	        .authorizeRequests()
	    	.antMatchers("/login").permitAll()
	    	.antMatchers("/loginPage").permitAll()
	    	.antMatchers("/resources/**").permitAll()
	    	.anyRequest().authenticated()
    	.and() 
		    .formLogin()
				.loginPage("/loginPage")
				.loginProcessingUrl("/login")
				.failureUrl("/loginPage?error=true")
				.defaultSuccessUrl("/",true)
				.usernameParameter("username")
				.passwordParameter("password")
		.and().csrf().disable();
    	
    }	

    
}
