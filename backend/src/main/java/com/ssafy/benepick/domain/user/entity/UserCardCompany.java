package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserCardCompany {

	@Id
	private Long userCardCompanyId;

	@Column(nullable = false)
	private LocalDateTime userCardCompanyRequestDate;

	@Column(nullable = false)
	private LocalDateTime userCardCompanyExpirationDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id" , nullable = false)
	private User user;
}
