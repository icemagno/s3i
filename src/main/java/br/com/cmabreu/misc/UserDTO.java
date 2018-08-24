package br.com.cmabreu.misc;

import br.com.cmabreu.model.User;

public class UserDTO {
	private String name;
	private String email;
	private String fullName;
	private String roleName;
	private String remoteAddress;

	public UserDTO( User user ) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.fullName = user.getFullName();
		this.roleName = user.getRoles().get(0).getRole();
	}

	public String getRemoteAddress() {
		return remoteAddress;
	}

	public void setRemoteAddress(String remoteAddress) {
		this.remoteAddress = remoteAddress;
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
