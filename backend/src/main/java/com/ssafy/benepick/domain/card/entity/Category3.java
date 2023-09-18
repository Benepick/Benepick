package com.ssafy.benepick.domain.card.entity;

import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import com.ssafy.benepick.domain.user.entity.UserCardCategory3;

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
@Table(name = "category3" , schema = "benepick_bank")
public class Category3 {

	@Id
	@Column(name = "category3_id")
	private Long category3Id;

	@Column(nullable = false , name = "category3_name")
	private String category3Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category2_id" , nullable = false)
	private Category2 category2;

	public UserCardCategory3 toUserCardCategory3(){
		return UserCardCategory3.builder()
			.userCardCategory3Id(category3Id)
			.userCardCategory3Name(category3Name)
			.build();
	}
}
