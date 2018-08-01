package br.com.cmabreu.misc;

import br.com.cmabreu.model.User;

public class UserDTO {
	private String name;
	private String email;
	private String fullName;
	private String roleName;

	public UserDTO( User user ) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.fullName = user.getFullName();
		this.roleName = user.getRoles().get(0).getRole();
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getFullName() {
		return fullName;
	}

	public String getRoleName() {
		return roleName;
	}

	
}
