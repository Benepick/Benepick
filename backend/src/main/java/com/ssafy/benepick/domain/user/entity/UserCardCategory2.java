package com.ssafy.benepick.domain.user.entity;

import java.util.List;

import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.entity.Category3;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "user_card_category2" , schema = "benepick")
public class UserCardCategory2 {

	@Id
	@Column(name = "user_card_category2_id")
	private Long userCardCategory2Id;

	@Column(nullable = false ,name = "user_card_category2_name")
	private String userCardCategory2Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_category1_id" , nullable = false)
	private UserCardCategory1 userCardCategory1;

	@OneToMany(mappedBy = "userCardCategory2", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCategory3> userCardCategory3List;

	public void addUserCardCategory3(UserCardCategory3 userCardCategory3){
		this.userCardCategory3List.add(userCardCategory3);
		userCardCategory3.setUserCardCategory2(this);
	}

	public void setUserCardCategory1(UserCardCategory1 userCardCategory1){
		this.userCardCategory1 = userCardCategory1;
	}
}
