package com.ssafy.benepick.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_card_category3" , schema = "benepick")
public class UserCardCategory3 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_card_category3_id")
	private Long userCardCategory3Id;

	@Column(nullable = false , name = "card_category3_id")
	private Long cardCategory3Id;

	@Column(nullable = false , name = "user_card_category3_name")
	private String userCardCategory3Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_category2_id" , nullable = false)
	private UserCardCategory2 userCardCategory2;

	public void setUserCardCategory2(UserCardCategory2 userCardCategory2) {
		this.userCardCategory2 = userCardCategory2;
	}
}
