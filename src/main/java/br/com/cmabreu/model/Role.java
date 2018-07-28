package br.com.cmabreu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "users_roles")
public class Role implements GrantedAuthority {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_role_id", nullable = false, updatable = false)
	private Long id;

	@Column(name = "role", nullable = false)
	private String role;	
	
	@ManyToOne()
	@JoinColumn(name="user_id", foreignKey = @ForeignKey(name = "fk_datalayer_server"))
	private User user;

	public Role() {
		super();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String getAuthority() {
		return this.getRole();
	}		
	
}
