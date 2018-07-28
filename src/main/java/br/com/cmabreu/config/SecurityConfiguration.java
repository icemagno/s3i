package br.com.cmabreu.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
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

	@Autowired
	private DataSource dataSource;	
	
	@Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
		auth
        .jdbcAuthentication()
        .dataSource( dataSource )
        .passwordEncoder( passwordEncoder() )
		.usersByUsernameQuery(
    			"select user_name as username,password,enabled from users where user_name=?")
    		.authoritiesByUsernameQuery(
    			"select user_name as username, role from users_roles ur join users u on ur.user_id = u.user_id and u.user_name = ?");		
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
				.defaultSuccessUrl("/index")
				.usernameParameter("username")
				.passwordParameter("password")
		.and().csrf().disable();
    	
    }	

    
}
