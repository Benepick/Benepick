package com.ssafy.benepick.domain.user.entity;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import java.util.*;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.ssafy.benepick.domain.user.entity.UserCard;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

	@Id
	private String userId;

	@Column(nullable = false)
	private String userName;

	@Column(nullable = false)
	private String userSocialNumber;

	@Column(nullable = false)
	private String userPhoneNumber;

	@Column(nullable = false)
	private boolean isPushActive;

	@Column(nullable = false)
	private boolean isAutoLoginActive;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCard> userCardList;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCompany> userCardCompanyList;
}
