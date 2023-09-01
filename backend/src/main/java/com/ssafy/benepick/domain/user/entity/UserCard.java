package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class UserCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userCardId;

	@Column(nullable = false)
	private int userCardCode;

	@Column(nullable = false)
	private String userCardName;

	@Column(nullable = false)
	private LocalDateTime userCardExpirationDate;

	@Column(nullable = false)
	private String userCardCompanyName;

	@Column(nullable = false)
	private String userCardImgUrl;

	@Column(nullable = false)
	private String userCardCompanyImgUrl;

	@Column(nullable = false)
	private String userCardSerialNumber;

	@Column(nullable = false)
	private String userCardCurrentPerformance;

	@Column(nullable = false)
	private String userCardPrevPerformance;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id" , nullable = false)
	private User user;
}
